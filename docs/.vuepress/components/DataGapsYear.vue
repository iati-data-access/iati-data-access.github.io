<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group
          label="Organisation Type">
          <b-select
            :options="organisationTypes"
            v-model="organisationType">
          </b-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          :fields="dataFields"
          :items="filteredData">
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>
<style>
.theme-default-content:not(.custom) {
  max-width: inherit;
}
</style>
<script>
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'DataGapsYear',
  data () {
    return {
      data: [],
      organisationTypes: [],
      organisationType: '10 - Government',
      transactionTypeFields: []
    }
  },
  computed: {
    filteredData() {
      return this.data.filter(item => {
        return item.publisher_type == this.organisationType
      })
    },
    dataFields() {
      const order = {
        'commitments': 0,
        'disbursements': 1,
        'budget': 2
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
    }
  },
  methods: {
    valueFormatter(value) {
      var _value = value ? value/1000000.0 : 0
      _value = _value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
      return `${_value} mn`
    }
  },
  async beforeMount() {
    var data = await axios.get(`https://iati-data-access.github.io/data/summary_year.json`)
    const thisYear = new Date().getFullYear()
    this.data = Object.entries(data.data.summary).reduce((summary, item)=> {

      var publisher_data = {
        'publisher': item[0],
        'publisher_type': item[1]['type'],
        _cellVariants: {}
      }
      item[1]['data'].forEach(dataItem => {
        var year, transaction_type_key
        if (dataItem['transaction_type'] == '2 - Outgoing Commitment') {
          var year = dataItem['year']
          if (year > thisYear) { return }
          var transaction_type_key = `commitments_${year}`
        } else if (dataItem['transaction_type'] == '3 - Disbursement') {
          var year = dataItem['year']
          if (year > thisYear) { return }
          var transaction_type_key = `disbursements_${year}`
        } else if (dataItem['transaction_type'] == 'budget - Budget') {
          var year = dataItem['year']
          if (year < thisYear) { return }
          var transaction_type_key = `budget_${year}`
        } else { return }
        if (!this.transactionTypeFields.includes(transaction_type_key)) {
          this.transactionTypeFields.push(transaction_type_key)
        }
        publisher_data[transaction_type_key] = dataItem['value']
        if (dataItem['value'] == 0) {
          publisher_data._cellVariants[transaction_type_key] = 'warning'
        }
      })
      summary.push(publisher_data)
      return summary
    }, [])
    this.organisationTypes = Object.values(data.data.summary).reduce((summary, item)=> {
      if (!summary.includes(item["type"])) {
        summary.push(item['type'])
      }
      return summary
    }, []).sort()
  }
}
</script>