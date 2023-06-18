<template>
  <div>
    <b-form-group
      :label="fieldLabel">
      <b-input-group
        class="nowrap no-margin">
        <div class="w-100">
          <b-form-group>
            <v-select
              multiple
              :options="fieldOptions"
              v-model="_value"
              :reduce="item => item.code">
            </v-select>
          </b-form-group>
        </div>
        <b-input-group-append>
          <b-btn size="sm"
            variant="outline-secondary"
            @click="advancedSearch(field)"
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
import { mapState } from 'vuex'
export default {
  props: ['field', 'fieldLabel',
    'fieldOptions', 'updateField',
    'value', 'advancedSearch'],
  data() {
    return {
      selectedReportingOrganisationGroup: null
    }
  },
  computed: {
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
    }
  }
}
</script>