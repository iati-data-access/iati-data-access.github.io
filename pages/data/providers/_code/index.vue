<template>
  <div>
    <DataBrowserNavbar />
    <h2>
      Provider dashboard for <b>{{ drilldownLabel }}</b>
    </h2>
    <b-row>
      <b-col>
        <DataBrowserSpendSummary
          drilldown="reporting_organisation"
          :drilldown-value="drilldownValue" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="mt-2">
        <DataBrowserFilter
          :exclude-filters="['reporting_organisation', 'transaction_type']"
          :setFields.sync="setFields"
          :currency.sync="currency"
         />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="mt-2">
        <h3>by Country</h3>
        <DataBrowser
          drilldown="recipient_country_or_region"
          displayAs="map"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h3>by Sector</h3>
        <DataBrowser
          drilldown="sector_category"
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
          drilldown="finance_type"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h3>by Aid Type</h3>
        <DataBrowser
          drilldown="aid_type"
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
          drilldown="reporting_organisation.type"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h3>by Humanitarian / Development</h3>
        <DataBrowser
          drilldown="humanitarian"
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
          drilldown="activity.title"
          displayAs="table"
          :setFields="setFields"
          :currency.sync="currency"
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
import DataBrowser from '~/components/DataBrowser'
import DataBrowserFilter from '~/components/DataBrowserFilter'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
import DataBrowserSpendSummary from '~/components/DataBrowserSpendSummary'
export default {
  components: { DataBrowser, DataBrowserFilter, DataBrowserSpendSummary },
  data() {
    return {
      drilldown: 'reporting_organisation',
      drilldownValue: this.$route.params.code,
      setFields: {
        reporting_organisation: [this.$route.params.code],
        aid_type: [],
        finance_type: [],
        flow_type: [],
        transaction_type: ['3', '4'],
        sector_category: [],
        sector: [],
        recipient_country_or_region: [],
        year: ['2021']
      },
      currency: 'usd'
    }
  },
  computed: {
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
