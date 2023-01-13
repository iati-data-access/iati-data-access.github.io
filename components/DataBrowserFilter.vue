<template>
  <div>
    <b-row>
      <b-col :md="horizontal ? 10 : 12">
        <!-- Budgets or spending -->
        <b-form :inline="horizontal">
          <b-form-group
            :label="$t('dataDashboards.currency')"
            :class="horizontal ? 'mr-4 mt-2': 'mt-2'">
            <b-form-radio-group
              id="btn-currency"
              v-model="_currency"
              :options="currencyOptions"
              button-variant="outline-secondary"
              name="radio-btn-outline"
              :stacked="!horizontal"
              :class="!horizontal ? 'w-100': null"
              buttons
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group
            :label="$t('dataDashboards.budgetsSpending.budgetsOrSpending')"
            :class="horizontal ? 'mr-4 mt-2': 'mt-2'">
            <b-form-radio-group
              v-model="budgetsSpending"
              size="md"
              button-variant="outline-secondary"
              :stacked="!horizontal"
              :class="!horizontal ? 'w-100': null"
              buttons>
              <b-form-radio
                :class="option.class"
                :value="option.value"
                v-for="option in budgetsSpendingOptions"
                v-bind:key="option.value">
                {{ option.text }}
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group
            :label="$t('dataDashboards.calendarYear')"
            style="min-width: 200px;"
            :class="horizontal ? 'mr-4 mt-2': 'mt-2'">
            <v-select
              :options="years"
              multiple
              v-model="setFields.year"
              style="min-width: 200px;"></v-select>
          </b-form-group>

          <b-form-group
            :label="$t('dataDashboards.calendarYearAndQuarter')"
            style="min-width: 200px;"
            class="mt-2">
            <v-select
              :options="calendar_years_and_quarters"
              multiple
              v-model="setFields.calendar_year_and_quarter"
              style="min-width: 200px;"></v-select>
          </b-form-group>

        </b-form>
        <!-- Year -->
      </b-col>
      <b-col :md="horizontal ? 2 : 12" :class="horizontal ? 'text-right d-flex align-items-end' : null">
        <b-button
          class="ml-md-auto"
          @click="showFilters = !showFilters"
          variant="secondary"
          :block="!horizontal"
          >{{ $t('dataDashboards.moreFilters') }} <font-awesome-icon :icon="['fa', 'gear']" /></b-button>
      </b-col>
    </b-row>
    <b-row v-if="horizontal">
      <b-col>
        <hr />
      </b-col>
    </b-row>
    <b-modal v-model="showFilters" title="Filters" ok-only ok-title="Close" size="lg">
      <b-row cols="3" class="p-3">
        <b-col
          class="p-2"
          v-for="field in Object.keys(fields)"
          v-if="!excludeFilters.includes(field)"
          v-bind:key="field">
          <DataBrowserFilterItem
            :field="field"
            :fieldOptions="fields[field]"
            :fieldLabel="availableDrilldowns[field]"
            :updateField="updateField"
            :value="setFields[field]">
          </DataBrowserFilterItem>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>
<style>
.active.budgets, .budgets:hover {
  background-color: #155366 !important;
  border-color: #155366 !important;
}
.active.spending, .spending:hover {
  background-color: #06DBE4 !important;
  border-color: #06DBE4 !important;
}
</style>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import BarChartComponent from '~/components/BarChartComponent'
import DataBrowserFilterItem from  '~/components/DataBrowserFilterItem'
import Map from '~/components/Map'
export default {
  props: {
    setFields: {
      default() {
        return {
          reporting_organisation: [],
          aid_type: [],
          finance_type: [],
          flow_type: [],
          transaction_type: ['2'],
          sector_category: [],
          sector: [],
          recipient_country_or_region: ['AF'],
          year: ['2020'],
          calendar_year_and_quarter: []
        }
      }
    },
    summary: {
      default: 'sector_category'
    },
    currency: {
      default: 'usd'
    },
    excludeFilters: {
      default() {
        return []
      }
    },
    horizontal: {
      default: true
    }
  },
  data() {
    return {
      budgetsSpending: this.setFields.transaction_type.includes('budget') ? 'budgets' : 'spending',
      budgetsSpendingOptions: [
        {
          value: 'budgets',
          text: this.$t('dataDashboards.budgetsSpending.budgets'),
          class: 'budgets'
        },
        {
          value: 'spending',
          text: this.$t('dataDashboards.budgetsSpending.spending'),
          class: 'spending'
        },
        {
          value: 'both',
          text: this.$t('dataDashboards.budgetsSpending.both'),
          class: 'secondary'
        }
      ],
      showFilters: false,
      isBusy: true,
      currencyOptions: [
        {
          value: 'usd',
          text: 'USD'
        },
        {
          value: 'eur',
          text: 'EUR'
        }
      ]
    }
  },
  computed: {
    _currency: {
      get() {
        return this.currency
      },
      set(value) {
        this.$emit('update:currency', value)
      }
    },...mapState(['codelistLookups', 'fields',
      'availableDrilldowns', 'years', 'calendar_years_and_quarters'])
  },
  components: {
    DataBrowserFilterItem
  },
  methods: {
    updateField(field, value) {
      this.$set(this.setFields, field, value)
      this.$emit('update:setFields', this.setFields)
    },
  },
  watch: {
    budgetsSpending(value) {
      if (value == 'both') {
        this.updateField('transaction_type', ['3', '4', 'budget'])
      } else if (value == 'spending') {
        this.updateField('transaction_type', ['3', '4'])
      } else {
        this.updateField('transaction_type', ['budget'])
      }
    },
    'setFields.year': {
      handler(value) {
        if (value.length>0) {
          this.$set(this.setFields, 'calendar_year_and_quarter', [])
        }
      }
    },
    'setFields.calendar_year_and_quarter': {
      handler(value) {
        if (value.length>0) {
          this.$set(this.setFields, 'year', [])
        }
      }
    }
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  }
}
</script>
