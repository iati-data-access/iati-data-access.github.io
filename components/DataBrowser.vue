<template>
  <div>
    <b-row>
      <b-col md="4">
        <b-form-group
          label-size="sm"
          label="Number of results">
          <b-input-group size="sm">
            <b-input
              v-model="pageSize" type="number" step="1" debounce="500" />
            <b-input-group-append>
              <b-btn @click="pageSize=null" :disabled="pageSize==null">Show all</b-btn>
            </b-input-group-append>
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
          <b-dropdown
            right
            variant="outline-secondary"
            size="sm">
            <template #button-content>
              <font-awesome-icon :icon="['fa', 'download']" />
            </template>
            <b-dropdown-item
              :href="summaryURL+'&format=csv'"><font-awesome-icon :icon="['fa', 'download']" /> CSV
            </b-dropdown-item>
            <b-dropdown-item
              :href="summaryURL+'&format=xlsx'"><font-awesome-icon :icon="['fa', 'download']" /> XLSX
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <template v-if="isBusy==false">
          <b-row>
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
              />
            </b-col>
            <b-col v-if="displayAs=='table'">
              <b-table
                small
                :items="cells"
                :fields="tableFields">
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
    }
  },
  data() {
    return {
      showFilters: false,
      cells: [],
      total: 0.00,
      isBusy: true,
      selectedRegion: null,
      startedLoading: false
    }
  },
  computed: {
    optionsToBeSelected() {
      return (this.startedLoading==false) && (this.autoReload==false)
    },
    barChartDatasets() {
      if (this.setFields.transaction_type.includes('budget')) {
        return [
          {
            label: 'Budgets',
            backgroundColor: '#155366'
          }
        ]
      } else {
        return [
          {
            label: 'Spending',
            backgroundColor: '#06DBE4'
          }
        ]
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
      return this.drilldowns.map(item => {
        return {
          key: item,
          label: this.availableDrilldowns[item],
          sortable: true
        }
      }).concat({
        key: `value_${this.currency}.sum`,
        label: `Value (${this.currency.toUpperCase()})`,
        formatter: this.numberFormatter,
        thClass: "text-right",
        tdClass: "text-right",
        sortable: true
      })
    },
    cuts() {
      return Object.entries(this.setFields).reduce((summary, field) => {
        if (field[1].length > 0) {
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
    },
    summaryURL() {
      // NB the API limits to a maximum of 10,000 responses without paginating
      const pageSize = this.pageSize != null ? this.pageSize : 10000
      return `${this.$config.baseURL}/babbage/cubes/iatiline/aggregate/?drilldown=${this.drilldowns.join("|")}&order=value_${this.currency}.sum:desc&cut=${this.cuts}&pagesize=${pageSize}&aggregates=value_${this.currency}.sum&simple`
    },
    granularURL() {
      // NB the API limits to a maximum of 10,000 responses without paginating
      const pageSize = this.pageSize != null ? this.pageSize : 10000
      return `${this.$config.baseURL}/babbage/cubes/iatiline/facts/?order=value_${this.currency}:desc&cut=${this.cuts}&pagesize=${pageSize}`
    },
    CSVSummaryURL() {
      return `${this.summaryURL}&format=csv`
    },
    XLSXSummaryURL() {
      return `${this.summaryURL}&format=xlsx`
    },...mapState(['availableDrilldowns', 'codelistLookups', 'fields', 'fieldNames'])
  },
  components: { BarChartComponent, Map },
  methods: {
    numberFormatter(value) {
      return value.toLocaleString(undefined, {maximumFractionDigits: 0})
    },
    loadData() {
      this.startedLoading = true
      this.isBusy = true
      axios.get(this.summaryURL)
      .then(response => {
        this.cells = response.data.cells.map(item => {
          this.drilldowns.forEach(drilldown => {
            if (drilldown.includes(".")) {
              return item
            } else if (drilldown == 'humanitarian') {
              item[drilldown] = (item[`${drilldown}.code`] === true) ? 'Humanitarian' : 'Development'
            } else if (['recipient_country_or_region', 'reporting_organisation', 'reporting_organisation_type'].includes(drilldown)) {
              item[drilldown] = item[`${drilldown}.name_${this.lang}`]
            } else {
              item[drilldown] = item[`${drilldown}.code`] + " - " + item[`${drilldown}.name_${this.lang}`]
            }
          })
          return item
        })
        this.total = this.cells.reduce((summary, item) => {
          summary += item[`value_${this.currency}.sum`]
          return summary
        }, 0.0)
        this.isBusy = false
      })
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
    }
  },
  mounted: function() {
    if (this.autoReload) {
      this.loadData()
    }
  }
}
</script>
