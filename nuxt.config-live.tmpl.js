import linkFixes from './plugins/link-fixes.js'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Country Development Finance Data',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'css/styles.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/local-components.js', '~/plugins/vue-select.js', {
    src: '~/plugins/leaflet.js',
    mode: 'client'
  }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/gtm'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/content',
    'nuxt-i18n',
    'nuxt-leaflet',
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    icons: {
      solid: ['faGear', 'faDownload', 'faTable', 'faChartSimple', 'faMap'],
      regular: []
    }
  },

  content: {
    // https://content.nuxtjs.org/api/configuration
  },

  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en-GB',
        file: 'en-GB.json'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr-FR.json'
      },
      {
        code: 'es',
        iso: 'es-ES',
        file: 'es-ES.json'
      },
      {
        code: 'pt',
        iso: 'pt-PT',
        file: 'pt-PT.json'
      }
    ],
    langDir: 'locales/',
    vueI18n: {
      fallbackLocale: 'en'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  publicRuntimeConfig: {
    baseURL: 'http://countrydata.brough.io/api'
  },

  // Google Tag Manager
  gtm: {
    id: 'GTM-TRBGNFQ',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
