(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{450:function(o,t,n){"use strict";n.r(t);n(14),n(37);var e={data:function(){return{zoom:1.2,center:[45,0],mapControls:{zoomControl:!1,attributionControl:!1,scrollWheelZoom:!1,dragging:!1}}},props:["region-colours","region","region-name","geojson","iso2","selected-region","region-data","currency"],components:{},computed:{options:function(){return{onEachFeature:this.onEachFeatureFunction}},filterRegion:{get:function(){return this.selectedRegion},set:function(o){this.$emit("update:selectedRegion",o)}},onEachFeatureFunction:function(){var o=this;return function(t,n){n.on("mouseover",(function(o){o.target.setStyle({fillOpacity:1})})),n.on("mouseout",(function(t){t.target.setStyle({fillOpacity:o.fillOpacity})})),n.on("click",(function(){o.clickRegion()})),n.bindTooltip("<b>".concat(o.regionName,"</b><br />").concat(o.$t("dataDashboards.amount")," (").concat(o.currency.toUpperCase(),"): ").concat(o.value),{permanent:!1,sticky:!0})}},value:function(){return this.regionData[this.iso2]?this.regionData[this.iso2].value:0},fillOpacity:function(){return this.regionData[this.iso2]?this.regionData[this.iso2].opacity:0},optionsStyle:function(){return{fillColor:this.regionColours||"#ffffff",weight:1,opacity:.5,color:"#bbbbbb",fillOpacity:this.fillOpacity}}},methods:{clickRegion:function(){this.filterRegion=this.iso2}},mounted:function(){}},r=n(38),component=Object(r.a)(e,(function(){var o=this;return(0,o._self._c)("l-geo-json",{ref:"geoJson",attrs:{geojson:o.geojson,options:o.options,"options-style":o.optionsStyle}})}),[],!1,null,null,null);t.default=component.exports}}]);