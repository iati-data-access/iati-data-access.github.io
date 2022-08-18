<template>
  <div>
    <b-row>
      <b-col lg="3" class="toc d-none d-lg-block">
        <ul v-if="page">
          <li
            v-for="link of page.toc"
            v-if="link.depth===2"
            :key="link.id"
            :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }"
          >
            <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
          </li>
        </ul>
      </b-col>
      <b-col lg="9">
        <nuxt-content :document="page" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  async asyncData({ $content, params, app, error }) {
    const page = await $content(app.i18n.locale, 'index')
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return { page }
  },
}
</script>