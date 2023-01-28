<template>
  <div class="custom-data-browser">
    <DataBrowserNavbar />
    <h1>{{ $t('dataDashboards.customDownload') }}</h1>
    <b-row>
      <b-col md="3" class="mt-2">
        <h3>{{ $t('dataDashboards.columns') }}</h3>
        <b-form-group
          :label="$t('dataDashboards.selectColumns')"
          :state="drilldowns.length == 0 ? false : true"
          :invalid-feedback="$t('dataDashboards.selectAtLeastOneColumn')"
          :description="drilldowns.length > 1 ? $t('dataDashboards.dragColumnsToReorder') : null">
          <v-select
            multiple
            :options="drilldownOptions"
            v-model="drilldownsWithLabels"
            >
            <template #selected-option-container="{ option }">
              <div class="hidden-option">{{ option }}</div>
            </template>
          </v-select>
          <draggable v-model="drilldownsWithLabels"
            ghost-class="hidden" @start="drag=true" @end="drag=false">
            <div class="vs__selected draggable-item"
              v-for="(drilldown, index) in drilldownsWithLabels"
              :key="drilldown.value">
                {{ drilldown.label }}
                <button
                  type="button"
                  :title="`${$t('dataDashboards.deselect')} ${drilldown.label}`"
                  :aria-label="`${$t('dataDashboards.deselect')} ${drilldown.label}`"
                  class="vs__deselect"
                 @click="$delete(drilldownsWithLabels, index)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><path d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"></path></svg>
                </button>
              </div>
          </draggable>
        </b-form-group>
        <hr />
        <h3>{{ $t('dataDashboards.filters') }}</h3>
        <DataBrowserFilterItem
          field="recipient_country_or_region"
          :fieldOptions="fields.recipient_country_or_region"
          :fieldLabel="availableDrilldowns.recipient_country_or_region"
          :value="setFields.recipient_country_or_region"
          :updateField="updateField">
        </DataBrowserFilterItem>

        <DataBrowserFilterItem
          field="reporting_organisation"
          :fieldOptions="fields.reporting_organisation"
          :fieldLabel="availableDrilldowns.reporting_organisation"
          :value="setFields.reporting_organisation"
          :updateField="updateField">
        </DataBrowserFilterItem>

        <DataBrowserFilterItem
          field="sector_category"
          :fieldOptions="fields.sector_category"
          :fieldLabel="availableDrilldowns.sector_category"
          :value="setFields.sector_category"
          :updateField="updateField">
        </DataBrowserFilterItem>

        <DataBrowserFilter
          :hide-filters="['recipient_country_or_region',
            'reporting_organisation',
            'sector_category',
            'transaction_type']"
          :setFields.sync="setFields"
          :currency.sync="currency"
          :horizontal="false"
          pageName="data-custom"
          :drilldowns.sync="drilldowns"
        />
      </b-col>
      <b-col md="9" class="mt-2">
        <h2>{{ $t('dataDashboards.preview') }}</h2>
        <DataBrowser
          ref="dataBrowser"
          :drilldowns="drilldowns"
          displayAs="table"
          :setFields="setFields"
          :currency.sync="currency"
          :autoReload="autoReload"
          :customise="false"
         />
      </b-col>
    </b-row>
  </div>
</template>
<style>
.custom-data-browser {
  min-height: 650px;
}
.draggable-item {
  cursor:  grab;
}
.hidden-option {
  display: none;
}
</style>
<script>

import { mapState } from 'vuex'
import DataBrowserNavbar from '~/components/DataBrowserNavbar'
import DataBrowser from '~/components/DataBrowser'
export default {
  name: 'DataCustom',
  components: { DataBrowserNavbar, DataBrowser },
  data() {
    const lastYear = new Date().getFullYear()-1
    return {
      drilldowns: ['recipient_country_or_region', 'activity.iati_identifier', 'activity.title'],
      setFields: {
        year: [lastYear],
        transaction_type: ['3', '4', 'budget'],
        calendar_year_and_quarter: []
      },
      currency: 'usd',
      autoReload: true,
      drilldownsWithLabels: []
    }
  },
  methods: {
    runData() {
      this.$refs.dataBrowser.loadData()
    },
    updateField(field, values) {
      this.$set(this.setFields, field, values)
    },
    setDrilldownsWithLabels() {
      this.drilldownsWithLabels = this.drilldowns.map(item => {
        return {
          value: item,
          label: this.availableDrilldowns[item]
        }
      })
    }
  },
  computed: {
    drilldownOptions() {
      return Object.entries(this.availableDrilldowns).map(item => {
        return {
          value: item[0],
          label: item[1]
        }
      })
    },...mapState(['availableDrilldowns', 'fields'])
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
    this.setDrilldownsWithLabels()
  },
  head() {
    return {
      title: `${this.$t('dataDashboards.customDownload')} - ${this.$t('dataDashboards.label')} - ${this.$t('title')}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('description')
        }
      ],
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  },
  watch: {
    '$i18n.locale'() {
      this.$store.dispatch('getCodelists')
    },
    drilldownsWithLabels: {
      handler() {
        this.drilldowns = this.drilldownsWithLabels.map(item => {
          return item.value
        })
      }
    }
  }
}
</script>
