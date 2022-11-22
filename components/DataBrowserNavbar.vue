<template>
  <div>
    <b-navbar class="navbar-secondary mb-4" variant="light" type="light" toggleable="lg">
      <b-navbar-toggle target="nav-secondary-collapse"></b-navbar-toggle>
      <b-collapse id="nav-secondary-collapse" is-nav>
        <b-navbar-nav class="align-items-start">
          <b-nav-item
            link-classes="btn btn-link"
            :to="localePath({path: '/data/'})">{{ $t('dataOverview') }}</b-nav-item>
          <b-nav-text class="ml-2 mr-3 hide-on-collapse">&sdot;</b-nav-text>
          <b-nav-text>{{ $t('dataDashboards') }}</b-nav-text>
          <b-dropdown
            v-for="(dropdown) in $t('dataSidebarDropdowns')"
            v-bind:key="dropdown.name"
            :text="dropdown.label"
            variant="link">
            <v-select
              :options="fields[dropdown.field]"
              v-model="navbar[dropdown.name]"
              style="min-width: 300px;"
              placeholder="Type or select one..."
              :dropdown-should-open="function() { return true}"
              ></v-select>
          </b-dropdown>
        </b-navbar-nav>
        <!--
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            link-classes="btn btn-link"
            :to="localePath({path: '/data/custom/'})">{{ $t('dataCustomDownload') }}</b-nav-item>
        </b-navbar-nav>
        -->
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
      color: #0056b3;
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