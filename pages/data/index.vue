<template>
  <div>
    <DataBrowserNavbar />
    <h1>{{ $t('dataDashboards.summary') }}</h1>
    <b-row>
      <b-col>
        <DataBrowserFilter
          :exclude-filters="['transaction_type']"
          :setFields.sync="setFields"
          :currency.sync="currency"
          pageName="data"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2">
        <h2>{{ $t('dataDashboards.countries.by') }}</h2>
        <DataBrowser
          :drilldowns="['recipient_country_or_region']"
          displayAs="map"
          :setFields="setFields"
          :currency.sync="currency"
          :pageSize="null"
          :clickable="true"
         />
         <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2">
        <h2>{{ $t('dataDashboards.providers.by') }}</h2>
        <DataBrowser
          :drilldowns="['reporting_organisation']"
          displayAs="barChart"
          :setFields="setFields"
          :currency.sync="currency"
          :clickable="true"
         />
         <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2">
        <h2>{{ $t('dataDashboards.sectors.by') }}</h2>
        <DataBrowser
          :drilldowns="['sector_category']"
          displayAs="barChart"
          :setFields="setFields"
          :currency.sync="currency"
          :clickable="true"
         />
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h2>{{ $t('by') }} {{ $t('dataDashboards.availableDrilldowns')['year.year'] }}</h2>
        <DataBrowser
          :drilldowns="['year.year']"
          :setFields="summarySetFields"
          :currency.sync="currency"
          bar-chart-height="300px"
          :show-number-results="false"
          :pageSize="null"
          orderBy="year.year" />
        <p class="text-muted font-italic">{{ $t('dataDashboards.spendSummaryChartText') }}</p>
      </b-col>
    </b-row>
    <DataBrowserSource />
  </div>
</template>
<script>

import { mapState } from 'vuex'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
import DataBrowser from '~/components/DataBrowser'
export default {
  components: { DataBrowserNavbar, DataBrowser },
  data() {
    const lastYear = new Date().getFullYear()-1
    return {
      drilldown: 'recipient_country_or_region',
      drilldownValue: this.$route.params.code,
      setFields: {
        transaction_type: ['3', '4', 'budget'],
        year: [lastYear],
        calendar_year_and_quarter: [],
      },
      currency: 'usd'
    }
  },
  computed: {
    summarySetFields() {
      return {
        ...this.setFields,
        ...{
          year: this.calendarYears,
          calendar_year_and_quarter: [],
          transaction_type: ['3', '4', 'budget']
        }
      }
    },
    calendarYears() {
      var years = []
      const year = new Date().getFullYear()
      const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      return range(year-3, year+3).map(year => { return `${year}` })
    }
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  },
  head() {
    return {
      title: `${this.$t('dataDashboards.label')} - ${this.$t('title')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('description')
        }
      ],
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  },
  watch: {
    '$i18n.locale'() {
      this.$store.dispatch('getCodelists')
    }
  }
}
</script>