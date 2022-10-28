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
  props: ['region-colours', 'data',
    'opacity', 'region', 'region-name',
    'geojson', 'iso2'],
  components: {
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },
    filterRegions: {
      get() {
        return this.selectedRegions
      },
      set: function(newValue) {
        this.$emit('update:selectedRegions', newValue)
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
          this.regionName,
          { permanent: false, sticky: true }
        );
      };
    },
    fillOpacity() {
      return this.opacity[this.iso2] || 0
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
      const index = this.filterRegions.indexOf(this.regionName);
      if (index > -1) {
        this.filterRegions.splice(index, 1);
      } else {
        this.filterRegions.push(this.regionName)
      }
    }
  },
  mounted() {
  }
}
</script>