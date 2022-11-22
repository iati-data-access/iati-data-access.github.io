<template>
  <div>
    <DataBrowserNavbar />
    <h1>Summary</h1>
    <b-row>
      <b-col>
        <DataBrowserFilter
          :exclude-filters="['transaction_type']"
          :setFields.sync="setFields"
          :currency.sync="currency"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="mt-2">
        <h2>By country</h2>
        <DataBrowser
          :drilldowns="['recipient_country_or_region']"
          displayAs="map"
          :setFields="setFields"
          :currency.sync="currency"
          :pageSize="null"
          :clickable="true"
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h2>By provider</h2>
        <DataBrowser
          :drilldowns="['reporting_organisation']"
          displayAs="barChart"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="mt-2">
        <h2>By sector</h2>
        <DataBrowser
          :drilldowns="['sector_category']"
          displayAs="barChart"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
    </b-row>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
import DataBrowserAggregates from '~/components/DataBrowserAggregates'
import DataBrowser from '~/components/DataBrowser'
export default {
  components: { DataBrowserNavbar, DataBrowserAggregates, DataBrowser },
  data() {
    const lastYear = new Date().getFullYear()-1
    return {
      drilldown: 'recipient_country_or_region',
      drilldownValue: this.$route.params.code,
      setFields: {
        transaction_type: ['3', '4'],
        year: [lastYear],
        calendar_year_and_quarter: [],
      },
      currency: 'usd'
    }
  },
  computed: {
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  }
}
</script>