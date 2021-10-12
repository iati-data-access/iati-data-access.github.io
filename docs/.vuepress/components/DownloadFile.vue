<template>
  <div class="home">
    <div class="hero">
      <v-select
        :options="countries"
        label="country_name"
        :reduce="country => country.country_code"
        :placeholder="$themeLocaleConfig.translations.selectCountry"
        v-model="selectedCountry"
      ></v-select>
      <p v-if="selectedCountry"
        class="mt-3">
        <a
          :href="selectedCountryURL"
          class="nav-link action-button">{{ this.$themeLocaleConfig.translations.downloadFile }} →</a>
      </p>
      <hr />
      <p class="last-updated">{{ this.$themeLocaleConfig.translations.lastUpdated }} <code>{{ lastUpdated}}</code></p>
    </div>
  </div>
</template>
<style>
</style>
<script>
import axios from 'axios'
export default {
  name: 'DownloadFile',
  data () {
    return {
      countries: [],
      selectedCountry: null,
      lastUpdated: null
    }
  },
  computed: {
    selectedCountryURL() {
      return `https://countrydata.iatistandard.org/data-${this.$themeLocaleConfig.language}/${this.selectedCountry}.xlsx`
    }
  },
  async beforeMount() {
    var data = await axios.get(`https://countrydata.iatistandard.org/data/index.json`)
    this.lastUpdated = data.data.lastUpdated
    this.countries = data.data.countries.sort((a, b) => {
      const countryRegionBool = {'country': 0, 'region': 1}
      if (countryRegionBool[a.country_or_region] > countryRegionBool[b.country_or_region]) {
        return 1
      } else if (countryRegionBool[a.country_or_region] < countryRegionBool[b.country_or_region]) {
        return -1
      } else if (a.country_name > b.country_name) {
        return 1
      } else if (a.country_name < b.country_name) {
        return -1
      }
      return 0
    })
  }
}
</script>