<template>
  <div>
    <b-container>
      <nuxt-content :document="page" />
    </b-container>
  </div>
</template>
<script>
import {slugify} from 'transliteration'

// https://github.com/nuxt/content/issues/702
function fixIds(elements = []) {
  elements.forEach((el) => {
    if (el.props?.id) {
      el.props.id = slugify(el.props.id)
    }
    if (el.props?.href) {
      const URI = decodeURI(el.props.href);
      const httpScheme = URI.startsWith('http://');
      const httpsScheme = URI.startsWith('https://');
      const isExternalURI = httpScheme || httpsScheme;
      const href = isExternalURI ? URI : '#' + slugify(URI);
      el.props.href = href;
    }
    if (el.id) {
      el.id = slugify(el.id)
    }
    if (el.children) {
      fixIds(el.children)
    }
  })
}
export default {
  async asyncData({ $content, params, app, error }) {
    const page = await $content(app.i18n.locale, 'index')
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    if (page == undefined) { return page }
    fixIds(page.body.children)
    fixIds(page.toc)
    return { page }
  },
}
</script>