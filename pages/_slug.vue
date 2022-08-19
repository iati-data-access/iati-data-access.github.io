<template>
  <div>
    <div v-for="page in pages" :key="page.title">
      <b-row>
        <b-col lg="3" class="toc d-none d-lg-block">
          <b>{{ page.title }}</b>
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
    const slug = params.slug || "index"
    const pages = await $content(app.i18n.locale, slug)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    pages.forEach(page => {
      fixIds(page.body.children)
      fixIds(page.toc)
    })
    return { pages }
  }
}
</script>