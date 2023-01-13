<template>
  <div>
    <DataBrowserNavbar />
    <h1>
      Sectors
    </h1>
    <p class="lead">Select a sector to explore the data.</p>
    <template v-if="fields.recipient_country_or_region.length >0 ">
      <b-card-group columns>
        <b-card
          v-for="sector_category in fields.sector_category"
          v-bind:key="sector_category.code">
          <nuxt-link
          :to="localePath({
            name: `data-sectors-code`, params: { code: sector_category.code }
          })">{{ sector_category.code }} - {{ sector_category.name }}</nuxt-link>
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
  },
  head() {
    return {
      title: `${this.$t('bySector')} - ${this.$t('dashboards')} - ${this.$t('title')}`,
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
  }
}
</script>
