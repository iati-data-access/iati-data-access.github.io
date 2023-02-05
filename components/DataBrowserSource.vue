<template>
  <b-row>
    <b-col
      class="mt-4 mb-2 text-muted font-italic">
      <hr />
      <i18n path="dataDashboards.dataSource" tag="p">
        <nuxt-link
          place="methodology"
          :to="localePath({path:'/methodology/'})">{{ $t('aboutNav[1][1]') }}</nuxt-link>
      </i18n>
      <i18n path="dataDashboards.dataSourceContact" tag="p">
        <a
          place="emailContact"
          :href="`mailto:${$t('dataDashboards.emailContact')}`">{{ $t('dataDashboards.emailContact') }}</a>
      </i18n>
    </b-col>
  </b-row>
</template>