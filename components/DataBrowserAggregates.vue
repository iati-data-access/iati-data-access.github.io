<template>
  <div>
    <b-row>
      <b-col>
        <b-form inline>
          <b-form-group
            class="mr-4"
            label="Spending type">
            <b-form-radio-group
              :options="budgetsSpendingOptions"
              v-model="budgetsSpending"
              button-variant="outline-primary"
              size="md"
              buttons>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
            class="mr-4"
            label="Year">
            <b-form-select
              :options="calendarYears"
              v-model="calendarYear">
            </b-form-select>
          </b-form-group>
          <b-form-group
            label-size="sm"
            label="Number of results">
            <b-input-group>
              <b-input
                v-model="pageSize" type="number" step="1" debounce="500" />
              <b-input-group-append>
                <b-btn @click="pageSize=null" :disabled="pageSize==null">Show all</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <template v-if="isBusy==false">
          <b-row>
            <b-col v-if="displayAs=='map'">
              <Map
                :data="filteredCells"
                :total="total"
                :selectedRegion.sync="selectedRegion"
              />
            </b-col>
            <b-col v-if="displayAs=='barChart'">
              <bar-chart-component
                :currency="currency"
                :cells="filteredCells"
                :drilldown="drilldown"
                :barChartDatasets="barChartDatasets"
              />
            </b-col>
            <b-col v-if="displayAs=='table'">
              <b-table
                small
                :items="filteredCells"
                :fields="tableFields">
              </b-table>
            </b-col>
          </b-row>
        </template>
        <template v-else>
          <div class="text-center map-min-height">
            <b-spinner variant="secondary" />
          </div>
        </template>
      </b-col>
    </b-row>
  </div>
</template>
<style>
.map-min-height {
  height: 350px
}
</style>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import BarChartComponent from '~/components/BarChartComponent'
import Map from '~/components/Map'
export default {
  props: {
    displayAs: {
      default: 'map'
    },
    currency: {
      default: 'usd'
    },
    drilldown: {
      default: 'recipient_country_or_region'
    },
    pageSize: {
      default: 10
    }
  },
  data() {
    return {
      cells: [],
      isBusy: true,
      calendarYear: 2021,
      budgetsSpending: ['3', '4'],
      selectedRegion: null,
      budgetsSpendingOptions: [{
        value: ['3', '4'],
        text: 'Spending'
      },
      {
        value: ['budget'],
        text: 'Budgets'
      }],
      pageSizeOptions: [
        {
          value: 10,
          text: '10'
        },
        {
          value: 50,
          text: '50'
        },
        {
          value: 100,
          text: '100'
        },
        {
          value: null,
          text: 'All'
        }
      ]
    }
  },
  computed: {
    barChartDatasets() {
      if (this.budgetsSpending.includes('budget')) {
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
    filteredCells() {
      if (this.pageSize == null) {
        return this.cells
      }
      return this.cells.slice(0, this.pageSize)
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
    calendarYears() {
      var years = []
      const year = new Date().getFullYear()
      const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      return range(year-5, year)
    },
    drilldownEndpoint() {
      return {
        'recipient_country_or_region': 'by_country',
        'reporting_organisation': 'by_provider',
        'sector_category': 'by_sector'
      }[this.drilldown]
    },
    spendSummaryURL() {

      return `${this.$config.baseURL}/aggregates/${this.drilldownEndpoint}/?calendar_year=${this.calendarYear}&transaction_type=${this.budgetsSpending}`
    },...mapState(['drilldowns', 'codelistLookups', 'fields', 'fieldNames'])
  },
  components: { BarChartComponent, Map },
  methods: {
    numberFormatter(value) {
      return value.toLocaleString(undefined, {maximumFractionDigits: 0})
    },
    loadData() {
      this.isBusy = true
      axios.get(this.spendSummaryURL)
      .then(response => {
        this.cells = response.data.cells.reduce((summary, item) => {
          var out = {}
          if (this.drilldown=="recipient_country_or_region") {
            summary.push({
              'recipient_country_or_region.code': item.code,
              'recipient_country_or_region.name': item.name_en,
              'value_usd.sum': item.value_usd
            })
          } else {
            out[`${this.drilldown}.code`] = item.code
            out[`${this.drilldown}`] = item.name_en
            out[`${this.drilldown}.name`] = item.name
            out['value_usd.sum'] = item.value_usd
            summary.push(out)
          }
          return summary
        }, [])
        this.total = this.cells.reduce((total, item) => {
          total += item['value_usd.sum']
          return total
        }, 0.0)
        this.isBusy = false
      })
    }
  },
  watch: {
    calendarYear() {
      this.loadData()
    },
    budgetsSpending() {
      this.loadData()
    },
    currency() {
      this.loadData()
    },
    selectedRegion(code) {
      this.$router.push(this.localePath({name: 'data-countries-code', params: { code: code }}))
    }
  },
  mounted: function() {
    this.loadData()
  }
}
</script>