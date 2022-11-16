<template>
  <l-geo-json
    ref="geoJson"
    :geojson="geojson"
    :options="options"
    :options-style="optionsStyle"
  />
</template>
<script>
import { get } from 'axios'
export default {
  data() {
    return {
      zoom: 1.2,
      center: [45, 0],
      mapControls: {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false
      },
    }
  },
  props: ['region-colours',
    'region', 'region-name',
    'geojson', 'iso2', 'selected-region',
    'region-data'],
  components: {
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    filterRegion: {
      get() {
        return this.selectedRegion
      },
      set: function(newValue) {
        this.$emit('update:selectedRegion', newValue)
      }
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.on('mouseover', (e) => {
          e.target.setStyle({
            fillOpacity: 1
          });
        })
        layer.on('mouseout', (e) => {
          e.target.setStyle({
            fillOpacity: this.fillOpacity
          });
        })
        layer.on('click', () => {
          this.clickRegion()
        })
        layer.bindTooltip(
          `<b>${this.regionName}</b><br />Amount (USD): ${this.value}`,
          { permanent: false,
            sticky: true}
        );
      };
    },
    value () {
      return this.regionData[this.iso2] ? this.regionData[this.iso2].value : 0
    },
    fillOpacity() {
      return this.regionData[this.iso2] ? this.regionData[this.iso2].opacity : 0
    },
    optionsStyle() {
      const _fillColor = this.regionColours[this.regionName] || "#ffffff"
      return {
        fillColor: _fillColor,
        weight: 1,
        opacity: .5,
        color: '#bbbbbb',
        fillOpacity: this.fillOpacity
      }
    }
  },
  methods: {
    clickRegion() {
      this.filterRegion = this.iso2
    }
  },
  mounted() {
  }
}
</script>