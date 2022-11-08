<template>
  <div>
    <b-row>
      <b-col md="10">
        <!-- Budgets or spending -->
        <b-form inline>
          <b-form-group
            label="Currency"
            class="mr-4 mt-2">
            <b-form-radio-group
              id="btn-currency"
              v-model="_currency"
              :options="currencyOptions"
              button-variant="outline-secondary"
              name="radio-btn-outline"
              buttons
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group
            label="Spending type"
            class="mr-4 mt-2">
            <b-form-radio-group
              v-model="budgetsSpending"
              :options="budgetsSpendingOptions"
              button-variant="outline-secondary"
              size="md"
              buttons></b-form-radio-group>
          </b-form-group>

          <b-form-group
            label="Calendar Year"
            style="min-width: 200px;"
            class="mr-4 mt-2">
            <v-select
              :options="years"
              multiple
              v-model="setFields.year"
              style="min-width: 200px;"></v-select>
          </b-form-group>

          <b-form-group
            label="Calendar Year and Quarter"
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
      <b-col md="2" class="text-right">
        <b-button
          @click="showFilters = !showFilters"
          variant="outline-secondary"
          size="sm">More filters <font-awesome-icon :icon="['fa', 'cog']" /></b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <hr />
      </b-col>
    </b-row>
    <b-modal v-model="showFilters" title="Filters" ok-only ok-title="Close" size="lg">
      <b-col>
        <DataBrowserFilterItem
          :field="field"
          :fieldOptions="fields[field]"
          :fieldLabel="fieldNames[field][lang]"
          :lang="lang"
          :updateField="updateField"
          :value="setFields[field]"
          v-for="field in Object.keys(fields)"
          v-if="!excludeFilters.includes(field)"
          v-bind:key="field">
        </DataBrowserFilterItem>
      </b-col>
    </b-modal>
  </div>
</template>
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
          year: ['2020']
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
      default: []
    }
  },
  data() {
    return {
      budgetsSpending: 'spending',
      budgetsSpendingOptions: [
        {
          value: 'budgets',
          text: 'Budgets'
        },
        {
          value: 'spending',
          text: 'Spending'
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
    },
    lang() {
      return 'en' // this.$i18n.locale
    },...mapState(['codelistLookups', 'fields',
      'fieldNames', 'years', 'calendar_years_and_quarters'])
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
      if (value == 'spending') {
        this.updateField('transaction_type', ['3', '4'])
      } else {
        this.updateField('transaction_type', ['budget'])
      }
    }
  },
  mounted: function() {
    this.$store.dispatch('getCodelists')
  }
}
</script>
