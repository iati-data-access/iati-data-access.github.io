<template>
  <b-form-group
    :label="fieldLabel">
    <v-select
      multiple
      :options="fieldOptions"
      v-model="_value"
      :reduce="item => item.code">
    </v-select>
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
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['field', 'fieldLabel',
    'fieldOptions', 'updateField',
    'value'],
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