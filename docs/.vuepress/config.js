module.exports = {
  locales: {
    "/": {
      "lang": "en",
      "title": "IATI Data Access",
      "description": "Methodology and flat files for IATI data"
    }
  },
  themeConfig: {
    locales: {
      "/": {
        "sidebar": [
          ["/", "Home"],
          ["/introduction/", "Introduction"],
          ["/methodology/", "Methodology"]
        ]
      }
    },
  },
  markdown: {
    plugins: [
      ['markdown-it-footnote', {}]
    ]
  }
}