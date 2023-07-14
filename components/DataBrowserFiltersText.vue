<template>
  <p><b>{{ $t('dataDashboards.selectedFilters') }}</b>:
    <span v-for="(item, index) in selectedFiltersText">
      <template v-if="index>0">; </template>{{ item.filter }}: <i>{{ item.values.join(', ') }}</i>
    </span>
  </p>
</template>
<script>
import { mapState } from 'vuex'
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
    excludeFilters: {
      default() {
        return []
      }
    },
    horizontal: {
      default: true
    },
    drilldowns: {
      default() {
        return ['sector_category']
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
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
              filter: this.getDrilldownName(item[0]),
              values: item[1].map(itemValue => {
                if (item[0] in this.fieldsObj) {
                  return this.fieldsObj[item[0]][itemValue]
                }
                return itemValue
              })
            })
          }
        }
        return summary
      }, []).sort((a,b)=> { return a.filter - b.filter})

    },...mapState(['codelistLookups', 'fields',
      'availableDrilldowns', 'years', 'calendar_years_and_quarters'])
  },
  components: {
    
  },
  methods: {
    getDrilldownName(drilldownName, count=null) {
      const drilldownSource = drilldownName in this.$t('dataDashboards.availableDrilldowns') ? 'dataDashboards.availableDrilldowns' : 'dataDashboards.unavailableDrilldowns'
      if (count == null) {
        return this.$t(drilldownSource)[drilldownName]
      } else {
        return this.$tc(`${drilldownSource}.${drilldownName}`, count)
      }
    }
  },
  mounted: function() {
  }
}
</script>
