<template>
  <div>
    <b-row>
      <b-col>
        <b-form inline>
          <b-form-group
            label="Spending type">
            <b-form-radio-group
              class="mr-4"
              :options="budgetsSpendingOptions"
              v-model="budgetsSpending"
              button-variant="outline-primary"
              size="md"
              buttons>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
            label="Year">
            <b-form-select
              :options="calendarYears"
              v-model="calendarYear">
            </b-form-select>
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
                :data="cells"
                :total="total"
              />
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
    }
  },
  data() {
    return {
      cells: [],
      isBusy: true,
      calendarYear: 2021,
      budgetsSpending: ['3', '4'],
      budgetsSpendingOptions: [{
        value: ['3', '4'],
        text: 'Spending'
      },
      {
        value: ['budget'],
        text: 'Budgets'
      }]
    }
  },
  computed: {
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
    calendarYears() {
      var years = []
      const year = new Date().getFullYear()
      const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      return range(year-5, year)
    },
    spendSummaryURL() {
      return `${this.$config.baseURL}/aggregates/by_country/?calendar_year=${this.calendarYear}&transaction_type=${this.budgetsSpending}`
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
          summary.push({
            'recipient_country_or_region.code': item.code,
            'value_usd.sum': item.value_usd
          })
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
    }
  },
  mounted: function() {
    this.loadData()
  }
}
</script>