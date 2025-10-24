import linkFixes from './plugins/link-fixes.js'
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/docs-beta2/',
    trailingSlash: true
  }
} : {
  router: {
    trailingSlash: true
  }
}
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  trailingSlash: true,
  generate: {
    fallback: true
  },

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
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/iati-design-system@4.4.0/dist/css/iati.min.css'
      }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/iati-design-system@4.4.0/dist/js/iati.js',
        defer: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'css/styles.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/local-components.js', '~/plugins/vue-select.js',
    {
      src: '~/plugins/leaflet.js',
      mode: 'client'
    },
    {
      src: '~plugins/vuedraggable.js'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/gtm',
    'vue-plausible',
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
      solid: ['faGear', 'faDownload', 'faTable',
        'faChartSimple', 'faMap', 'faWandMagicSparkles',
        'faMagnifyingGlass', 'faXmark', 'faBarsStaggered',
        'faArrowsRotate'],
      regular: []
    }
  },

  hooks: {
    'content:file:beforeInsert': linkFixes,
    // Fix anchors issue
    // https://github.com/nuxt/content/issues/376#issuecomment-702193217
    'vue-renderer:ssr:templateParams': function (params) {
      params.HEAD = params.HEAD.replace('<base href="/docs-beta2/">', "");
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
        file: 'en.json'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.json'
      },
      {
        code: 'es',
        iso: 'es-ES',
        file: 'es.json'
      },
      {
        code: 'pt',
        iso: 'pt-PT',
        file: 'pt.json'
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
    baseURL: 'https://data.countrydata.iatistandard.org/api'
  },

  // Google Tag Manager
  gtm: {
    id: 'GTM-TRBGNFQ',
  },

  // Plausible
  plausible: {
    domain: 'countrydata.iatistandard.org',
    enableAutoOutboundTracking: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  ...routerBase
}
