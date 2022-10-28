<template>
  <div>
    <h2>
      Country dashboard for <b>Afghanistan</b>
    </h2>
    <b-row>
      <b-col md="6" class="mt-2">
        <h3>by Reporting Organisation</h3>
        <DataBrowser
          drilldown="reporting_organisation"
          :setFields="setFields"
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h3>by Sector</h3>
        <DataBrowser
          drilldown="sector_category"
          :setFields="setFields"
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
         />
      </b-col>
      <b-col md="6" class="mt-2">
        <h3>by Aid Type</h3>
        <DataBrowser
          drilldown="aid_type"
          :setFields="setFields"
         />
      </b-col>
    </b-row>
  </div>
</template>
<script>

import DataBrowser from '~/components/DataBrowser'
export default {
  components: { DataBrowser },
  data() {
    return {
      setFields: {
        reporting_organisation: [],
        aid_type: [],
        finance_type: [],
        flow_type: [],
        transaction_type: ['3', '4'],
        sector_category: [],
        sector: [],
        recipient_country_or_region: ['AF'],
        year: ['2020']
      }
    }
  }
}
</script>
