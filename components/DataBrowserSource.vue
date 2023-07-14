<template>
  <b-row>
    <b-col
      class="mt-4 mb-2 text-muted font-italic">
      <hr />
      <i18n path="dataDashboards.dataSource" tag="p">
        <template v-slot:methodology>
          <nuxt-link
            :to="localePath({path:'/methodology/'})">{{ $t('aboutNav[1][1]') }}</nuxt-link>
        </template>
      </i18n>
      <i18n path="dataDashboards.dataSourceContact" tag="p">
        <template v-slot:emailContact>
          <a
            :href="`mailto:${$t('dataDashboards.emailContact')}`">{{ $t('dataDashboards.emailContact') }}</a>
        </template>
      </i18n>
    </b-col>
  </b-row>
</template>