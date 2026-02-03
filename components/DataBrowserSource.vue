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
    </b-col>
  </b-row>
</template>