<template>
  <div>
    <div v-for="page in pages" :key="page.title">
      <b-row>
        <b-col lg="3" class="toc d-none d-lg-block">
          <div class="aside-m__header fill-sunrise">
            <div class="aside-m__heading">{{ page.title }}</div>
          </div>
          <nav class="navigation-secondary" id="navigation-secondary">
            <ul v-if="page" class="navigation-secondary__list">
              <li
                v-for="link of page.toc"
                v-if="link.depth===2"
                :key="link.id"
                class="navigation-secondary__item">
                <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </b-col>
        <b-col lg="9">
          <nuxt-content :document="page" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $content, params, app, error }) {
    const slug = params.slug || "index"
    const pages = await $content(app.i18n.locale, slug)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return { pages }
  },
  computed: {
    pageTitle() {
      return this.pages.map(page => { return page.title }).join()
    }
  },
  head() {
    return {
      title: `${this.pageTitle} - ${this.$t('title')}`,
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