<template>
  <div class="home text-center">
    <div class="hero">
      <v-select
        :options="countries"
        label="country_name"
        :reduce="country => country.country_code"
        :placeholder="$t('translations.selectCountry')"
        v-model="selectedCountry"
      ></v-select>
      <p v-if="selectedCountry"
        class="mt-3">
        <b-btn
          :href="selectedCountryURL"
          variant="success"
          size="lg">{{ $t('translations.downloadFile') }} →</b-btn>
        <b-form-group :label="$t('translations.language')" class="mt-2">
          <b-form-radio-group
            v-model="language"
            :options="languageOptions"
            name="radio-inline"
          ></b-form-radio-group>
        </b-form-group>
      </p>
      <hr />
      <p class="last-updated">{{ $t('translations.lastUpdated') }} <code>{{ lastUpdated}}</code></p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'DownloadFile',
  data () {
    return {
      countries: [],
      selectedCountry: null,
      lastUpdated: null,
      language: 'en'
    }
  },
  computed: {
    languageOptions() {
      return this.$t('languageOptions')
    },
    selectedCountryURL() {
      return `https://countrydata.iatistandard.org/data-${this.language}/${this.selectedCountry}.xlsx`
    }
  },
  async beforeMount() {
    this.language = this.$i18n.locale
    var data = await axios.get(`https://countrydata.iatistandard.org/data-${this.$t('language')}/index.json`)
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