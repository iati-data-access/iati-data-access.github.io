<template>
  <div>
    <client-only>
      <l-map
        class="region-map"
        :zoom="zoom"
        :center="center"
        :options="mapControls"
      >
      <l-control-attribution position="bottomright" :prefix="mapAttribution"></l-control-attribution>
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
          v-for="(region, ir) in regions"
          v-bind:key="ir"
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
      center: [10, 0],
      regions: [],
      mapAttribution: '<a href="https://datacatalog.worldbank.org/search/dataset/0038272/World-Bank-Official-Boundaries">Map data</a> &copy; World Bank Group | <a href="https://leafletjs.com/">Leaflet</a>',
      mapControls: {
        scrollWheelZoom: false,
        touchZoom: false,
        attributionControl: false
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
      axios.get(`/worldbank.geo.json`)
      .then(response => {
        this.regions = response.data.features.map(item => {
          const name = item.properties[`NAME_${this.$i18n.locale.toUpperCase()}`]
          const iso2 = (item.properties.WB_A2 == 'FR') ? item.properties.WB_A2 : item.properties.ISO_A2
          return {
            type: 'FeatureCollection',
            name: name,
            region: name,
            regionName: name,
            iso2: iso2,
            features: {
              type: 'Feature',
              properties: {
                Region: name
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