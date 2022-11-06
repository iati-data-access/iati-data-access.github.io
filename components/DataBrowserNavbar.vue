<template>
  <div>
    <b-navbar class="navbar-secondary mb-4" variant="secondary" toggleable="lg">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="(item) in $t('dataSidebarOverview')"
            v-bind:key="item[0]"
            :to="localePath({path: item[0]})">{{ item[1] }}</b-nav-item>
          <b-dropdown
            v-for="(dropdown) in $t('dataSidebarDropdowns')"
            v-bind:key="dropdown.name"
            :text="dropdown.label">
            <div class="scrollable-menu">
              <b-dropdown-item :to="localePath({name: dropdown.name})" exact-active-class="active">
                {{ dropdown.all }}
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item :to="localePath({name: `${dropdown.name}-code`, params: { code: item.code }})" v-for="item in fields[dropdown.field]" :key="item.code" active-class="active">
                {{ item.label }}
              </b-dropdown-item>
            </div>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>

import { mapState } from 'vuex'
export default {
  components: {  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['fields'])
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  }
}
</script>