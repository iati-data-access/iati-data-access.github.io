<template>
  <div>
    <b-navbar class="navbar-secondary mb-4" variant="light" type="light" toggleable="lg">
      <b-navbar-toggle target="nav-secondary-collapse"></b-navbar-toggle>
      <b-collapse id="nav-secondary-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            class="m-1"
            link-classes="btn btn-link btn-outline-primary"
            exact-active-class="btn-primary"
            :to="localePath('/data/')">{{ $t('dataDashboards.overview') }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="align-items-start">
          <b-nav-text class="ml-4 mr-2">{{ $t('dataDashboards.dashboards') }}</b-nav-text>
          <b-dropdown
            split
            :split-to="localePath({path: dropdown.path})"
            v-for="(dropdown) in $t('dataSidebarDropdowns')"
            v-bind:key="dropdown.name"
            :text="dropdown.label"
            :variant="$route.path.includes(localePath({path: dropdown.path})) ? 'primary' : 'outline-primary'"
            exact-active-class="btn-primary"
            class="m-1">
            <v-select
              :options="fields[dropdown.field]"
              v-model="navbar[dropdown.name]"
              style="min-width: 300px;"
              placeholder="Type or select one..."
              :dropdown-should-open="function() { return true}"
              ></v-select>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style lang="scss">
.navbar-secondary {
  background-color: #eee !important;
  .btn-link {
    color: #155366 !important;
    &:hover, &:focus, &:active {
      color: #ffffff;
    }
  }
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
}
.collapse.show .hide-on-collapse {
  display: none;
}
</style>
<script>

import { mapState } from 'vuex'
export default {
  components: {  },
  data() {
    return {
      navbar: {
        'data-recipient-country-or-region': null,
        'data-reporting-organisation': null,
        'data-sector-category': null
      }
    }
  },
  computed: {
    ...mapState(['fields'])
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  },
  watch: {
    navbar: {
      handler(value) {
        Object.entries(value).forEach(item => {
          if (item[1] != null) {
            this.$router.push(this.localePath({
              name: `${item[0]}-code`, params: { code: item[1].code }
            }))
          }
        })
      },
      deep: true
    }
  }
}
</script>