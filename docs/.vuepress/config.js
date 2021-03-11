module.exports = {
  locales: {
    "/": {
      "lang": "en",
      "title": "Country Development Finance Data",
      "description": "Methodology and flat files for IATI data"
    }
  },
  themeConfig: {
    locales: {
      "/": {
        "sidebar": [
          ["/", "Home"],
          ["/introduction/", "Introduction"],
          ["/methodology/", "Methodology"],
          ["/data-notes/", "Data Notes"]
        ]
      }
    },
  },
  plugins: [
    ['@vuepress/google-analytics',
    {
      'ga': '264547372'
    }
    ]
  ],
  markdown: {
    plugins: [
      ['markdown-it-footnote', {}]
    ]
  }
}