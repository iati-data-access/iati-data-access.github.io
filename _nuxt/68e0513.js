(window.webpackJsonp=window.webpackJsonp||[]).push([[28,14,15],{440:function(t,r,e){var content=e(443);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(59).default)("4e880e8e",content,!0,{sourceMap:!1})},441:function(t,r,e){"use strict";e.r(r);e(20),e(51),e(70),e(5),e(4),e(2),e(6),e(7);var n=e(0),o=(e(1),e(3),e(102),e(69));function c(object,t){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),r.push.apply(r,e)}return r}var l={components:{},data:function(){return{navbar:{"data-recipient-country-or-region":null,"data-reporting-organisation":null,"data-sector-category":null}}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(r){Object(n.a)(t,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(source,r))}))}return t}({},Object(o.b)(["fields"])),mounted:function(){this.$store.dispatch("getCodelists")},watch:{navbar:{handler:function(t){var r=this;Object.entries(t).forEach((function(t){null!=t[1]&&r.$router.push(r.localePath({name:"".concat(t[0],"-code"),params:{code:t[1].code}}))}))},deep:!0}}},d=l,y=(e(442),e(38)),component=Object(y.a)(d,(function(){var t=this,r=t._self._c;return r("div",[r("b-navbar",{staticClass:"navbar-secondary mb-4",attrs:{variant:"light",type:"light",toggleable:"lg"}},[r("b-navbar-toggle",{attrs:{target:"nav-secondary-collapse"}}),t._v(" "),r("b-collapse",{attrs:{id:"nav-secondary-collapse","is-nav":""}},[r("b-navbar-nav",[r("b-nav-item",{staticClass:"m-1",attrs:{"link-classes":"btn btn-link btn-outline-primary","exact-active-class":"btn-primary",to:t.localePath("/data/")}},[t._v(t._s(t.$t("dataDashboards.overview")))])],1),t._v(" "),r("b-navbar-nav",[r("b-nav-text",{staticClass:"ml-4 mr-2"},[t._v(t._s(t.$t("dataDashboards.dashboards")))]),t._v(" "),t._l(t.$t("dataSidebarDropdowns"),(function(e){return r("b-dropdown",{key:e.name,staticClass:"m-1",attrs:{right:"",split:"","split-to":t.localePath({path:e.path}),text:e.label,variant:t.$route.path.includes(t.localePath({path:e.path}))?"primary":"outline-primary","exact-active-class":"btn-primary"}},[r("v-select",{staticStyle:{"min-width":"300px"},attrs:{options:t.fields[e.field],placeholder:"Type or select one...","dropdown-should-open":function(){return!0}},model:{value:t.navbar[e.name],callback:function(r){t.$set(t.navbar,e.name,r)},expression:"navbar[dropdown.name]"}})],1)}))],2)],1)],1)],1)}),[],!1,null,null,null);r.default=component.exports},442:function(t,r,e){"use strict";e(440)},443:function(t,r,e){var n=e(58)(!1);n.push([t.i,".navbar-secondary{background-color:#eee!important}.navbar-secondary .btn-link{color:#155366!important}.navbar-secondary .btn-link:active,.navbar-secondary .btn-link:focus,.navbar-secondary .btn-link:hover{color:#fff}.navbar-secondary .btn-outline-primary{color:#155366!important;border-color:#155366}.navbar-secondary .btn-outline-primary:active,.navbar-secondary .btn-outline-primary:focus,.navbar-secondary .btn-outline-primary:hover{color:#fff!important;border-color:#06dbe4!important;background-color:#06dbe4!important}.navbar-secondary .btn-primary{color:#fff!important;background-color:#155366;border-color:#155366}.navbar-secondary .btn-primary:active,.navbar-secondary .btn-primary:focus,.navbar-secondary .btn-primary:hover{background-color:#06dbe4!important;border-color:#06dbe4!important}.navbar-secondary .navbar-nav .dropdown-menu{position:absolute;background:none;border:none;padding:0}.collapse.show .hide-on-collapse{display:none}",""]),t.exports=n},444:function(t,r,e){"use strict";e.r(r);var n=e(38),component=Object(n.a)({},(function(){var t=this,r=t._self._c;return r("b-row",[r("b-col",{staticClass:"mt-4 mb-2 text-muted font-italic"},[r("hr"),t._v(" "),r("i18n",{attrs:{path:"dataDashboards.dataSource",tag:"p"},scopedSlots:t._u([{key:"methodology",fn:function(){return[r("nuxt-link",{attrs:{to:t.localePath({path:"/methodology/"})}},[t._v(t._s(t.$t("aboutNav[1][1]")))])]},proxy:!0}])}),t._v(" "),r("i18n",{attrs:{path:"dataDashboards.dataSourceContact",tag:"p"},scopedSlots:t._u([{key:"emailContact",fn:function(){return[r("a",{attrs:{href:"mailto:".concat(t.$t("dataDashboards.emailContact"))}},[t._v(t._s(t.$t("dataDashboards.emailContact")))])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);r.default=component.exports},500:function(t,r,e){"use strict";e.r(r);e(5),e(4),e(6),e(3),e(7);var n=e(0),o=(e(54),e(40),e(16),e(2),e(1),e(14),e(69)),c=e(447),l=e(453);e(441);function d(object,t){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),r.push.apply(r,e)}return r}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(r){Object(n.a)(t,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(source,r))}))}return t}var v={name:"DataReportingOrganisationCode",components:{DataBrowser:c.default,DataBrowserFilter:l.default},data:function(){var t=(new Date).getFullYear()-1;return{drilldown:"reporting_organisation",drilldownValue:this.$route.params.code,setFields:{reporting_organisation:[this.$route.params.code],aid_type:[],finance_type:[],flow_type:[],transaction_type:["3","4","budget"],sector_category:[],sector:[],recipient_country_or_region:[],year:[t],calendar_year_and_quarter:[]},currency:"usd"}},computed:y({summarySetFields:function(){return y(y({},this.setFields),{year:this.calendarYears,calendar_year_and_quarter:[],transaction_type:["3","4","budget"]})},organisationsSetFields:function(){return y(y({},this.setFields),{transaction_type:["1","3"]})},calendarYears:function(){var t=(new Date).getFullYear();return function(t,r){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Array.from({length:(r-t)/e+1},(function(r,i){return t+i*e}))}(t-3,t+3).map((function(t){return"".concat(t)}))},drilldownLabel:function(){var t=this;return 0==this.fields[this.drilldown].length?"":this.fields[this.drilldown].filter((function(r){return r.code===t.drilldownValue}))[0].label}},Object(o.b)(["fields"])),mounted:function(){this.$store.dispatch("getCodelists")},head:function(){return{title:"".concat(this.drilldownLabel," - ").concat(this.$t("dataDashboards.providers.by")," - ").concat(this.$t("dataDashboards.label")," - ").concat(this.$t("title")),meta:[{hid:"description",name:"description",content:this.$t("description")}],htmlAttrs:{lang:this.$i18n.locale}}},watch:{"$i18n.locale":function(){this.$store.dispatch("getCodelists")}}},_=v,h=e(38),component=Object(h.a)(_,(function(){var t=this,r=t._self._c;return r("div",[r("DataBrowserNavbar"),t._v(" "),r("h1",[r("span",{staticClass:"text-muted"},[t._v(t._s(t.$t("dataDashboards.providers.for")))]),t._v(" "),r("b",[t._v(t._s(t.drilldownLabel))])]),t._v(" "),r("hr"),t._v(" "),r("b-row",[r("b-col",{staticClass:"mt-2"},[r("DataBrowserFilter",{attrs:{"exclude-filters":["reporting_organisation","reporting_organisation_type","transaction_type"],setFields:t.setFields,currency:t.currency,pageName:"data-reporting-organisation-code"},on:{"update:setFields":function(r){t.setFields=r},"update:set-fields":function(r){t.setFields=r},"update:currency":function(r){t.currency=r}}})],1)],1),t._v(" "),r("b-row",[r("b-col",[r("h2",[t._v(t._s(t.$t("dataDashboards.summary")))]),t._v(" "),r("DataBrowser",{attrs:{drilldowns:["year.year"],setFields:t.summarySetFields,currency:t.currency,"bar-chart-height":"300px","show-number-results":!1,pageSize:null,orderBy:"year.year"},on:{"update:currency":function(r){t.currency=r}}}),t._v(" "),r("p",{staticClass:"text-muted font-italic"},[t._v(t._s(t.$t("dataDashboards.spendSummaryChartText")))])],1)],1),t._v(" "),r("b-row",[r("b-col",[r("hr")])],1),t._v(" "),r("b-row",[r("b-col",{staticClass:"mt-2"},[r("h2",[t._v(t._s(t.$t("dataDashboards.exploreTheData")))])])],1),t._v(" "),r("b-row",[r("b-col",{staticClass:"mt-2",attrs:{md:"6"}},[r("h3",[t._v(t._s(t.$t("by"))+" "+t._s(t.$tc("dataDashboards.availableDrilldowns.recipient_country_or_region")))]),t._v(" "),r("DataBrowser",{attrs:{drilldowns:["recipient_country_or_region"],displayAs:"map",setFields:t.setFields,currency:t.currency,pageSize:null},on:{"update:currency":function(r){t.currency=r}}})],1),t._v(" "),r("b-col",{staticClass:"mt-2",attrs:{md:"6"}},[r("h3",[t._v(t._s(t.$t("by"))+" "+t._s(t.$tc("dataDashboards.availableDrilldowns.sector_category")))]),t._v(" "),r("DataBrowser",{attrs:{drilldowns:["sector_category"],setFields:t.setFields,currency:t.currency},on:{"update:currency":function(r){t.currency=r}}})],1)],1),t._v(" "),r("b-row",[r("b-col",[r("hr")])],1),t._v(" "),r("b-row",[r("b-col",{staticClass:"mt-2",attrs:{md:"6"}},[r("h3",[t._v(t._s(t.$t("by"))+" "+t._s(t.$tc("dataDashboards.availableDrilldowns.finance_type")))]),t._v(" "),r("DataBrowser",{attrs:{drilldowns:["finance_type"],setFields:t.setFields,currency:t.currency},on:{"update:currency":function(r){t.currency=r}}})],1),t._v(" "),r("b-col",{staticClass:"mt-2",attrs:{md:"6"}},[r("h3",[t._v(t._s(t.$t("by"))+" "+t._s(t.$tc("dataDashboards.availableDrilldowns.aid_type")))]),t._v(" "),r("DataBrowser",{attrs:{drilldowns:["aid_type"],setFields:t.setFields,currency:t.currency},on:{"update:currency":function(r){t.currency=r}}})],1)],1),t._v(" "),r("b-row",[r("b-col",[r("hr")])],1),t._v(" "),r("b-row",[r("b-col",{staticClass:"mt-2",attrs:{md:"6"}},[r("h3",[t._v(t._s(t.$t("by"))+" "+t._s(t.$tc("dataDashboards.availableDrilldowns.reporting_organisation_type")))]),t._v(" "),r("DataBrowser",{attrs:{drilldowns:["reporting_organisation_type"],setFields:t.setFields,currency:t.currency},on:{"update:currency":function(r){t.currency=r}}})],1),t._v(" "),r("b-col",{staticClass:"mt-2",attrs:{md:"6"}},[r("h3",[t._v(t._s(t.$t("by"))+" "+t._s(t.$tc("dataDashboards.availableDrilldowns.humanitarian")))]),t._v(" "),r("DataBrowser",{attrs:{drilldowns:["humanitarian"],setFields:t.setFields,currency:t.currency},on:{"update:currency":function(r){t.currency=r}}})],1)],1),t._v(" "),r("b-row",[r("b-col",[r("hr")])],1),t._v(" "),r("b-row",[r("b-col",{staticClass:"mt-2",attrs:{md:"12"}},[r("h3",[t._v(t._s(t.$t("by"))+" "+t._s(t.$t("dataDashboards.activity")))]),t._v(" "),r("DataBrowser",{attrs:{drilldowns:["activity.iati_identifier","activity.title","reporting_organisation"],displayAs:"table",setFields:t.setFields,currency:t.currency},on:{"update:currency":function(r){t.currency=r}}})],1)],1),t._v(" "),r("b-row",[r("b-col",[r("hr")])],1),t._v(" "),r("b-row",[r("b-col",{staticClass:"mt-2",attrs:{md:"12"}},[r("h3",[t._v(t._s(t.$t("by"))+" "+t._s(t.$t("dataDashboards.organisations")))]),t._v(" "),r("DataBrowser",{attrs:{drilldowns:["provider_organisation","receiver_organisation","transaction_type.code"],displayAs:"sankey",setFields:t.organisationsSetFields,currency:t.currency},on:{"update:currency":function(r){t.currency=r}}})],1)],1),t._v(" "),r("DataBrowserSource")],1)}),[],!1,null,null,null);r.default=component.exports;installComponents(component,{DataBrowserNavbar:e(441).default,DataBrowserFilter:e(453).default,DataBrowser:e(447).default,DataBrowserSource:e(444).default})}}]);