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
      "description": "Methodology and flat files for IATI data"
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
          lastUpdated: 'Last updated:'
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
          lastUpdated: 'Dernière mise à jour :'
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
  ]
}