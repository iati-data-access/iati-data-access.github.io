<template>
  <div class="custom-data-browser">
    <DataBrowserNavbar />
    <h1>Custom data download</h1>
    <b-row>
      <b-col md="3" class="mt-2">
        <h2>Columns and Filters</h2>
        <b-form-group
          label="Select columns">
          <v-select
            multiple
            :options="drilldownOptions"
            v-model="drilldowns"
            :reduce="drilldown => drilldown.value"
            ></v-select>
        </b-form-group>
        <DataBrowserFilter
          :setFields.sync="setFields"
          :currency.sync="currency"
          :horizontal="false"
        />
      </b-col>
      <b-col md="9" class="mt-2">
        <h2>Preview</h2>
        <DataBrowser
          ref="dataBrowser"
          :drilldowns="drilldowns"
          displayAs="table"
          :setFields="setFields"
          :currency.sync="currency"
         />
      </b-col>
    </b-row>
  </div>
</template>
<style>
.custom-data-browser {
  min-height: 650px;
}
</style>
<script>

import { mapState } from 'vuex'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
import DataBrowser from '~/components/DataBrowser'
export default {
  components: { DataBrowserNavbar, DataBrowser },
  data() {
    const lastYear = new Date().getFullYear()-1
    return {
      drilldowns: ['recipient_country_or_region', 'activity.iati_identifier', 'activity.title'],
      setFields: {
        year: [lastYear],
        transaction_type: ['budget'],
        calendar_year_and_quarter: []
      },
      currency: 'usd'
    }
  },
  methods: {
    runData() {
      this.$refs.dataBrowser.loadData()
    }
  },
  computed: {
    drilldownOptions() {
      return Object.entries(this.availableDrilldowns).map(item => {
        return {
          value: item[0],
          label: item[1]
        }
      })
    },...mapState(['availableDrilldowns'])
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  }
}
</script>
