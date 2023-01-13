<template>
  <div class="custom-data-browser">
    <DataBrowserNavbar />
    <h1>Custom data download</h1>
    <b-row>
      <b-col md="3" class="mt-2">
        <h3>Columns</h3>
        <b-form-group
          label="Select columns"
          :state="drilldowns.length == 0 ? false : true"
          invalid-feedback="You must select at least one column"
          :description="drilldowns.length > 1 ? 'Drag columns to reorder output' : null">
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
                  :title="`Deselect ${drilldown.label}`"
                  :aria-label="`Deselect ${drilldown.label}`"
                  class="vs__deselect"
                 @click="$delete(drilldownsWithLabels, index)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><path d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"></path></svg>
                </button>
              </div>
          </draggable>
        </b-form-group>
        <hr />
        <h3>Filters</h3>
        <DataBrowserFilterItem
          field="recipient_country_or_region"
          :fieldOptions="fields.recipient_country_or_region"
          :fieldLabel="fieldNames.recipient_country_or_region[lang]"
          :lang="lang"
          :value="setFields.recipient_country_or_region"
          :updateField="updateField">
        </DataBrowserFilterItem>

        <DataBrowserFilterItem
          field="reporting_organisation"
          :fieldOptions="fields.reporting_organisation"
          :fieldLabel="fieldNames.reporting_organisation[lang]"
          :lang="lang"
          :value="setFields.reporting_organisation"
          :updateField="updateField">
        </DataBrowserFilterItem>

        <DataBrowserFilterItem
          field="sector_category"
          :fieldOptions="fields.sector_category"
          :fieldLabel="fieldNames.sector_category[lang]"
          :lang="lang"
          :value="setFields.sector_category"
          :updateField="updateField">
        </DataBrowserFilterItem>

        <DataBrowserFilter
          :exclude-filters="['recipient_country_or_region',
            'reporting_organisation',
            'sector_category',
            'transaction_type']"
          :setFields.sync="setFields"
          :currency.sync="currency"
          :horizontal="false"
        />
      </b-col>
      <b-col md="9" class="mt-2">
        <h2>Preview</h2>
        <DataBrowser
          ref="dataBrowser"
          :drilldowns="drilldowns"
          displayAs="table"
          :setFields="setFields"
          :currency.sync="currency"
          :autoReload="autoReload"
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
  components: { DataBrowserNavbar, DataBrowser },
  data() {
    const lastYear = new Date().getFullYear()-1
    return {
      drilldowns: ['recipient_country_or_region', 'activity.iati_identifier', 'activity.title'],
      setFields: {
        year: [lastYear],
        transaction_type: ['budget'],
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
    lang() {
      return 'en' // this.$i18n.locale
    },
    drilldownOptions() {
      return Object.entries(this.availableDrilldowns).map(item => {
        return {
          value: item[0],
          label: item[1]
        }
      })
    },...mapState(['availableDrilldowns', 'fields', 'fieldNames'])
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
    this.setDrilldownsWithLabels()
  },
  watch: {
    drilldownsWithLabels: {
      handler() {
        this.drilldowns = this.drilldownsWithLabels.map(item => {
          return item.value
        })
      }
    }
  },
  head() {
    return {
      title: `${this.$t('dataCustomDownload')} - ${this.$t('dashboards')} - ${this.$t('title')}`,
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
  }
}
</script>
