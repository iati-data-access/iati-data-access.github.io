<template>
  <div>
    <header class="header" role="header">
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand :to="localePath({path: '/'})" class="branding">
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>

            <b-nav-item
              :to="localePath({path: '/'})">{{ $t('home') }}</b-nav-item>

            <b-nav-item
              :to="localePath({path: '/data/'})">{{ $t('dataDashboards.label') }} <font-awesome-icon :icon="['fa', 'chart-simple']" /></b-nav-item>
            <b-nav-item
              :to="localePath({path: '/data/custom/'})"
              active-class="nuxt-link-exact-active">{{ $t('dataDashboards.customDownload') }} <font-awesome-icon :icon="['fa', 'wand-magic-sparkles']"/></b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-lg-auto">
            <b-nav-item-dropdown :text="$t('about')" right>
              <b-dropdown-item
                v-for="item in $t('aboutNav')"
                v-bind:key="item[0]"
                :to="localePath({path: item[0]})">
                {{ item[1] }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown :text="$t('selectText')" right>
              <b-dropdown-item
                v-for="locale in $t('languageOptions')"
                v-bind:key="locale.value"
                :to="switchLocalePath(locale.value)"
                :active="$i18n.locale == locale.value">
                {{ locale.text }}
              </b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-container class="main-title">
        <h2>Country Development Finance Data</h2>
      </b-container>
    </header>
    <b-container class="page-container pr-md-5 pl-md-5 pb-md-5" fluid>
      <Nuxt />
    </b-container>
  </div>
</template>
<style lang="scss">
.btn-outline-primary {
  color: #155366 !important;
  border-color: #155366;
  &:hover, &:focus, &:active {
    color: #ffffff !important;
    border-color: #06DBE4 !important;
    background-color: #06DBE4 !important;
  }
}
.btn-primary {
  color: #ffffff !important;
  background-color: #155366;
  border-color: #155366;
  &:hover, &:focus, &:active {
    background-color: #06DBE4 !important;
    border-color: #06DBE4 !important;
  }
}
.navbar-light .navbar-nav .nav-link {
  color: #000000;
  &:hover {
    color: #06DBE4;
  }
}

.page-container {
  word-break: break-word;
}
.center-logo {
  img {
    width: 300px;
  }
  text-align: center;
}
.nuxt-content table {
  word-break: normal;
}
.nuxt-content {
  padding-left: 20px;
  padding-right: 20px;
  ul, ol {
    padding-left: 20px;
  }
  li {
    padding-left: 5px;
  }
  span.icon.icon-link {
    opacity: 0;
    font-size: .85em;
    float: left;
    margin-left: -0.87em;
    padding-right: 0.23em;
    margin-top: 0.125em;
  }
  span.icon.icon-link::before {
    content: "#";
  }
  h2 {
    margin-top: -3.1rem;
    padding-top: 4.6rem;
  }
  h3 {
    margin-top: -3.1rem;
    padding-top: 4.1rem;
  }
  h4 {
    margin-top: -3.1rem;
    padding-top: 3.6rem;
  }
  h2:hover .icon.icon-link, h3:hover .icon.icon-link, h4:hover .icon.icon-link, h5:hover .icon.icon-link {
    opacity: 100;
  }
}
.toc {
  padding: 0px 20px 20px 20px;
  ul {
    padding-left: 0px;
  }
}
.navigation-secondary__item {
  list-style-type: none;
}
div.footnotes {
  margin-top: 60px;
}
</style>
<script>
export default {
  async asyncData({ $content, params, app }) {
    const page = await $content(app.i18n.locale, params.slug)
      .fetch()
    return {
      page
    }
  }
}
</script>