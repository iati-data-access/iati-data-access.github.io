<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="by Sector" active>
        <DataBrowser
          drilldown="recipient_country_or_region"
          :setFields="sectorSetFields"
          summary="sector_category"
         />
      </b-tab>
      <b-tab title="by Country">
        <DataBrowser
          drilldown="sector_category"
          :setFields="countrySetFields"
          summary="recipient_country_or_region"
         />
      </b-tab>
      <b-tab title="by Reporting Organisation">
        <DataBrowser
          drilldown="recipient_country_or_region"
          :setFields="reportingOrganisationSetFields"
          summary="reporting_organisation"
         />
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>

import DataBrowser from '~/components/DataBrowser'
export default {
  components: { DataBrowser },
  data() {
    return {
      sectorSetFields: {
        reporting_organisation: [],
        aid_type: [],
        finance_type: [],
        flow_type: [],
        transaction_type: ['3'],
        sector_category: ['110'],
        sector: [],
        recipient_country_or_region: [],
        year: ['2020']
      },
      countrySetFields: {
        reporting_organisation: [],
        aid_type: [],
        finance_type: [],
        flow_type: [],
        transaction_type: ['3'],
        sector_category: [],
        sector: [],
        recipient_country_or_region: ['AF'],
        year: ['2020']
      },
      reportingOrganisationSetFields: {
        reporting_organisation: ['44000'],
        aid_type: [],
        finance_type: [],
        flow_type: [],
        transaction_type: ['3'],
        sector_category: [],
        sector: [],
        recipient_country_or_region: [],
        year: ['2020']
      }
    }
  }
}
</script>
