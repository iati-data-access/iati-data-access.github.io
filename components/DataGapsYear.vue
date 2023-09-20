<template>
  <div>
    <b-row>
      <b-col md="9">
        <b-form-group
          label-class="font-weight-bold"
          :label="$t('dataDashboards.availableDrilldowns.reporting_organisation_type')">
          <b-select
            :options="organisationTypes"
            text-field="label"
            value-field="code"
            v-model="organisationType">
          </b-select>
        </b-form-group>
      </b-col>
      <b-col md="3" class="text-md-right">
        <Download
          label="XLSX"
          variant="primary"
          size="md"
          :url="xlsxURL"
          file-name="data.xlsx"
          container-class="d-inline"
          :icon="['fa', 'download']" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          sortBy="publisher"
          responsive
          :fields="dataFields"
          :items="data"
          :busy="isBusy"
          show-empty>
          <template #table-busy>
            <div class="text-center text-secondary my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>{{ $t('dataDashboards.loading') }}</strong>
            </div>
          </template>
          <template #empty="scope">
            <p class="lead">{{ $t('dataDashboards.noResults') }}</p>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'DataGapsYear',
  data () {
    return {
      data: [],
      organisationType: '10',
      isBusy: true
    }
  },
  computed: {
    jsonURL() {
      return `${this.$config.baseURL}/babbage/cubes/iatiline/aggregate/?drilldown=reporting_organisation|year.year|transaction_type&cut=year.year:${this.calendarYearsForQuery}|reporting_organisation_type.code:"${this.organisationType}"&simple=True&aggregates=value_usd.sum&pagesize=100000`
    },
    xlsxURL() {
      return `${this.$config.baseURL}/babbage/cubes/iatiline/aggregate/?drilldown=reporting_organisation|year.year|transaction_type&cut=year.year:${this.calendarYearsForQuery}&simple=True&aggregates=value_usd.sum&pagesize=100000&format=xlsx&lang=${this.lang}`
    },
    organisationTypes() {
      return this.fields.reporting_organisation_type.map(item => {
        return {
          code: item.code,
          label: `${item.code} - ${item.name}`
        }
      })
    },
    lang() {
      return this.$i18n.locale
    },
    calendarYears() {
      var years = []
      const year = new Date().getFullYear()
      const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      return range(year-2, year+3).map(year => { return `${year}` })
    },
    calendarYearsForQuery() {
      return this.calendarYears.map(year => { return `"${year}"`}).join(";")
    },
    transactionTypeFields() {
      return ['commitments', 'disbursements', 'expenditure', 'budget'].reduce((summary, item) => {

        const thisYear = new Date().getFullYear()
        this.calendarYears.forEach(year => {
          if (['commitments', 'disbursements', 'expenditure'].includes(item)) {
            if (year > thisYear) { return summary }
          } else if (item == 'budget') {
            if (year < thisYear) { return summary }
          }
          summary.push(`${item}_${year}`)
        })
        return summary
      }, [])
    },
    dataFields() {
      const order = {
        'commitments': 0,
        'disbursements': 1,
        'expenditure': 2,
        'budget': 3
      }
      var sortedTransactionTypes = this.transactionTypeFields.sort((a, b) => {
        var [_a_type, _a_year] = a.split("_")
        const _a_type_order = order[_a_type]
        var [_b_type, _b_year] = b.split("_")
        const _b_type_order = order[_b_type]
        if (_a_type == _b_type) {
          if (_a_year > _b_year) {
            return 1
          } else {
            return -1
          }
        } else {
          return (_a_type_order > _b_type_order)
        }
      })

      return [{key: 'publisher', sortable: true}].concat(
        sortedTransactionTypes.map(item => {
          return {
            key: item,
            formatter: 'valueFormatter',
            sortable: true
          }
        })
      )
    },...mapState(['fields'])
  },
  methods: {
    valueFormatter(value) {
      var _value = value ? value/1000000.0 : 0
      _value = _value.toLocaleString(undefined, {
        maximumFractionDigits: 0
      })
      return `${_value} mn`
    },
    async loadData() {
      this.isBusy = true
      const url = this.jsonURL
      var data = await axios.get(url)
      this.data = Object.values(data.data.cells.reduce((summary, item) => {
        const thisYear = new Date().getFullYear()
        const defaultDict = this.dataFields.filter(item => item.key != 'publisher').reduce((summary, item) => {
          summary[item.key] = 0
          summary._cellVariants[item.key] = 'warning'
          return summary
        }, {_cellVariants: {}})
        if (!(item['reporting_organisation.code'] in summary)) {
          summary[item['reporting_organisation.code']] = {
            publisher: item[`reporting_organisation.name_${this.lang}`],
            ...defaultDict
          }
        }
        var year, transaction_type_key
        var year = item['year.year']
        if (item['transaction_type.code'] == '2') {
          var transaction_type_key = `commitments_${year}`
        } else if (item['transaction_type.code'] == '3') {
          var year = item['year.year']
          var transaction_type_key = `disbursements_${year}`
        } else if (item['transaction_type.code'] == '4') {
          var transaction_type_key = `expenditure_${year}`
        } else if (item['transaction_type.code'] == 'budget') {
          var transaction_type_key = `budget_${year}`
        } else { return summary }
        summary[item['reporting_organisation.code']][transaction_type_key] = item['value_usd.sum']
        if (item['value_usd.sum'] != 0) {
          summary[item['reporting_organisation.code']]._cellVariants[transaction_type_key] = null
        }
        return summary
      }, {}))
      this.isBusy = false
    }
  },
  async mounted() {
    await this.$store.dispatch('getCodelists')
    this.loadData()
  },
  watch: {
    organisationType() {
      this.loadData()
    }
  }
}
</script>
