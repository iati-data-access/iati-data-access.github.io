<template>
  <div>
    <DataBrowserNavbar />
    <h1>
      {{ $t('dataDashboards.providers.label') }}
    </h1>
    <p class="lead">{{ $t('dataDashboards.providers.select') }}</p>
    <template v-if="fields.reporting_organisation.length >0 ">
      <b-card-group columns>
        <b-card
          v-for="reporting_organisation in fields.reporting_organisation"
          v-bind:key="reporting_organisation.code">
          <nuxt-link
          variant="link"
          :to="localePath({
            name: `data-reporting-organisation-code`, params: { code: reporting_organisation.code }
          })">{{ reporting_organisation.name }}</nuxt-link>
        </b-card>
      </b-card-group>
    </template>
    <template v-else>
      <div class="text-center">
        <b-spinner variant="secondary" />
      </div>
    </template>
    <DataBrowserSource />
  </div>
</template>
<script>

import { mapState } from 'vuex'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
export default {
  name: 'DataReportingOrganisation',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['fields'])
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  },
  head() {
    return {
      title: `${this.$t('dataDashboards.providers.by')} - ${this.$t('dataDashboards.label')} - ${this.$t('title')}`,
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
