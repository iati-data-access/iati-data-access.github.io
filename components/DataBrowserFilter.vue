<template>
  <div>
    <b-row v-if="horizontal">
      <b-col>
        <p class="lead">{{ $t('dataDashboards.filtersText') }}</p>
      </b-col>
    </b-row>
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
            :class="horizontal ? 'mr-4 mt-2': 'mt-2 mb-0'">
            <b-form-radio-group
              v-model="setFields.transaction_type"
              size="md"
              button-variant="outline-secondary"
              :stacked="!horizontal"
              :class="!horizontal ? 'w-100': null"
              buttons>
              <b-form-radio
                :class="option.class"
                :value="option.value"
                v-for="option in budgetsSpendingOptions"
                v-bind:key="option.text">
                {{ option.text }}
              </b-form-radio>
            </b-form-radio-group>
          </b-form-group>
            <!--
            <b-btn
              v-if="customPage"
              class="mt-0"
              variant="link"
              size="sm"
              @click="simpleTransactionTypes=false">{{ $t('dataDashboards.switchTransactionTypes.toAdvanced') }}</b-btn>
            -->
          <!--
          <template v-if="simpleTransactionTypes">
          </template>
          <template v-else>
            <b-form-group
              :label="$t('dataDashboards.transactionTypes')"
              :class="horizontal ? 'mr-4 mt-2': 'mt-2 mb-0'">
              <v-select
                multiple
                v-model="setFields.transaction_type"
                :options="fields.transaction_type"
                :reduce="item => item.code">
              </v-select>
            </b-form-group>
            <b-btn
              class="mt-0"
              variant="link"
              size="sm"
              @click="simpleTransactionTypes=true">{{ $t('dataDashboards.switchTransactionTypes.toSimple') }}</b-btn>
          </template>
          -->

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
    <b-row v-if="selectedFiltersText && horizontal">
      <b-col>
        <hr />
        <DataBrowserFiltersText :setFields="setFields" :excludeFilters="excludeFilters" />
      </b-col>
    </b-row>
    <b-row v-if="horizontal">
      <b-col>
        <hr />
      </b-col>
    </b-row>
    <b-modal v-model="showFilters" title="Filters" ok-only ok-title="Close" size="xl">
      <b-row cols="3" class="p-3">
        <b-col
          class="p-2"
          v-for="field in Object.keys(fields)"
          v-if="!excludeFilters.includes(field) && !hideFilters.includes(field)"
          v-bind:key="field">
          <DataBrowserFilterItem
            :field="field"
            :fieldOptions="fields[field]"
            :fieldLabel="$tc(`dataDashboards.availableDrilldowns.${field}`)"
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
          transaction_type: ['3', '4'],
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
    hideFilters: {
      default() {
        return []
      }
    },
    horizontal: {
      default: true
    },
    pageName: {
      default: 'data-recipient-country-or-region-code'
    },
    drilldowns: {
      default() {
        return ['sector_category']
      }
    }
  },
  data() {
    return {
      simpleTransactionTypes: true,
      budgetsSpendingOptions: [
        {
          value: ['budget'],
          text: this.$t('dataDashboards.budgetsSpending.budgets'),
          class: 'budgets'
        },
        {
          value: ['3', '4'],
          text: this.$t('dataDashboards.budgetsSpending.spending'),
          class: 'spending'
        },
        {
          value: ['3', '4', 'budget'],
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
    customPage() {
      return this.pageName.includes('data-custom')
    },
    specificPage() {
      return this.pageName.includes('-code')
    },
    drilldownsForQuery() {
      return this.drilldowns.join(";")
    },
    fieldsForQuery() {
      return Object.entries(this.setFields).reduce((summary, item) => {
        // We only want to exclude e.g. the country name when on the country page
        if (this.specificPage) {
          if (item[0] == this.excludeFilters[0]) { return summary }
        }
        if (item[1].length > 0) {
          summary.push(`${item[0]}:${item[1].join(",")}`)
        }
        return summary
      }, []).sort().join(";")
    },
    fieldsObj() {
      return Object.entries(this.fields).reduce((summary, item) => {
        summary[item[0]] = item[1].reduce((itemSummary, itemItem) => {
          itemSummary[itemItem.code] = itemItem.name
          return itemSummary
        }, {})
        return summary
      }, {})
    },
    selectedFiltersText() {
      return Object.entries(this.setFields).reduce((summary, item) => {
        // We only want to exclude e.g. the country name when on the country page
        if (this.specificPage) {
          if (item[0] == this.excludeFilters[0]) { return summary }
        }
        if (item[1].length > 0) {

          if (['year', 'quarter', 'calendar_year_and_quarter'].includes(item[0])) {
            summary.push({
              filter: this.getDrilldownName(item[0], item[1].length),
              values: item[1]
            })
          } else {
            summary.push({
              filter: this.getDrilldownName(item[0], item[1].length),
              values: item[1].map(itemValue => {
                return this.fieldsObj[item[0]][itemValue]
              })
            })
          }
        }
        return summary
      }, []).sort((a,b)=> { return a.filter - b.filter})

    },
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
    getDrilldownName(drilldownName, count=null) {
      const drilldownSource = drilldownName in this.$t('dataDashboards.availableDrilldowns') ? 'dataDashboards.availableDrilldowns' : 'dataDashboards.unavailableDrilldowns'
      if (count === null) {
        return this.$t(`${drilldownSource}.${drilldownName}`)
      } else {
        return this.$tc(`${drilldownSource}.${drilldownName}`, count)
      }
    },
    updateField(field, value) {
      this.$set(this.setFields, field, value)
      this.$emit('update:setFields', this.setFields)
    },
    updateDrilldowns(drilldowns) {
      this.$emit('update:drilldowns', drilldowns)
    },
    customiseFromQuery() {
      if (Object.keys(this.$route.query).length>0) {
        if (this.customPage) {
          if (this.$route.query.drilldowns) {
            const _drilldowns = this.$route.query.drilldowns.split(";")
            this.updateDrilldowns(_drilldowns)
          }
        }
        if (this.$route.query.filters) {
          const queryFilters = this.$route.query.filters.split(";")
          const filtersInQuery = queryFilters.reduce((summary, item) => {
            const [field, values] = item.split(":")
            this.$set(this.setFields, field, values.split(","))
            summary.push(field)
            return summary
          }, [])
          Object.keys(this.setFields).forEach(item => {
            if (!filtersInQuery.includes(item) && (!this.excludeFilters.includes(item))) {
              this.$set(this.setFields, item, [])
            }
          })
        }
      }
    }
  },
  watch: {
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
    },
    '$route.query'() {
      this.customiseFromQuery()
    },
    drilldowns: {
      handler() {
        if (this.customPage) {
          this.$router.push(this.localePath({
            name: this.pageName,
            query: {
              drilldowns: this.drilldownsForQuery,
              filters: this.fieldsForQuery
            }
          }))
        }
      }
    },
    setFields: {
      handler() {
        if (this.customPage) {
          this.$router.push(this.localePath({
            name: this.pageName,
            query: {
              drilldowns: this.drilldownsForQuery,
              filters: this.fieldsForQuery
            }
          }))
        } else if (this.specificPage) {
          this.$router.push(this.localePath({
            name: this.pageName,
            params: { code: this.$route.params.code},
            query: { filters: this.fieldsForQuery}
          }))
        } else {
          this.$router.push(this.localePath({
            name: this.pageName,
            query: { filters: this.fieldsForQuery}
          }))
        }
      },
      deep: true
    }
  },
  mounted: function() {
    this.customiseFromQuery()
    this.$store.dispatch('getCodelists')
  }
}
</script>
