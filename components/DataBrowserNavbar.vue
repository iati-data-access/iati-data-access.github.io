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
            :to="localePath('/data/')">{{ $t('dataOverview') }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="align-items-start">
          <b-nav-text class="ml-4 mr-2">{{ $t('dataDashboards') }}</b-nav-text>
          <b-dropdown
            split
            :split-to="localePath({path: dropdown.path})"
            v-for="(dropdown) in $t('dataSidebarDropdowns')"
            v-bind:key="dropdown.name"
            :text="dropdown.label"
            variant="outline-primary"
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
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            class="m-1"
            link-classes="btn btn-link btn-outline-primary"
            exact-active-class="btn-primary"
            :to="localePath('/data/custom/')">{{ $t('dataCustomDownload') }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style lang="scss">
.navbar-secondary {
  background-color: #eee !important;
  .nav-item .btn-link {
    color: #007bff;
    &:hover, &:focus {
      color: #ffffff;
    }
  }
  .nav-item .btn-link.btn-primary {
    color: #ffffff;
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
        'data-countries': null,
        'data-providers': null,
        'data-sectors': null
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
          console.log('item is', item)
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