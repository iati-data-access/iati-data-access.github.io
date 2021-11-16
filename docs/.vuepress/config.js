const base = process.env.DEPLOY_ENV === 'WITH_SUBFOLDER' ? {
    base: '/docs-beta/'
} : {}

module.exports = {
  locales: {
    "/": {
      "lang": "en",
      "title": "Country Development Finance Data",
      "description": "Methodology and flat files for IATI data"
    },
    "/fr/": {
      "lang": "fr",
      "title": "Country Development Finance Data",
      "description": "Données nationales de l’IITA relatives au financement du développement"
    },
    "/es/": {
      "lang": "es",
      "title": "Country Development Finance Data",
      "description": "Datos de la IATI sobre la financiación para el desarrollo de los países"
    }
  },
  themeConfig: {
    logo: '/iati-logo.svg',
    locales: {
      "/": {
        language: 'en',
        // text for the language dropdown
        selectText: 'Languages',
        // label for this locale in the language dropdown
        label: 'English',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Languages',
        "sidebar": [
          ["/", "Home"],
          ["/introduction/", "Introduction"],
          ["/methodology/", "Methodology"],
          ["/data-notes/", "Data Notes"]
        ],
        translations: {
          selectCountry: 'Select a country',
          downloadFile: 'Download file',
          lastUpdated: 'Last updated:',
          language: 'Language'
        },
        countriesCurrenciesFields: [
          {
            key: 'countryCode',
            label: 'Country Code'
          },
          {
            key: 'countryName',
            label: 'Country Name'
          },
          {
            key: 'currency',
            label: 'Currency'
          }
        ],
        languageOptions: [
          {'value': 'en', 'text': 'English'},
          {'value': 'fr', 'text': 'French'},
          {'value': 'es', 'text': 'Spanish'}
        ]
      },
      "/fr/": {
        language: 'fr',
        // text for the language dropdown
        selectText: 'Langues',
        // label for this locale in the language dropdown
        label: 'Français',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Langues',
        "sidebar": [
          ["/fr/", "Accueil"],
          ["/fr/introduction/", "Introduction"],
          ["/fr/methodology/", "Méthodologie"],
          ["/fr/data-notes/", "Notes sur les données"]
        ],
        translations: {
          selectCountry: 'Choisir un pays',
          downloadFile: 'Télécharger le fichier',
          lastUpdated: 'Dernière mise à jour :',
          language: 'Langue'
        },
        countriesCurrenciesFields: [
          {
            key: 'countryCode',
            label: 'Code du pays'
          },
          {
            key: 'countryName',
            label: 'Nom du pays'
          },
          {
            key: 'currency',
            label: 'Devise'
          }
        ],
        languageOptions: [
          {'value': 'en', 'text': 'anglais'},
          {'value': 'fr', 'text': 'français'},
          {'value': 'es', 'text': 'espagnol'}
        ]
      },
      "/es/": {
        language: 'es',
        // text for the language dropdown
        selectText: 'Idiomas',
        // label for this locale in the language dropdown
        label: 'Español',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Idiomas',
        "sidebar": [
          ["/es/", "Página de portada"],
          ["/es/introduction/", "Antecedentes"],
          ["/es/methodology/", "Metodología"],
          ["/es/data-notes/", "Notas sobre datos"]
        ],
        translations: {
          selectCountry: 'Seleccionar un país',
          downloadFile: 'Descargar archivo',
          lastUpdated: 'Última actualización:',
          language: 'Idioma'
        },
        countriesCurrenciesFields: [
          {
            key: 'countryCode',
            label: 'Código del país'
          },
          {
            key: 'countryName',
            label: 'Nombre del país'
          },
          {
            key: 'currency',
            label: 'Moneda'
          }
        ],
        languageOptions: [
          {'value': 'en', 'text': 'inglés'},
          {'value': 'fr', 'text': 'francés'},
          {'value': 'es', 'text': 'español'}
        ]
      },
      "/pt/": {
        language: 'pt',
        // text for the language dropdown
        selectText: 'Idiomas',
        // label for this locale in the language dropdown
        label: 'Português',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Idiomas',
        "sidebar": [
          ["/pt/", "Página inicial"],
          ["/pt/introduction/", "Contexto"],
          ["/pt/methodology/", "Metodologia"],
          ["/pt/data-notes/", "Notas sobre dados"]
        ],
        translations: {
          selectCountry: 'Selecione um país',
          downloadFile: 'Descarregar arquivo',
          lastUpdated: 'Última atualização:',
          language: 'Idioma'
        },
        countriesCurrenciesFields: [
          {
            key: 'countryCode',
            label: 'Código do país'
          },
          {
            key: 'countryName',
            label: 'Nome do país'
          },
          {
            key: 'currency',
            label: 'Moeda'
          }
        ],
        languageOptions: [
          {'value': 'en', 'text': 'inglês'},
          {'value': 'fr', 'text': 'francês'},
          {'value': 'es', 'text': 'espanhol'},
          {'value': 'pt', 'text': 'português'}
        ]
      }
    },
  },
  markdown: {
    plugins: [
      ['markdown-it-footnote', {}]
    ]
  },
  head: [
     ['script', {}, `
     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
         j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
         'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
     })(window,document,'script','dataLayer','GTM-TRBGNFQ');
     `],
  ],...base
}