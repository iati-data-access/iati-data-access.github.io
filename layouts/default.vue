<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
      <b-navbar-brand :to="localePath({path: '/'})">
        <img src="/iati-logo.svg" /> <span class="d-none d-md-inline-block">Country Development Finance Data</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="(item) in $t('sidebar')"
            v-bind:key="item[0]"
            :to="localePath({path: item[0]})">{{ item[1] }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

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
    <b-container class="page-container" fluid>
      <Nuxt />
    </b-container>
  </div>
</template>
<style lang="scss">
.page-container {
  margin-top: 100px;
  word-break: break-word;
}
.navbar-brand {
  img {
    height: 2.2rem;
    min-width: 2.2rem;
    margin-right: 0.8rem;
    vertical-align: top;
  }
}
.center-logo {
  img {
    width: 300px;
  }
  text-align: center;
}
.nuxt-content table {
  @extend .table !optional;
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
}
.toc {
  border-right: 1px solid #eeeeee;
  padding: 0px 20px 20px 20px;
  ul {
    padding-left: 5px;
  }
}
.toc2, .toc3 {
  list-style-type: none;
  margin-left:  0px;
  padding-left:  0px;
  a {
    color: #000000;
  }
}
.toc2 {
  margin-left: 5px;
}
.toc3 {
  margin-left: 10px;
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
div.footnotes {
  margin-top: 60px;
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
h2:hover .icon.icon-link, h3:hover .icon.icon-link, h4:hover .icon.icon-link, h5:hover .icon.icon-link {
  opacity: 100;
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