<template>
  <div>
    <client-only>
      <l-map
        class="region-map"
        :zoom="zoom"
        :center="center"
        :options="mapControls"
      >
      <l-control-layers
        position="topright"
        :collapsed="false"
      ></l-control-layers>
      <l-layer-group
        :name="dataset.label"
        pane="overlayPane"
        :ref="dataset.label"
        v-for="(dataset, i) in datasets"
        v-bind:key="dataset.label"
        :dataset="dataset"
        layerType="base"
        :visible="i==0">
        <MapFeature
          v-for="region in regions"
          v-bind:key="region.iso2"
          v-if="region.iso2!='-99'"
          :region-colours="dataset.backgroundColor"
          :geojson="region.features"
          :region="region.region"
          :iso2="region.iso2"
          :regionName="region.regionName"
          :selectedRegion.sync="filterRegion"
          :regionData="regionData[i]"
          :currency="currency" />
        </l-layer-group>
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
  props: {
    data: {
      default() {
        return []
      }
    },
    total: {
      default: 0.0
    },
    selectedRegion: {
      default() {
        return []
      }
    },
    datasets: {
      default() {
        return []
      }
    },
    currency: {
      default: 'usd'
    },
  },
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
      return this.datasets.map(dataset => {
        const total = this.data.reduce((total, item) => {
          total += item[dataset.field] ? item[dataset.field] : 0.0
          return total
        }, 0.0)
        return this.data.reduce((summary, item) => {
          summary[item["recipient_country_or_region.code"]] = {
            opacity: (item[dataset.field] / total)*100,
            value: item[dataset.field] == null ? "0.00" : item[dataset.field].toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })
          }
          return summary
        }, {})
      })
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