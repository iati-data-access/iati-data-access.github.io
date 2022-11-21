<template>
  <div>
    <DataBrowserNavbar />
    <h1>Custom data download</h1>
    <b-row>
      <b-col>
        <DataBrowserFilter
          :setFields.sync="setFields"
          :currency.sync="currency"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="3" class="mt-2">
        <b-form-group
          label="Summarise by">
          <v-select
            multiple
            :options="drilldownOptions"
            v-model="drilldowns"
            :reduce="drilldown => drilldown.value"
            ></v-select>
        </b-form-group>
        <b-form-group>
          <b-btn variant="primary"
            @click="runData">Run</b-btn>
        </b-form-group>
      </b-col>
      <b-col md="9" class="mt-2">
        <h2>Preview</h2>
        <DataBrowser
          ref="dataBrowser"
          :drilldowns="drilldowns"
          displayAs="table"
          :setFields="setFields"
          :currency.sync="currency"
          :auto-reload="false"
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
      drilldowns: ['recipient_country_or_region'],
      setFields: {
        year: [lastYear],
        transaction_type: ['budget']
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
