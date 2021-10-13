<template>
  <div>
    <b-row>
      <b-col>
        <b-table
          :fields="$themeLocaleConfig.countriesCurrenciesFields"
          :items="countriesCurrencies">
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>
<style>
.theme-default-content:not(.custom) {
  max-width: inherit;
}
</style>
<script>
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'DataGapsYear',
  data () {
    return {
      countriesCurrencies: []
    }
  },
  computed: {
  },
  methods: {
  },
  async beforeMount() {
    const countries = await axios.get(`https://countrydata.iatistandard.org/data-${this.$themeLocaleConfig.language}/index.json`)
    const countriesObj = countries.data.countries.reduce((summary, item ) => {
      if (item.country_or_region=='country') {
        summary[item.country_code] = item.country_name
      }
      return summary
    }, {})
    const countryCurrencyMapping = await axios.get(`https://codeforiati.org/imf-exchangerates/currencies.json`)
    this.countriesCurrencies = Object.entries(countryCurrencyMapping.data).map(mapping => {
      return {
        countryCode: mapping[0],
        countryName: countriesObj[mapping[0]],
        currency: mapping[1]
      }
    })
  }
}
</script>