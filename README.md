# IATI Data Access front-end

This repository contains the files for the front-end of IATI Data Access. It is visible at:
https://iati-data-access.github.io/

The data behind this repository is generated in the following repository:
https://github.com/iati-data-access/data

## Installation

This site is developed in [VuePress](https://vuepress.vuejs.org/). It is very simple to manage and install.

```bash
git clone git@github.com:iati-data-access/iati-data-access.github.io.git
cd iati-data-access.github.io
npm i
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
