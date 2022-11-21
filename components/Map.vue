<template>
  <div>
    <client-only>
      <l-map
        class="region-map"
        :zoom="zoom"
        :center="center"
        :options="mapControls"
      >
      <MapFeature
        v-for="region in regions"
        v-bind:key="region.iso2"
        v-if="region.iso2!='-99'"
        :region-colours="regionColours"
        :geojson="region.features"
        :region="region.region"
        :iso2="region.iso2"
        :regionName="region.regionName"
        :selectedRegion.sync="filterRegion"
        :regionData="regionData"
        :currency="currency" />
      </l-map>
    </client-only>
  </div>
</template>
<style>
.region-map {
  height: 350px !important;
  width: 100%;
  background: none;
}
</style>
<script>

import axios from 'axios'
import MapFeature from './MapFeature.vue'
export default {
  data() {
    return {
      zoom: 1.5,
      center: [0, 0],
      regions: [],
      url: "https://api.mapbox.com/styles/v1/markbrough/ckhe9jol304hs19pd9xkkswsf/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFya2Jyb3VnaCIsImEiOiJUZXFjRHowIn0.8e3Fq018PP1x5QMTxa8n_A",
      mapControls: {
        scrollWheelZoom: false,
        touchZoom: false,
        /*
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        keyboard: false,
        doubleClickZoom: false,
        boxZoom: false,
        tap: false
        */
      }
    }
  },
  props: [
    'data',
    'total',
    'selected-region',
    'datasets',
    'currency'
  ],
  components: {
    MapFeature
  },
  computed: {
    filterRegion: {
      get() {
        return this.selectedRegion
      },
      set: function(newValue) {
        this.$emit('update:selectedRegion', newValue)
      }
    },
    regionData() {
      return this.data.reduce((summary, item) => {
        summary[item["recipient_country_or_region.code"]] = {
          opacity: (item[`value_${this.currency}.sum`] / this.total)*100,
          value: item[`value_${this.currency}.sum`].toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
        }
        return summary
      }, {})
    },
    regionColours() {
      return this.regions.reduce((summary, item) => {
        summary[item.name] = this.datasets[0].backgroundColor
        return summary
      }, {})
    }
  },
  methods: {
    getGeoJSON() {
      axios.get(`/custom.geo.json`)
      .then(response => {
        this.regions = response.data.features.map(item => {
          return {
            type: 'FeatureCollection',
            name: item.properties.name,
            region: item.properties.name,
            regionName: item.properties.name,
            iso2: item.properties.iso_a2,
            features: {
              type: 'Feature',
              properties: {
                Region: item.properties.name
              },
              geometry: item.geometry
            }
          }
        })
      })
    }
  },
  mounted() {
    this.getGeoJSON()
  }
}
</script>