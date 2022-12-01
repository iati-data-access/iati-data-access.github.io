<template>
  <div class="float-right access-analyse-video">
    <b-form-group
      label="Select video"
      label-size="sm">
      <b-form-radio-group
        v-model="accessAnalyse"
        :options="$t('accessAnalyseOptions')"
        name="radio-inline"
        buttons
        button-variant="outline-secondary"
      ></b-form-radio-group>
    </b-form-group>
    <iframe
      v-if="option.value == accessAnalyse"
      v-for="option in $t('accessAnalyseOptions')"
      v-bind:key="option.value"
      width="100%" height="315" :src="`https://www.youtube.com/embed/${option.value}?controls=0`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="margin:0px 0px 10px 0px;"></iframe>
  </div>
</template>
<style>
.access-analyse-video {
  margin-left: 15px;
  min-width: 500px;
}
</style>
<script>
import axios from 'axios'
export default {
  name: 'AccessAnalyse',
  data () {
    return {
      countries: [],
      selectedCountry: null,
      lastUpdated: null,
      language: 'en',
      accessAnalyse: 'C9lZ-axeDMA'
    }
  },
  computed: {
    languageOptions() {
      return this.$t('languageOptions')
    }
  },
  async beforeMount() {
    this.language = this.$i18n.locale
    this.accessAnalyse = this.$t('accessAnalyseOptions')[0].value
  }
}
</script>