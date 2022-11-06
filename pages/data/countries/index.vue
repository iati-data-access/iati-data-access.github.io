<template>
  <div>
    <DataBrowserNavbar />
    <h2>
      All Countries
    </h2>
    <b-row>
      <b-col md="12" class="mt-2">
        <DataBrowserAggregates
          :pageSize="null"
          displayAs="map"
          drilldown="recipient_country_or_region"
         />
      </b-col>
    </b-row>
  </div>
</template>
<style>

@media (min-width: 768px) {
  .scrollable-menu {
      height: auto;
      max-height: calc(100vh - 140px);
      overflow-x: hidden;
  }
}

@media (max-width: 767px) {
  .scrollable-menu {
    height: auto;
    max-height: calc(100vh - 320px);
    overflow-x: hidden;
  }
}
</style>
<script>

import { mapState } from 'vuex'
import DataBrowserAggregates from '~/components/DataBrowserAggregates'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
export default {
  components: { DataBrowserAggregates, DataBrowserNavbar },
  data() {
    return {
      drilldown: 'recipient_country_or_region',
      drilldownValue: this.$route.params.code
    }
  },
  computed: {
    setFields() {
      return {
        reporting_organisation: [],
        aid_type: [],
        finance_type: [],
        flow_type: [],
        transaction_type: ['3', '4'],
        sector_category: [],
        sector: [],
        recipient_country_or_region: [],
        year: ['2020']
      }
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
