module.exports = {
  base: '/docs-beta/',
  locales: {
    "/": {
      "lang": "en",
      "title": "Country Development Finance Data",
      "description": "Methodology and flat files for IATI data"
    },
    "/fr/": {
      "lang": "fr",
      "title": "Données nationales de l’IITA relatives au financement du développement",
      "description": "Methodology and flat files for IATI data"
    }
  },
  themeConfig: {
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
        }
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
        }
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