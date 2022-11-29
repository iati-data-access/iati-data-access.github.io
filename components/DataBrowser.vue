<template>
  <div>
    <b-row v-if="showNumberResults">
      <b-col md="4">
        <b-form-group
          label-size="sm"
          label="Number of results">
          <b-input-group size="sm">
            <b-select v-model="pageSize" :options="pageSizeOptions" debounce="500"></b-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="8" class="text-lg-right">
        <b-form-group
          label-size="sm"
          label="Display options">
          <b-form-radio-group
            v-model="displayAs"
            button-variant="outline-secondary"
            size="sm"
            buttons>
            <b-form-radio
              :value="option.value"
              v-for="option in displayOptions"
              v-bind:key="option.value">
              <font-awesome-icon :icon="['fa', option.icon]" />
            </b-form-radio>
          </b-form-radio-group>
          <b-btn
            variant="outline-secondary"
            size="sm"
            :href="XLSXSummaryURL"><font-awesome-icon :icon="['fa', 'download']" /> XLSX
          </b-btn>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <template v-if="isBusy==false">
          <b-row v-if="cells.length==0">
            <b-col>
              <b-alert show variant="warning">
                There are no results for your selected filters.
              </b-alert>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col v-if="displayAs=='map'">
              <Map
                :currency="currency"
                :data="cells"
                :total="total"
                :selectedRegion.sync="selectedRegion"
                :datasets="barChartDatasets"
              />
            </b-col>
            <b-col v-if="displayAs=='barChart'">
              <bar-chart-component
                :currency="currency"
                :cells="cells"
                :drilldown="drilldowns[0]"
                :datasets="barChartDatasets"
                :height="barChartHeight"
              />
            </b-col>
            <b-col v-if="displayAs=='table'">
              <b-table
                small
                :items="cells"
                :fields="tableFields">
                <template #[iatiIdentifierSlotName]="data">
                  <a
                  :href="`https://d-portal.org/savi/?aid=${data.item['activity.iati_identifier']}`"
                  target="_blank">{{ data.item['activity.iati_identifier'] }}</a>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </template>
        <template v-else-if="optionsToBeSelected">
          <div lass="text-center">
            <b-alert show variant="info">
              Select some options, and then click Run on the left.
            </b-alert>
          </div>
        </template>
        <template v-else>
          <div class="text-center">
            <b-spinner variant="secondary" />
          </div>
        </template>
      </b-col>
    </b-row>
  </div>
