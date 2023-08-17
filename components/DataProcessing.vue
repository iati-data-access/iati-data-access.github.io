<template>
  <div>
    <b-row>
      <b-col>
        <b-table
          responsive
          :fields="dataFields"
          :items="data"
          :busy="isBusy"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          show-empty>
          <template #table-busy>
            <div class="text-center text-secondary my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template #empty="scope">
            <p class="lead">{{ $t('dataDashboards.noResults') }}</p>
          </template>
          <template #[countriesSlotName]="data">
            {{ countries[data.item['dataset.country']] }}
          </template>
          <template #[statusSlotName]="data">
            {{ statuses[data.item['status']] }}
          </template>
        </b-table>
        <b-pagination
          align="fill"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="pageSize"></b-pagination>
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
  name: 'DataProcessing',
  data () {
    return {
      data: [],
      organisationType: '10',
      isBusy: true,
      sortBy: 'dataset.id',
      sortDesc: false,
      totalRows: 0,
      currentPage: 1,
      pageSize: 20
    }
  },
  computed: {
    countriesSlotName() {
      return `cell(dataset.country)`
    },
    statusSlotName() {
      return `cell(status)`
    },
    jsonURL() {
      const order = this.sortDesc == true ? `${this.sortBy}:desc` : `${this.sortBy}:asc`
      return `${this.$config.baseURL}/babbage/cubes/dataset/facts/?order=${order}&page=${this.currentPage}&pagesize=${this.pageSize}`
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
    countries() {
      return this.fields.recipient_country_or_region.reduce((summary, item) => {
        summary[item.code] = item.name
        return summary
      }, {})
    },
    statuses() {
      return {
        1: this.$t('dataProcessing.processing'),
        2: this.$t('dataProcessing.complete')
      }
    },
    dataFields() {
      return [
        {
          key: 'dataset.id',
          label: this.$t('dataProcessing.id'),
          sortable: true
        },
        {
          key: 'dataset.dataset_type',
          label: this.$t('dataProcessing.type'),
          sortable: true
        },
        {
          key: 'dataset.country',
          label: this.$t('dataProcessing.country'),
          sortable: true
        },
        {
          key: 'dataset.processing_at',
          label: this.$t('dataProcessing.beganProcessing'),
          formatter: this.dateFormatter,
          sortable: true
        },
        {
          key: 'dataset.updated_at',
          label: this.$t('dataProcessing.completedProcessing'),
          formatter: this.dateFormatter,
          sortable: true
        },
        {
          key: 'status',
          label: this.$t('dataProcessing.status'),
          sortable: true
        }
      ]
    },...mapState(['fields'])
  },
  methods: {
    dateFormatter(value) {
      return new Date(value).toLocaleString()
    },
    async loadData() {
      this.isBusy = true
      const url = this.jsonURL
      var response = await axios.get(url)
      this.data = response.data.data
      this.totalRows = response.data.total_fact_count
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
    },
    sortBy() {
      this.loadData()
    },
    sortDesc() {
      this.loadData()
    },
    currentPage() {
      this.loadData()
    },
    pageSize() {
      this.loadData()
    }
  }
}
</script>
