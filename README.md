# IATI Country Development Finance Data front-end

This repository provides a front-end interface to access the files for the IATI Country Development Finance Data tool. It is visible at:
https://countrydata.iatistandard.org/

It also communicates with a back-end API for visualising data in a new data browser: https://countrydata.iatistandard.org/

The data behind this repository is generated in the following repositories for each language:

  * English: https://github.com/iati-data-access/data-en
  * French: https://github.com/iati-data-access/data-fr
  * Spanish: https://github.com/iati-data-access/data-es
  * Portuguese: https://github.com/iati-data-access/data-pt


## Build Setup

```bash
# clone repository
$ git clone git@github.com:iati-data-access/iati-data-access.github.io.git
$ cd iati-data-access.github.io

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the NuxtJS [documentation](https://nuxtjs.org).

When pushing to the repository [only the main branch, eventually], Github Actions automatically builds and deploys the front end.
