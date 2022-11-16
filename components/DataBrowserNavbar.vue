<template>
  <div>
    <b-navbar class="navbar-secondary mb-4" variant="light" type="light" toggleable="lg">
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
            :text="dropdown.label"
            variant="link">
            <div class="scrollable-menu">
              <v-select
                :options="fields[dropdown.field]"
                v-model="navbar[dropdown.name]"
                style="min-width: 300px;"
                placeholder="Type or select one..."
                :dropdown-should-open="function() { return true}"
                ></v-select>
            </div>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style>
.navbar-secondary {
  background-color: #eee !important;
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