<template>
  <div>
    <b-row v-if="showNumberResults">
      <b-col md="4">
        <b-form-group
          label-size="sm"
          :label="$t('dataDashboards.numberOfResults')">
          <b-input-group size="sm">
            <b-select v-model="pageSize_" :options="pageSizeOptions" debounce="500"></b-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="8" class="text-lg-right">
        <b-form-group
          label-size="sm"
          :label="$t('dataDashboards.displayOptions')">
          <b-form-radio-group
            v-model="displayAs_"
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
          <Download
            label="XLSX"
            variant="outline-secondary"
            size="sm"
            :url="XLSXSummaryURL"
            file-name="data.xlsx"
            container-class="d-inline"
            :icon="['fa', 'download']" />
          <b-btn
            v-if="customise"
            size="sm"
            :to="localePath({
              path: '/data/custom/',
              query: {
                drilldowns: this.drilldownsForQuery,
                filters: this.fieldsForQuery,
                displayAs: this.displayAs_,
                pageSize: this.pageSize_ ? this.pageSize_ : 'null'
              }})">{{ $t('dataDashboards.customise') }} <font-awesome-icon :icon="['fa', 'wand-magic-sparkles']" /></b-btn>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <template v-if="isBusy==false">
          <b-row v-if="cells.length==0">
            <b-col>
              <b-alert show variant="warning">
                {{ $t('dataDashboards.noResults') }}
              </b-alert>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col v-if="displayAs_=='map'">
              <Map
                :currency="currency"
                :data="cells"
                :total="total"
                :selectedRegion.sync="selectedRegion"
                :datasets="barChartDatasets"
                :clickable="clickable"
              />
            </b-col>
            <b-col v-if="displayAs_=='barChart'">
              <bar-chart-component
                :currency="currency"
                :cells="cells"
                :drilldown="drilldowns[0]"
                :datasets="barChartDatasets"
                :height="barChartHeight"
                :clickable="clickable"
                :selectedDrilldown.sync="selectedDrilldown"
              />
            </b-col>
            <b-col v-if="displayAs_=='table'">
              <b-table
                small
                :items="cells"
                :fields="tableFields">
                <template #[iatiIdentifierSlotName]="data">
                  <a
                  :href="`https://d-portal.org/savi/?aid=${data.item['activity.iati_identifier']}`"
                  target="_blank">{{ data.item['activity.iati_identifier'] }}</a>
                </template>
                <template #[clickableDrilldownSlotName]="data">
                  <nuxt-link :to="localePath({
                    name: selectedDrilldownPath,
                    params: { code: data.item[`${drilldowns[0]}.code`] }
                  })">{{ data.item[`${drilldowns[0]}.name_${lang}`] }}</nuxt-link>
                </template>
              </b-table>
              <p class="text-muted font-italic">{{ $t('dataDashboards.totalNumberOfResults') }}: {{ totalRows.toLocaleString(undefined, {maximumFractionDigits: 0}) }}</p>
              <b-pagination
                align="fill"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="pageSize_"></b-pagination>
            </b-col>
            <b-col v-if="displayAs_=='sankey'">
              <Sankey
                :data="cells"
                :from="`provider_organisation.name_${lang}`"
                :to="`receiver_organisation.name_${lang}`"
              />
            </b-col>
          </b-row>
        </template>
        <template v-else-if="optionsToBeSelected">
          <div lass="text-center">
            <b-alert show variant="info">
              {{ $t('dataDashboards.selectSomeOptions') }}
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
import Download from '~/components/Download.vue'
import Map from '~/components/Map'
import Sankey from '~/components/Sankey'
import debounce from "lodash.debounce"

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
    },
    customise: {
      default: true
    },
    pageName: {
      default: null
    }
  },
  data() {
    return {
      privateDisplayAs: this.displayAs,
      privatePageSize: this.pageSize,
      request: null,
      showFilters: false,
      cells: [],
      total: 0.00,
      isBusy: true,
      selectedRegion: null,
      startedLoading: false,
      maxPageSize: 1048576,
      rollupBy: null,
      rollupValues: [],
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
        },
        {
          value: null,
          text: 'All'
        }
      ],
      currentPage: 1,
      totalRows: 0
    }
  },
  computed: {
    displayAs_: {
      get() {
        if (this.pageName == 'data-custom') {
          return this.displayAs
        } else {
          return this.privateDisplayAs
        }
      },
      set(value) {
        if (this.pageName == 'data-custom') {
          this.$emit('update:displayAs', value)
        } else {
          this.privateDisplayAs = value
        }
      }
    },
    pageSize_: {
      get() {
        if (this.pageName == 'data-custom') {
          return this.pageSize
        } else {
          return this.privatePageSize
        }
      },
      set(value) {
        if (this.pageName == 'data-custom') {
          this.$emit('update:pageSize', value)
        } else {
          this.privatePageSize = value
        }
      }
    },
    fieldsObj() {
      return Object.entries(this.fields).reduce((summary, item) => {
        summary[item[0]] = item[1].reduce((itemSummary, itemItem) => {
          itemSummary[itemItem.code] = itemItem.name
          return itemSummary
        }, {})
        return summary
      }, {})
    },
    localeSensitiveDrilldowns() {
      return this.drilldowns.reduce((summary, item) => {
        if (['activity.title', 'activity.description'].includes(item)) {
          summary.push(`${item}_${this.lang}`)
        } else {
          summary.push(item)
        }
        return summary
      }, [])
    },
    drilldownsForQuery() {
      return this.drilldowns.join(";")
    },
    fieldsForQuery() {
      return Object.entries(this.setFields).reduce((summary, item) => {
        if (item[1].length > 0) {
          summary.push(`${item[0]}:${item[1].join(",")}`)
        }
        return summary
      }, []).sort().join(";")
    },
    selectedDrilldownPath() {
      const d = this.drilldowns.join('')
      if (d == 'reporting_organisation') {
        return 'data-reporting-organisation-code'
      }
      else if (d == 'recipient_country_or_region') {
        return 'data-recipient-country-or-region-code'
      }
      else if (d == 'sector_category') {
        return 'data-sector-category-code'
      }
    },
    iatiIdentifierSlotName() {
      return `cell(activity.iati_identifier)`
    },
    clickableDrilldownSlotName() {
      if ((this.drilldowns.length == 1) && (this.clickable == true)) {
        return `cell(${this.drilldowns[0]})`
      }
    },
    optionsToBeSelected() {
      return (this.startedLoading==false) && (this.autoReload==false)
    },
    barChartDatasets() {
      if (this.rollupBy) {
        return this.rollupValues.map((rollupValue, i) => {
          return {
            field: `value_${this.currency}.sum_${rollupValue.join('-')}`,
            label: `${this.$t('dataDashboards.amount')} (${this.currency.toUpperCase()}): ${this.getRollupLabel(this.rollupBy, rollupValue)}`,
            backgroundColor: this.getBackgroundColour(this.rollupBy, rollupValue.join('-'), i, this.rollupValues.length)
          }
        })
      } else {
        return [{
          field: `value_${this.currency}.sum`,
          label: `${this.$t('dataDashboards.amount')} (${this.currency.toUpperCase()})`,
          backgroundColor: '#06DBE4',
        }]
      }
    },
    displayOptions() {
      if (JSON.stringify(this.drilldowns) == '["provider_organisation","receiver_organisation","transaction_type.code"]') {
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
          },
          {
            value: 'sankey',
            text: 'Sankey',
            icon: 'bars-staggered'
          }
        ]
      } else if (this.drilldowns.length > 1) {
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
      return this.$i18n.locale
    },
    tableFields() {
      const _fields = this.drilldowns.map(item => {
        return {
          key: item,
          label: this.availableDrilldowns[item],
          sortable: true
        }
      })
      if (this.rollupBy) {
        return _fields.concat(this.rollupValues.map(item => {
          return {
            key: `value_${this.currency}.sum_${item.join('-')}`,
            label: `${this.$t('dataDashboards.amount')} (${this.currency.toUpperCase()}): ${this.getRollupLabel(this.rollupBy, item)}`,
            formatter: this.numberFormatter,
            thClass: "text-right",
            tdClass: "text-right",
            sortable: true
          }
        }))
      } else {
        return _fields.concat({
          key: `value_${this.currency}.sum`,
          label: `${this.$t('dataDashboards.amount')} (${this.currency.toUpperCase()})`,
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
      if (this.rollupBy != null) {
        return `&rollup=${this.rollupBy}:${JSON.stringify(this.rollupValues)}`
      }
      return ''
    },
    summaryURL() {
      return `${this.$config.baseURL}/babbage/cubes/iatiline/aggregate/?drilldown=${this.localeSensitiveDrilldowns.join("|")}&order=value_${this.currency}.sum:desc${this.cuts}&aggregates=value_${this.currency}.sum${this.rollups}`
    },
    JSONSummaryURL() {
      // NB the API limits to a maximum of 1,048,576 responses without paginating, because this is the Excel maximum number of rows. But we only want to show a maximum of 1000 on the preview.
      const pageSize = this.pageSize_ != null ? this.pageSize_ : this.maxPageSize
      return `${this.summaryURL}&pagesize=${pageSize}&page=${this.currentPage}`
    },
    granularURL() {
      // NB the API limits to a maximum of 1,048,576 responses without paginating. But we only want to show a maximum of 1000 on the preview.
      const pageSize = this.pageSize_ != null ? this.pageSize_ : this.maxPageSize
      return `${this.$config.baseURL}/babbage/cubes/iatiline/facts/?order=value_${this.currency}:desc${this.cuts}&pagesize=${pageSize}`
    },
    CSVSummaryURL() {
      return `${this.summaryURL}&pagesize=${this.maxPageSize}&format=csv`
    },
    XLSXSummaryURL() {
      return `${this.summaryURL}&pagesize=${this.maxPageSize}&format=xlsx&lang=${this.lang}`
    },...mapState(['availableDrilldowns', 'codelistLookups', 'fields', 'fieldNames'])
  },
  components: { BarChartComponent, Map, Download, Sankey },
  created() {
    this.loadDataDebounce = debounce(() => {
      this.loadDataHandler()
    }, 500);
  },
  beforeUnmount() {
    this.loadData.cancel();
  },
  methods: {
    getBackgroundColour(rollupBy, rollupValue, i, l) {
      if (rollupValue == 'budget') {
        return '#155366'
      } else if (rollupValue == '3-4') {
        return '#06DBE4'
      }
      return '#06DBE4'
    },
    getRollupLabel(rollupBy, rollupValue) {
      const rollupKey = rollupBy.includes(".") ? rollupBy.split('.')[0] : rollupBy
      if (!(rollupKey in this.fieldsObj)) {
        return rollupValue.join(", ")
      } else {
        return rollupValue.map(val => { return this.fieldsObj[rollupKey][val]}).join(", ")
      }
    },
    setRollups() {
      if (JSON.stringify(this.setFields.transaction_type.sort()) == '["3","4","budget"]') {
        this.rollupBy = 'transaction_type.code'
        this.rollupValues = [["3","4"],["budget"]]
      } else if (this.setFields.transaction_type && this.setFields.transaction_type.length>1 && (JSON.stringify(this.setFields.transaction_type.sort()) != '["3","4"]')) {
        this.rollupBy = 'transaction_type.code'
        this.rollupValues = this.setFields.transaction_type.map(item => [item])
      } else if (this.setFields.year && this.setFields.year.length > 1) {
        this.rollupBy = 'year'
        this.rollupValues = this.setFields.year.map(item => [item])
      } else if (this.setFields.calendar_year_and_quarter && this.setFields.calendar_year_and_quarter.length>1) {
        this.rollupBy = 'calendar_year_and_quarter'
        this.rollupValues = this.setFields.calendar_year_and_quarter.map(item => [item])
      } else {
        this.rollupBy = null
        this.rollupValues = null
      }
    },
    loadData() {
      // FIXME?
      this.setRollups()
      this.startedLoading = true
      this.isBusy = true
      return this.loadDataDebounce()
    },
    numberFormatter(value) {
      if (value == null) { value = 0 }
      return value.toLocaleString(undefined, {maximumFractionDigits: 0})
    },
    loadDataHandler() {
      // Stop any current requests
      this.cancel();
      let axiosSource = axios.CancelToken.source();
      this.request = { cancel: axiosSource.cancel };
      axios.get(this.JSONSummaryURL, {
        cancelToken: axiosSource.token,
      })
      .then(response => {
        this.totalRows = response.data.total_cell_count
        this.cells = response.data.cells.map(item => {
          this.drilldowns.forEach(drilldown => {
            if (['activity.title', 'activity.description'].includes(drilldown)) {
              item[drilldown] = item[`${drilldown}_${this.lang}`]
            } else if (drilldown.includes(".")) {
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
    },
    selectedDrilldown(code) {
      const path = this.selectedDrilldownPath
      if (path) {
        this.$router.push(this.localePath({name: path, params: { code: code }}))
      }
    }
  },
  watch: {
    year(newValue, oldValue) {
      if (this.autoReload) {
        if (JSON.stringify(newValue) != JSON.stringify(oldValue)) {
          this.loadData()
        }
      }
    },
    pageSize_() {
      if (this.autoReload) {
        this.loadData()
      }
    },
    '$route.query'() {
      if (this.autoReload) {
        this.loadData()
      }
    },
    currency() {
      if (this.autoReload) {
        this.loadData()
      }
    },
    selectedRegion(code) {
      if (this.clickable) {
        this.$router.push(this.localePath({name: 'data-recipient-country-or-region-code', params: { code: code }}))
      }
    },
    drilldowns(newValue, oldValue) {
      if (this.autoReload) {
        if (JSON.stringify(newValue) != JSON.stringify(oldValue)) {
          this.loadData()
        }
      }
    },
    currentPage(newValue, oldValue) {
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
