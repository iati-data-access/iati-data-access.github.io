<template>
  <div>
    <b-row>
      <b-col>
        <h2>
          <v-select
            multiple
            :options="fields[summary]"
            v-model="setFields[summary]"
            :reduce="item => item.code"></v-select>
        </h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="3">
        <b-form-group
          label="Drilldown by">
          <b-select
            :options="drilldowns"
            v-model="drilldown"></b-select>
        </b-form-group>
        <b-form-group
          :label="fieldNames[field][lang]"
          v-for="field in Object.keys(fields)"
          v-bind:key="field">
          <v-select
            multiple
            :options="fields[field]"
            v-model="setFields[field]"
            :reduce="item => item.code"></v-select>
        </b-form-group>
        <b-form-group
          label="Year">
          <v-select
            multiple
            :options="years"
            v-model="setFields.year"></v-select>
        </b-form-group>
        <b-form-group
          label="Number of results">
          <b-input
            v-model="pageSize" type="number" step="1" debounce="500" />
        </b-form-group>
        <b-form-group
          label="Currency">
          <b-form-radio-group
            id="btn-currency"
            v-model="currency"
            :options="currencyOptions"
            button-variant="outline-primary"
            name="radio-btn-outline"
            buttons
          ></b-form-radio-group>
        </b-form-group>
        <b-row>
          <b-col>
            <b-btn :href="CSVSummaryURL">Download summary</b-btn>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="9">
        <template v-if="isBusy==false">
          <b-row v-if="drilldown=='recipient_country_or_region'">
            <b-col>
              <Map
                :data="cells"
                :total="total"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <hr />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <bar-chart-component
                :currency="currency"
                :cells="cells"
                :drilldown="drilldown"
              />
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <b-col>
              <b-table
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
<script>
import axios from 'axios'
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
    }
  },
  data() {
    return {
      cells: [],
      total: 0.00,
      isBusy: true,
      currency: 'usd',
      currencyOptions: [
        {
          value: 'usd',
          text: 'USD'
        },
        {
          value: 'eur',
          text: 'EUR'
        }
      ],
      drilldowns: [
        {
          value: 'reporting_organisation',
          text: 'Reporting Organisation'
        },
        {
          value: 'sector_category',
          text: 'Sector Category'
        },
        {
          value: 'sector',
          text: 'Sector'
        },
        {
          value: 'activity.title',
          text: 'Activity Title'
        },
        {
          value: 'activity.iati_identifier',
          text: 'Activity IATI Identifier'
        },
        {
          value: 'reporting_organisation',
          text: 'Reporting Organisation'
        },
        {
          value: 'reporting_organisation.type',
          text: 'Reporting Organisation Type'
        },
        {
          value: 'recipient_country_or_region',
          text: 'Country or Region'
        }
      ],
      codelistLookups: {
        reporting_organisation: 'ReportingOrganisation',
        aid_type: 'AidType',
        finance_type: 'FinanceType',
        flow_type: 'FlowType',
        transaction_type: 'TransactionType',
        sector_category: 'SectorGroup',
        sector: 'Sector',
        recipient_country_or_region: 'Country'
      },
      fields: {
        reporting_organisation: [],
        aid_type: [],
        finance_type: [],
        flow_type: [],
        transaction_type: [],
        sector_category: [],
        sector: [],
        recipient_country_or_region: []
      },
      fieldNames: {
        reporting_organisation: {'en': 'Reporting Organisation'},
        aid_type:  {'en': 'Aid Type'},
        finance_type:  {'en': 'Finance Type'},
        flow_type:  {'en': 'Flow Type'},
        transaction_type:  {'en': 'Transaction Type'},
        sector_category:  {'en': 'Sector Category'},
        sector:  {'en': 'Sector'},
        recipient_country_or_region:  {'en': 'Recipient Country or Region'}
      },
      reportingOrganisationType: '10',
      reportingOrganisationTypes: [],
      years: ['2014', '2015', '2016', '2017',
        '2018', '2019', '2020', '2021', '2022',
        '2023', '2024', '2025', '2026', '2027',
        '2028', '2029', '2030'],
      pageSize: '10'
    }
  },
  computed: {
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
    summaryURL() {
      const cuts = Object.entries(this.setFields).reduce((summary, field) => {
        if (field[1].length > 0) {
          const values = field[1].map(item => { return `"${item}"`})
          if (field[0] == 'year') {
            summary.push(`${field[0]}:${values.join(';')}`)
          } else {
            summary.push(`${field[0]}.code:${values.join(';')}`)
          }
        }
        return summary
      }, []).join('|')
      return `${this.$config.baseURL}/babbage/cubes/iatiline/aggregate/?drilldown=${this.drilldown}&order=value_${this.currency}.sum:desc&cut=${cuts}&pagesize=${this.pageSize}`
    },
    CSVSummaryURL() {
      return `${this.summaryURL}&format=csv`
    }
  },
  components: { BarChartComponent, Map },
  methods: {
    numberFormatter(value) {
      return value.toLocaleString(undefined, {maximumFractionDigits: 0})
    },
    async getCodelists() {
      Object.keys(this.fields).forEach(field => {
        const codelist = this.codelistLookups[field]
        this.getCodelistData(field, codelist)
      })
    },
    async getCodelistData(field, codelist) {
      const response = await axios.get(`https://codelists.codeforiati.org/api/json/en/${codelist}.json`
        )
      const data = response.data.data
      var codes = data.reduce((summary, item) => {
        var code = null
        var name = null
        if (field == 'sector_category') {
          var code = item['codeforiati:group-code']
          var name = item['codeforiati:group-name']
        } else {
          var code = String(item.code)
          var name = String(item.name)
        }
        summary[code] = {
          code: String(code),
          label: `${code} - ${name}`
        }
        return summary
      }, {})

      this.$set(this.fields, field, Object.values(codes))
    },
    loadData() {
      this.isBusy = true

      axios.get(this.summaryURL)
      .then(response => {
        this.cells = response.data.cells.map(item => {
          if (this.drilldown.includes(".")) {
            return item
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
    drilldown() {
      this.loadData()
    },
    transactionType() {
      this.loadData()
    },
    reportingOrganisationType() {
      this.loadData()
    },
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
    lang() {
      this.getCodelists()
    },
    currency() {
      this.loadData()
    }
  },
  mounted: function() {
    this.getCodelists()
    this.loadData()
  }
}
</script>
