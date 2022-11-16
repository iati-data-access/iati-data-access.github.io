<template>
  <div>
    <DataBrowserNavbar />
    <h1>Summary</h1>
    <b-row>
      <b-col md="6" class="mt-2">
        <h2>By country</h2>
        <DataBrowserAggregates
          :pageSize="null"
          displayAs="map"
          drilldown="recipient_country_or_region"
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h2>By provider</h2>
        <DataBrowserAggregates
          displayAs="barChart"
          drilldown="reporting_organisation"
         />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="mt-2">
        <h2>By sector</h2>
        <DataBrowserAggregates
          displayAs="barChart"
          drilldown="sector_category"
         />
      </b-col>
    </b-row>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
import DataBrowserAggregates from '~/components/DataBrowserAggregates'
export default {
  components: { DataBrowserNavbar, DataBrowserAggregates },
  data() {
    return {
      drilldown: 'recipient_country_or_region',
      drilldownValue: this.$route.params.code
    }
  },
  computed: {
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  }
}
</script>