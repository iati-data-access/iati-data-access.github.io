<template>
  <div>
    <DataBrowserNavbar />
    <h1>
      Countries
    </h1>
    <p class="lead">Select a country to explore the data.</p>
    <template v-if="fields.recipient_country_or_region.length >0 ">
      <b-card-group columns>
        <b-card
          v-for="country in fields.recipient_country_or_region"
          v-bind:key="country.code">
          <nuxt-link
          variant="link"
          :to="localePath({
            name: `data-countries-code`, params: { code: country.code }
          })">{{ country.name }}</nuxt-link>
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
