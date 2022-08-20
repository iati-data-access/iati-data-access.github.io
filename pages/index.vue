<template>
  <div>
    <b-container>
      <nuxt-content :document="page" />
    </b-container>
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
    if (page == undefined) { return page }
    return { page }
  },
  head() {
    return {
      title: this.$t('title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('description')
        }
      ],
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  }
}
</script>