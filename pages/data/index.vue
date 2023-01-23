<template>
  <div>
    <DataBrowserNavbar />
    <h1>{{ $t('dataDashboards.summary') }}</h1>
    <b-row>
      <b-col>
        <DataBrowserFilter
          :exclude-filters="['transaction_type']"
          :setFields.sync="setFields"
          :currency.sync="currency"
          pageName="data"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2">
        <h2>{{ $t('dataDashboards.countries.by') }}</h2>
        <DataBrowser
          :drilldowns="['recipient_country_or_region']"
          displayAs="map"
          :setFields="setFields"
          :currency.sync="currency"
          :pageSize="null"
          :clickable="true"
         />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2">
        <h2>{{ $t('dataDashboards.providers.by') }}</h2>
        <DataBrowser
          :drilldowns="['reporting_organisation']"
          displayAs="barChart"
          :setFields="setFields"
          :currency.sync="currency"
          :clickable="true"
         />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-2">
        <h2>{{ $t('dataDashboards.sectors.by') }}</h2>
        <DataBrowser
          :drilldowns="['sector_category']"
          displayAs="barChart"
          :setFields="setFields"
          :currency.sync="currency"
          :clickable="true"
         />
      </b-col>
    </b-row>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
import DataBrowser from '~/components/DataBrowser'
export default {
  components: { DataBrowserNavbar, DataBrowser },
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
  },
  head() {
    return {
      title: `${this.$t('dataDashboards.label')} - ${this.$t('title')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('description')
        }
      ],
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  },
  watch: {
    '$i18n.locale'() {
      this.$store.dispatch('getCodelists')
    }
  }
}
</script>