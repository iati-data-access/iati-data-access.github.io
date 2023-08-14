<template>
  <b-modal
    :title="field ? `${$t('dataDashboards.advancedSearch')} - ${fieldLabel}`: null"
    id="advanced-search"
    ok-only
    size="xl">
    <b-row v-if="items" class="mb-3">
      <b-col class="my-1" lg="6">
        <b-form-group
          label="Filter"
          :label-cols-sm="false"
          label-cols-md="3"
          label-cols-lg="2"
          label-align-lg="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              :placeholder="$t('dataDashboards.advancedSearchFilter')"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col class="my-1"
        lg="6"
        v-if="totalRows > perPage">
        <b-form-group
          label="Page"
          :label-cols-sm="false"
          label-cols-md="3"
          label-cols-lg="2"
          label-align-lg="right"
          label-size="sm"
          class="mb-0"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      :items="items"
      :fields="tableFields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered">
      <template v-slot:cell(select)="data">
        <b-form-checkbox
          v-model="values" :value="data.item.code"
            name="advanced-checkboxes"></b-form-checkbox>
      </template>
    </b-table>
    <b-form-group
      label="Page"
      label-cols-sm="1"
      label-align-lg="right"
      label-size="sm"
      class="mb-0"
      v-if="totalRows > perPage">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-form-group>
  </b-modal>
</template>
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
    searchMembers: {
      default: false,
    },
    setFields: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      items: [],
      perPage: 20,
      currentPage: 1,
      totalRows: 0,
      filter: null
    }
  },
  created() {
    this.fetchOptionsDebounce = debounce((value) => {
      this.fetchOptions(value)
    }, 500);
  },
  computed: {
    _setFields: {
      get() {
        return this.setFields
      },
      set(value) {
        this.$emit('update:setFields', value)
      }
    },
    values: {
      get() {
        return this._setFields[this.field]
      },
      set(value) {
        if (!Array.isArray(value)) {
          this.$set(this._setFields, this.field, [value])
        } else {
          this.$set(this._setFields, this.field, value)
        }
      }
    },
    tableFields() {
      if (this.items.filter(item => {
        return item.description
      }).length > 0) {
        return [
          {
            key: 'code',
            label: this.$t('dataDashboards.advancedSearchFields.code'),
            sortable: true
          },
          {
            key: 'name',
            label: this.$t('dataDashboards.advancedSearchFields.name'),
            sortable: true
          },
          {
            key: 'description',
            label: this.$t('dataDashboards.advancedSearchFields.description'),
            sortable: true
          },
          {
            key: 'select',
            label: this.$t('dataDashboards.advancedSearchFields.select')
          }]
      } else if ((this.field) && ((this.field.startsWith('provider_organisation')) ||
              (this.field.startsWith('receiver_organisation')) ||
              (this.field.startsWith('activity')))) {
        return [
          {
            key: 'name',
            label: this.$t('dataDashboards.advancedSearchFields.name'),
            sortable: true
          },
          {
            key: 'select',
            label: this.$t('dataDashboards.advancedSearchFields.select')
          }]
      } else {
        return [
          {
            key: 'code',
            label: this.$t('dataDashboards.advancedSearchFields.code'),
            sortable: true
          },
          {
            key: 'name',
            label: this.$t('dataDashboards.advancedSearchFields.name'),
            sortable: true
          },
          {
            key: 'select',
            label: this.$t('dataDashboards.advancedSearchFields.select')
          }]
      }
    },...mapState(['fields'])
  },
  components: {
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    async fetchOptions(search) {
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
        this.items = response.data.data.map(item => {
          return {
            code: item[this.field].replaceAll(";", "__SEMICOLON__"),
            name: item[this.field],
            label: item[this.field]
          }
        })
        this.totalRows = this.items.length
      })
    }
  },
  watch: {
    filter(value) {
      if (this.searchMembers) {
        this.fetchOptionsDebounce(value)
        this.currentPage = 1
      }
    },
    field(value) {
      this.items = this.fields[value] ? this.fields[value] : []
      this.totalRows = this.items.length
      this.currentPage = 1
      this.filter = null
    }
  },
  mounted: function() {
  }
}
</script>