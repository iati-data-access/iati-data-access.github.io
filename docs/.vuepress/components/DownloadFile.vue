<template>
  <div class="home">
    <div class="hero">
      <v-select
        :options="countries"
        label="country_name"
        :reduce="country => country.country_code"
        placeholder="Select a country"
        v-model="selectedCountry"
      ></v-select>
      <p><a
        :href="selectedCountryURL"
        v-if="selectedCountry"
        class="nav-link action-button">Download file →</a></p>
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
      selectedCountry: null
    }
  },
  computed: {
    selectedCountryURL() {
      return `https://github.com/markbrough/iati-data-access/blob/gh-pages/${this.selectedCountry}.xlsx?raw=true`
    }
  },
  async beforeMount() {
    var data = await axios.get(`https://raw.githubusercontent.com/markbrough/iati-data-access/gh-pages/index.json`)
    this.countries = data.data.sort((a, b) => {
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