</template>
<style scoped>
.table {
  word-break: normal;
}
</style>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import BarChartComponent from '~/components/BarChartComponent'
import Map from '~/components/Map'
export default {
  props: {
    drilldowns: {
      default() {
        return ['recipient_country_or_region']
      }
    },
    setFields: {
      default() {
        const lastYear = new Date().getFullYear()-1
        return {
          reporting_organisation: [],
          aid_type: [],
          finance_type: [],
          flow_type: [],
          transaction_type: ['2'],
          sector_category: [],
          sector: [],
          recipient_country_or_region: ['AF'],
          year: [lastYear]
        }
      }
    },
    summary: {
      default: 'sector_category'
    },
    displayAs: {
      default: 'barChart'
    },
    currency: {
      default: 'usd'
    },
    pageSize: {
      default: 10
    },
    clickable: {
      default: false
    },
    autoReload: {
      default: true
    },
    barChartHeight: {
      default: '400px'
    },
    showNumberResults: {
      default: true
    },
    orderBy: {
      default: null
    }
  },
  data() {
    return {
      request: null,
      showFilters: false,
      cells: [],
      total: 0.00,
      isBusy: true,
      selectedRegion: null,
      startedLoading: false,
      maxPageSize: 1048576,
      pageSizeOptions: [
        {
          value: 10,
          text: 10
        },
        {
          value: 50,
          text: 50
        },
        {
          value: 100,
          text: 100
        },
        {
          value: 500,
          text: 500
        },
        {
          value: 1000,
          text: 1000
        }
      ]
    }
  },
  computed: {
    iatiIdentifierSlotName() {
      return `cell(activity.iati_identifier)`
    },
    optionsToBeSelected() {
      return (this.startedLoading==false) && (this.autoReload==false)
    },
    barChartDatasets() {
      if (this.setFields.transaction_type.length == 3) {
        return [
          {
            label: 'Budgets',
            backgroundColor: '#155366',
            field: `value_${this.currency}.sum_budget`
          },
          {
            label: 'Spending',
            backgroundColor: '#06DBE4',
            field: `value_${this.currency}.sum_3-4`
          }
        ]
      } else if (this.setFields.transaction_type.includes('budget')) {
        if (this.setFields.year.length > 1) {
          return this.setFields.year.map(year => {
            return {
              label: `Budgets (${year})`,
              backgroundColor: '#155366',
              field: `value_${this.currency}.sum_${year}`
            }
          })
        } else {
          return [
            {
              label: 'Budgets',
              backgroundColor: '#155366',
              field: `value_${this.currency}.sum`
            }
          ]
        }
      } else {
        if (this.setFields.year.length > 1) {
          return this.setFields.year.map(year => {
            return {
              label: `Spending (${year})`,
              backgroundColor: '#06DBE4',
              field: `value_${this.currency}.sum_${year}`
            }
          })
        } else {
          return [
            {
              label: 'Spending',
              backgroundColor: '#06DBE4',
              field: `value_${this.currency}.sum`
            }
          ]
        }
      }
    },
    displayOptions() {
      if (this.drilldowns.length > 1) {
        return [
          {
            value: 'table',
            text: 'Table',
            icon: 'table'
          }
        ]
      } else if (this.drilldowns[0] === 'recipient_country_or_region') {
        return [
          {
            value: 'map',
            text: 'Map',
            icon: 'map'
          },
          {
            value: 'barChart',
            text: 'Bar Chart',
            icon: 'chart-simple'
          },
          {
            value: 'table',
            text: 'Table',
            icon: 'table'
          }
        ]
      } else {
        return [
          {
            value: 'barChart',
            text: 'Bar Chart',
            icon: 'chart-simple'
          },
          {
            value: 'table',
            text: 'Table',
            icon: 'table'
          }
        ]
      }
    },
    lang() {
      return 'en' // this.$i18n.locale
    },
    tableFields() {
      const _fields = this.drilldowns.map(item => {
        return {
          key: item,
          label: this.availableDrilldowns[item],
          sortable: true
        }
      })
      if (this.setFields.transaction_type.length == 3) {
        return _fields.concat({
          key: `value_${this.currency}.sum_budget`,
          label: `Value (${this.currency.toUpperCase()}): Budget`,
          formatter: this.numberFormatter,
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true
        }).concat({
          key: `value_${this.currency}.sum_3-4`,
          label: `Value (${this.currency.toUpperCase()}): Spending`,
          formatter: this.numberFormatter,
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true
        })
      } else if (this.setFields.year.length > 1) {
        return _fields.concat(this.setFields.year.map(year => {
          return {
            key: `value_${this.currency}.sum_${year}`,
            label: `Value (${this.currency.toUpperCase()}): ${year}`,
            formatter: this.numberFormatter,
            thClass: "text-right",
            tdClass: "text-right",
            sortable: true
          }
        }))
      } else {
        return _fields.concat({
          key: `value_${this.currency}.sum`,
          label: `Value (${this.currency.toUpperCase()})`,
          formatter: this.numberFormatter,
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true
        })
      }
    },
    cuts() {
      const _cuts = Object.entries(this.setFields).reduce((summary, field) => {
        if (field[1].length > 0) {
          if ((field[0] == 'transaction_type') && field[1].length == 3) {
            return summary
          }
          if (['year', 'quarter', 'calendar_year_and_quarter'].includes(field[0])) {
            const values = field[1].map(item => { return `"${item}"`})
            summary.push(`${field[0]}:${values.join(';')}`)
          } else if (field[0].includes('.')) {
            const values = field[1].map(item => { return `"${item}"`})
            summary.push(`${field[0]}:${values.join(';')}`)
          } else {
            const values = field[1].map(item => { return `"${item}"`})
            summary.push(`${field[0]}.code:${values.join(';')}`)
          }
        }
        return summary
      }, []).join('|')
      if (_cuts != '') { return `&cut=${_cuts}` }
      return ''
    },
    rollups() {
      if (this.setFields.transaction_type.length == 3) {
        return '&rollup=transaction_type.code:[["3","4"],["budget"]]'
      } else if (this.setFields.year.length > 1) {
        return `&rollup=year.year:[${this.setFields.year.map(item => { return `["${item}"]`}).join(',')}]`
      }
      return ''
    },
    summaryURL() {
      return `${this.$config.baseURL}/babbage/cubes/iatiline/aggregate/?drilldown=${this.drilldowns.join("|")}&order=value_${this.currency}.sum:desc${this.cuts}&aggregates=value_${this.currency}.sum&simple${this.rollups}`
    },
    JSONSummaryURL() {
      // NB the API limits to a maximum of 1,048,576 responses without paginating, because this is the Excel maximum number of rows. But we only want to show a maximum of 1000 on the preview.
      const pageSize = this.pageSize != null ? this.pageSize : this.maxPageSize
      return `${this.summaryURL}&pagesize=${pageSize}`
    },
    granularURL() {
      // NB the API limits to a maximum of 1,048,576 responses without paginating. But we only want to show a maximum of 1000 on the preview.
      const pageSize = this.pageSize != null ? this.pageSize : this.maxPageSize
      return `${this.$config.baseURL}/babbage/cubes/iatiline/facts/?order=value_${this.currency}:desc${this.cuts}&pagesize=${pageSize}`
    },
    CSVSummaryURL() {
      return `${this.summaryURL}&pagesize=${this.maxPageSize}&format=csv`
    },
    XLSXSummaryURL() {
      return `${this.summaryURL}&pagesize=${this.maxPageSize}&format=xlsx`
    },...mapState(['availableDrilldowns', 'codelistLookups', 'fields', 'fieldNames'])
  },
  components: { BarChartComponent, Map },
  methods: {
    numberFormatter(value) {
      if (value == null) { value = 0 }
      return value.toLocaleString(undefined, {maximumFractionDigits: 0})
    },
    loadData() {
      this.startedLoading = true
      this.isBusy = true
      // Stop any current requests
      this.cancel();
      let axiosSource = axios.CancelToken.source();
      this.request = { cancel: axiosSource.cancel };
      axios.get(this.JSONSummaryURL, {
        cancelToken: axiosSource.token,
      })
      .then(response => {
        this.cells = response.data.cells.map(item => {
          this.drilldowns.forEach(drilldown => {
            if (drilldown.includes(".")) {
              return item
            } else if (drilldown == 'humanitarian') {
              item[drilldown] = (item[`${drilldown}.code`] === true) ? 'Humanitarian' : 'Development'
            } else if (drilldown == 'multi_country') {
              item[drilldown] = (item[`${drilldown}.code`] === true) ? 'Multi-Country' : 'Not Multi-Country'
            } else if (['recipient_country_or_region', 'reporting_organisation', 'reporting_organisation_type', 'receiver_organisation', 'provider_organisation'].includes(drilldown)) {
              item[drilldown] = item[`${drilldown}.name_${this.lang}`]
            } else {
              item[drilldown] = item[`${drilldown}.code`] + " - " + item[`${drilldown}.name_${this.lang}`]
            }
          })
          return item
        })
        if (this.orderBy) {
          this.cells = this.cells.sort((a, b) => a[this.orderBy].localeCompare(b[this.orderBy]));
        }
        this.total = this.cells.reduce((summary, item) => {
          summary += item[`value_${this.currency}.sum`]
          return summary
        }, 0.0)
        this.isBusy = false
      }).catch(error => {
        if (error == 'Cancel') { return }
        this.$bvToast.toast(`${error}`, {
          title: 'Error',
          autoHideDelay: 5000,
          append: true,
          variant: 'danger'
        })
      })
    },
    cancel() {
      if (this.request) {
        this.request.cancel()
        this.request = null;
      }
    }
  },
  watch: {
    year() {
      if (this.autoReload) {
        this.loadData()
      }
    },
    pageSize() {
      if (this.autoReload) {
        this.loadData()
      }
    },
    setFields: {
      handler() {
        if (this.autoReload) {
          this.loadData()
        }
      },
      deep: true
    },
    currency() {
      if (this.autoReload) {
        this.loadData()
      }
    },
    selectedRegion(code) {
      if (this.clickable) {
        this.$router.push(this.localePath({name: 'data-countries-code', params: { code: code }}))
      }
    },
    drilldowns() {
      if (this.autoReload) {
        this.loadData()
      }
    }
  },
  mounted: function() {
    if (this.autoReload) {
      this.loadData()
    }
  }
}
</script>
