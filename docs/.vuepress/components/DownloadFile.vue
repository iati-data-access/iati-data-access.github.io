<template>
  <div>
    <v-select
      :options="countries"
      label="country_name"
      :reduce="country => country.country_code"
      placeholder="Select a country"
      v-model="selectedCountry"
    ></v-select>
    <p><a :href="selectedCountryURL" v-if="selectedCountry">Download file</a></p>
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
      countries: [{label: 'Canada', code: 'ca'}],
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
    console.log(data.data)
    this.countries = data.data
  }
}
</script>