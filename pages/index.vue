<template>
  <div>
    <nuxt-content :document="page" />
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