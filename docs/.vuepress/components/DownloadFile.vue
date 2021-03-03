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
      <p v-if="selectedCountry"
        class="mt-3">
        <a
          :href="selectedCountryURLTransactions"
          class="nav-link action-button">Download transactions file →</a>
        <br />Contains commitments, disbursements and expenditures
      </p>
      <p v-if="selectedCountry"
        class="mt-3">
        <a
          :href="selectedCountryURLBudgets"
          class="nav-link action-button">Download budgets file →</a>
        <br />Contains forward-looking budget data
      </p>
      <hr />
      <p class="last-updated">Last updated: <code>{{ lastUpdated}}</code></p>
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
    selectedCountryURLBudgets() {
      return `https://iati-data-access.github.io/data/budget-${this.selectedCountry}.xlsx?raw=true`
    },
    selectedCountryURLTransactions() {
      return `https://iati-data-access.github.io/data/${this.selectedCountry}.xlsx?raw=true`
    }
  },
  async beforeMount() {
    var data = await axios.get(`https://iati-data-access.github.io/data/index.json`)
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