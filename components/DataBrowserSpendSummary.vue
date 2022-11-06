<template>
  <b-row>
    <b-col>
      <template v-if="isBusy==false">
        <b-row>
          <b-col v-if="displayAs=='barChart'">
            <spend-bar-chart-component
              :currency="currency"
              :cells="cells"
              :drilldown="drilldown"
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
</template>
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
    drilldownValue: {
      default: 'RW'
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
      cells: [],
      isBusy: true,
      years: ['2014', '2015', '2016', '2017',
        '2018', '2019', '2020', '2021', '2022',
        '2023', '2024', '2025', '2026', '2027',
        '2028', '2029', '2030'],
      pageSize: 10
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
      return `${this.$config.baseURL}/aggregates/spend_summary/?drilldown=${this.drilldown}&${this.drilldown}=${this.drilldownValue}&calendar_year=${this.calendarYears.join(',')}`
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
          if (!(item.calendar_year in summary)) {
            summary[item.calendar_year] = {
              'spending': 0.0,
              'budget': 0.0
            }
          }
          if (['3', '4'].includes(item.transaction_type)) {
            summary[item.calendar_year].spending += item.value_usd
          } else if (['budget'].includes(item.transaction_type)) {
            summary[item.calendar_year].budget += item.value_usd
          }
          return summary
        }, {})
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