<template>
  <div>
    <DataBrowserNavbar />
    <b-jumbotron header="Data" lead="You can explore data through dashboards summarised by country, provider and sector. Try some of the examples below.">
      <b-btn
        :to="localePath({name: 'data-countries-code', params: { code: 'RW' }})"
        variant="primary">Rwanda</b-btn>
      <b-btn
        :to="localePath({name: 'data-providers-code', params: { code: 'XM-DAC-46002' }})"
        variant="primary">African Development Bank</b-btn>
      <b-btn
        :to="localePath({name: 'data-sectors-code', params: { code: '110' }})"
        variant="primary">Education</b-btn>
    </b-jumbotron>
  </div>
</template>
<script>
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
export default {
  components: { DataBrowserNavbar },
  data() {
    return {

    }
  },
}
</script>