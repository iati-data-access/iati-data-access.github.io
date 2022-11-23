<template>
  <div>
    <DataBrowserNavbar />
    <h1>
      Providers
    </h1>
    <p class="lead">Select a provider to explore the data.</p>
    <template v-if="fields.reporting_organisation.length >0 ">
      <b-card-group columns>
        <b-card
          v-for="provider in fields.reporting_organisation"
          v-bind:key="provider.code">
          <nuxt-link
          variant="link"
          :to="localePath({
            name: `data-providers-code`, params: { code: provider.code }
          })">{{ provider.name }}</nuxt-link>
        </b-card>
      </b-card-group>
    </template>
    <template v-else>
      <div class="text-center">
        <b-spinner variant="secondary" />
      </div>
    </template>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['fields'])
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  }
}
</script>
