<template>
  <b-row>
    <b-col
      class="mt-4 mb-2 text-muted font-italic">
      <hr />
      <i18n path="dataDashboards.dataSource" tag="p">
        <template v-slot:helpDocs>
          <a href="https://docs.countrydata.iatistandard.org/">{{ $t('helpDocs') }}</a>
        </template>
      </i18n>
    </b-col>
  </b-row>
</template>
