<template>
  <div>
    <b-form-group
      :label="fieldLabel">
      <b-input-group
        class="nowrap no-margin">
        <div class="w-100">
          <b-form-group>
            <v-select
              style="min-width: 200px;"
              multiple
              :options="_fieldOptions"
              v-model="_value"
              :reduce="item => item.code"
              @search="fetchOptionsDebounce">
              <!-- eslint-disable-next-line vue/no-unused-vars  -->
              <template #no-options="{ search, searching, loading }">
                {{ noMatchingOptions }}
              </template>
            </v-select>
          </b-form-group>
        </div>
        <b-input-group-append v-if="_value && _value.length > 0">
          <b-btn size="sm"
            variant="outline-secondary"
            @click="updateField(field, [])"
            v-b-tooltip.hover
            :title="$t('dataDashboards.clearField')">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </b-btn>
        </b-input-group-append>
        <b-input-group-append>
          <b-btn size="sm"
            variant="outline-secondary"
            @click="advancedSearch(field, fieldLabel, searchMembers)"
            v-b-tooltip.hover
            :title="$t('dataDashboards.advancedSearch')">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <template v-if="field == 'reporting_organisation'">
        <b-btn
          v-b-modal.reporting-organisation-group
          variant="link" size="sm">{{ $t('dataDashboards.reportingOrganisationGroup.select') }}</b-btn>
        <b-modal
          :title="$t('dataDashboards.reportingOrganisationGroup.select')"
          id="reporting-organisation-group"
          @ok="handleReportingOrganisationGroups"
          :okTitle="$t('dataDashboards.reportingOrganisationGroup.apply')"
          :okDisabled="selectedReportingOrganisationGroup==null">
          <b-form-group
            :label="$t('dataDashboards.reportingOrganisationGroup.label')">
            <v-select
              :placeholder="$t('dataDashboards.reportingOrganisationGroup.selectOne')"
              :options="reportingOrganisationGroup"
              v-model="selectedReportingOrganisationGroup">
            </v-select>
          </b-form-group>
        </b-modal>
      </template>
    </b-form-group>
  </div>
</template>
<style scoped>
div.input-group.nowrap {
  flex-wrap: nowrap;
  width: 100%;
}
.no-margin .form-group {
  margin-bottom: 0px;
}
.btn-outline-secondary {
  border-color: rgba(60,60,60,0.26);
}
</style>
<script>
import axios from 'axios'
import debounce from "lodash.debounce"
import { mapState } from 'vuex'
export default {
  props: {
    field: {
      default: null
    },
    fieldLabel: {
      default: null
    },
    fieldOptions: {
      default() {
        return []
      }
    },
    updateField: {
      default() {
        return ''
      }
    },
    value: {
      default: null
    },
    advancedSearch: {
      default: () => {}
    },
    searchMembers: {
      default: false
    }
  },
  data() {
    return {
      selectedReportingOrganisationGroup: null,
      retrievedOptions: []
    }
  },
  created() {
    this.fetchOptionsDebounce = debounce((value) => {
      this.fetchOptions(value)
    }, 500);
  },
  computed: {
    noMatchingOptions() {
      if (!(this.searchMembers)) {
        return this.$t('dataDashboards.noMatchingOptions')
      } else {
        return this.$t('dataDashboards.exactSearchTerm')
      }
    },
    _fieldOptions: {
      get() {
        if (this.searchMembers) {
          // https://vue-select.org/guide/values.html#caveats-with-reduce
          const existingResults = this.value ? this.value.map(item => {
            return {
              code: item,
              name: item.replaceAll("__SEMICOLON__", ";"),
              label: item.replaceAll("__SEMICOLON__", ";")
            }
          }) : []
          return existingResults.concat(this.retrievedOptions)
        } else {
          return this.fieldOptions
        }
      },
      set(newValue) {
        if (this.searchMembers) {
          this.retrievedOptions = newValue
        }
      }
    },
    _value: {
      get() {
        return this.value
      },
      set(newValue) {
        this.updateField(this.field, newValue)
      }
    },...mapState(['reportingOrganisationGroup'])
  },
  methods: {
    handleReportingOrganisationGroups() {
      this._value = this.selectedReportingOrganisationGroup.items
    },
    fetchOptions(search, loading) {
      if (['', null].includes(search)) {
        this._fieldOptions = []
        return
      }
      const getModel = () => {
        if (this.field.startsWith('activity')) {
          return 'iatiline'
        } else if (this.field.startsWith('provider_organisation')) {
          return 'provider_organisation'
        } else if (this.field.startsWith('receiver_organisation')) {
          return 'receiver_organisation'
        }
      }
      const model = getModel()
      const url = `${this.$config.baseURL}/babbage/cubes/${model}/members/${this.field}?order=${this.field}&cut=${this.field}~"${search}"&pagesize=1000`
      axios.get(url)
      .then(response => {
        this._fieldOptions = response.data.data.map(item => {
          return {
            code: item[this.field].replaceAll(";", "__SEMICOLON__"),
            name: item[this.field],
            label: item[this.field]
          }
        })
      })
    }
  }
}
</script>