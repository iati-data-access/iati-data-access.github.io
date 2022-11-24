<template>
  <div class="custom-data-browser">
    <DataBrowserNavbar />
    <h1>Custom data download</h1>
    <b-row>
      <b-col md="3" class="mt-2">
        <h3>Columns</h3>
        <b-form-group
          label="Select columns">
          <v-select
            multiple
            :options="drilldownOptions"
            v-model="drilldowns"
            :reduce="drilldown => drilldown.value"
            ></v-select>
        </b-form-group>
        <hr />
        <h3>Filters</h3>
        <DataBrowserFilterItem
          field="recipient_country_or_region"
          :fieldOptions="fields.recipient_country_or_region"
          :fieldLabel="fieldNames.recipient_country_or_region[lang]"
          :lang="lang"
          :value="setFields.recipient_country_or_region"
          :updateField="updateField">
        </DataBrowserFilterItem>

        <DataBrowserFilterItem
          field="reporting_organisation"
          :fieldOptions="fields.reporting_organisation"
          :fieldLabel="fieldNames.reporting_organisation[lang]"
          :lang="lang"
          :value="setFields.reporting_organisation"
          :updateField="updateField">
        </DataBrowserFilterItem>

        <DataBrowserFilterItem
          field="sector_category"
          :fieldOptions="fields.sector_category"
          :fieldLabel="fieldNames.sector_category[lang]"
          :lang="lang"
          :value="setFields.sector_category"
          :updateField="updateField">
        </DataBrowserFilterItem>

        <DataBrowserFilter
          :exclude-filters="['recipient_country_or_region',
            'reporting_organisation',
            'sector_category']"
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
          :autoReload="autoReload"
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
      currency: 'usd',
      autoReload: true
    }
  },
  methods: {
    runData() {
      this.$refs.dataBrowser.loadData()
    },
    updateField(field, values) {
      this.$set(this.setFields, field, values)
    }
  },
  computed: {
    lang() {
      return 'en' // this.$i18n.locale
    },
    drilldownOptions() {
      return Object.entries(this.availableDrilldowns).map(item => {
        return {
          value: item[0],
          label: item[1]
        }
      })
    },...mapState(['availableDrilldowns', 'fields', 'fieldNames'])
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  }
}
</script>
