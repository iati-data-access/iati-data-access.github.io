<template>
  <div>
    <DataBrowserNavbar />
    <h1>
      <b>{{ drilldownLabel }}</b> <span class="text-muted">Sector Dashboard</span>
    </h1>
    <hr />
    <b-row>
      <b-col>
        <h2>Summary</h2>
        <DataBrowser
          :drilldowns="['year.year']"
          :setFields="summarySetFields"
          :currency.sync="currency"
          bar-chart-height="300px"
          :show-number-results="false"
          :pageSize="null" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="mt-2">
        <h2>Explore the data</h2>
        <DataBrowserFilter
          :exclude-filters="['sector_category', 'transaction_type']"
          :setFields.sync="setFields"
          :currency.sync="currency"
         />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="mt-2">
        <h3>by Country</h3>
        <DataBrowser
          :drilldowns="['recipient_country_or_region']"
          displayAs="map"
          :setFields="setFields"
          :currency.sync="currency"
          :pageSize="null"
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h3>by Reporting Organisation</h3>
        <DataBrowser
          :drilldowns="['reporting_organisation']"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="mt-2">
        <h3>by Finance Type</h3>
        <DataBrowser
          :drilldowns="['finance_type']"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h3>by Aid Type</h3>
        <DataBrowser
          :drilldowns="['aid_type']"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="mt-2">
        <h3>by Organisation Type</h3>
        <DataBrowser
          :drilldowns="['reporting_organisation_type']"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h3>by Humanitarian / Development</h3>
        <DataBrowser
          :drilldowns="['humanitarian']"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="mt-2">
        <h3>by Activity</h3>
        <DataBrowser
          :drilldowns="['activity.iati_identifier', 'activity.title']"
          displayAs="table"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
    </b-row>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import DataBrowser from '~/components/DataBrowser'
import DataBrowserFilter from '~/components/DataBrowserFilter'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
export default {
  components: { DataBrowser, DataBrowserFilter },
  data() {
    const lastYear = new Date().getFullYear()-1
    return {
      drilldown: 'sector_category',
      drilldownValue: this.$route.params.code,
      setFields: {
        reporting_organisation: [],
        aid_type: [],
        finance_type: [],
        flow_type: [],
        transaction_type: ['3', '4'],
        sector_category: [this.$route.params.code],
        sector: [],
        recipient_country_or_region: [],
        year: [lastYear],
        calendar_year_and_quarter: []
      },
      currency: 'usd'
    }
  },
  computed: {
    summarySetFields() {
      return {
        sector_category: [this.$route.params.code],
        transaction_type: ['3', '4', 'budget'],
        year: this.calendarYears
      }
    },
    calendarYears() {
      var years = []
      const year = new Date().getFullYear()
      const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
      return range(year-3, year+3).map(year => { return `${year}` })
    },
    drilldownLabel() {
      if (this.fields[this.drilldown].length == 0) {
        return ''
      }
      return this.fields[this.drilldown].filter(drilldown => {
        return drilldown.code === this.drilldownValue
      })[0].label
    },...mapState(['fields'])
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  }
}
</script>
