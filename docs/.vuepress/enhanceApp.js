import Vue from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
    Vue.use(BootstrapVue)
    Vue.component('v-select', vSelect)
}