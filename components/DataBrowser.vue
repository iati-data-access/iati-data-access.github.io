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
            :options="displayOptions"
            button-variant="outline-secondary"
            size="sm"
            buttons></b-form-radio-group>
            <b-btn
              :href="CSVSummaryURL"
              variant="outline-secondary"
              size="sm">
              <font-awesome-icon :icon="['fa', 'download']" /> CSV
            </b-btn>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <template v-if="isBusy==false">
          <b-row>
            <b-col v-if="displayAs=='map'">
              <Map
                :data="cells"
                :total="total"
              />
            </b-col>
            <b-col v-if="displayAs=='barChart'">
              <bar-chart-component
                :currency="currency"
                :cells="cells"
                :drilldown="drilldown"
                :bar-chart-datasets="barChartDatasets"
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
    drilldown: {
      default: 'recipient_country_or_region'
    },
    setFields: {
      default() {
        return {
          reporting_organisation: [],
          aid_type: [],
          finance_type: [],
          flow_type: [],
          transaction_type: ['2'],
          sector_category: [],
          sector: [],
          recipient_country_or_region: ['AF'],
          year: ['2020']
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
    }
  },
  data() {
    return {
      showFilters: false,
      cells: [],
      total: 0.00,
      isBusy: true,
      pageSize: 10
    }
  },
  computed: {
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
      if (this.drilldown === 'recipient_country_or_region') {
        return [
          {
            value: 'barChart',
            text: 'Bar Chart'
          },
          {
            value: 'map',
            text: 'Map'
          },
          {
            value: 'table',
            text: 'Table'
          }
        ]
      } else {
        return [
          {
            value: 'barChart',
            text: 'Bar Chart'
          },
          {
            value: 'table',
            text: 'Table'
          }
        ]
      }
    },
    lang() {
      return 'en' // this.$i18n.locale
    },
    drilldownSlotName() {
      return `#cell(sector_category)`
    },
    drilldownLabel() {
      return this.drilldowns.filter(drilldown => {
        return drilldown.value === this.drilldown
      })[0].text
    },
    tableFields() {
      return [
        {
          key: this.drilldown,
          label: this.drilldownLabel,
          sortable: true
        },
        {
          key: `value_${this.currency}.sum`,
          label: `Value (${this.currency.toUpperCase()})`,
          formatter: this.numberFormatter,
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true
        }
      ]
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
      return `${this.$config.baseURL}/babbage/cubes/iatiline/aggregate/?drilldown=${this.drilldown}&order=value_${this.currency}.sum:desc&cut=${this.cuts}&pagesize=${this.pageSize}`
    },
    granularURL() {
      return `${this.$config.baseURL}/babbage/cubes/iatiline/facts/?order=value_${this.currency}:desc&cut=${this.cuts}&pagesize=${this.pageSize}`
    },
    CSVSummaryURL() {
      return `${this.summaryURL}&format=csv`
    },...mapState(['drilldowns', 'codelistLookups', 'fields', 'fieldNames'])
  },
  components: { BarChartComponent, Map },
  methods: {
    numberFormatter(value) {
      return value.toLocaleString(undefined, {maximumFractionDigits: 0})
    },
    loadData() {
      this.isBusy = true
      axios.get(this.summaryURL)
      .then(response => {
        this.cells = response.data.cells.map(item => {
          if (this.drilldown.includes(".")) {
            return item
          } else if (this.drilldown == 'humanitarian') {
            item[this.drilldown] = (item[`${this.drilldown}.code`] === true) ? 'Humanitarian' : 'Development'
          } else {
            item[this.drilldown] = item[`${this.drilldown}.code`] + " - " + item[`${this.drilldown}.name_${this.lang}`]
          }
          return item
        })
        this.total = response.data.summary[`value_${this.currency}.sum`]
        this.isBusy = false
      })
    }
  },
  watch: {
    year() {
      this.loadData()
    },
    pageSize() {
      this.loadData()
    },
    setFields: {
      handler() {
        this.loadData()
      },
      deep: true
    },
    currency() {
      this.loadData()
    }
  },
  mounted: function() {
    this.loadData()
  }
}
</script>
