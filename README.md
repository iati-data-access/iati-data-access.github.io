# IATI Country Development Finance Data front-end

This repository contains the files for the front-end of IATI Country Development Finance Data. It is visible at:
https://countrydata.iatistandard.org/

The data behind this repository is generated in the following repository:
https://github.com/iati-data-access/data-beta

The data is then saved into repositories for each language, e.g.

  * English: https://github.com/iati-data-access/data-en
  * French: https://github.com/iati-data-access/data-fr

## Installation

This site is developed in [VuePress](https://vuepress.vuejs.org/). It is very simple to manage and install.

```bash
git clone git@github.com:iati-data-access/iati-data-access.github.io.git
cd iati-data-access.github.io
npm install
```

Run a development server:

```bash
npm run docs:dev
```

Build for production:

```bash
npm run docs:build
```

Deploy to Github Pages:

```bash
npm run deploy
```
