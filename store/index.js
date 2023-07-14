import Vue from "vue";
import axios from "axios";


const calendarYears = function() {
  // Calendar years run from 2000 to ten years after today
  var years = []
  const year = new Date().getFullYear()
  const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  return range(2000, year+10).map(year => { return `${year}` })
}

export const state = () => ({
  availableDrilldowns: {
    "activity.iati_identifier": "Activity IATI Identifier",
    "activity.title": "Activity Title",
    "reporting_organisation": "Reporting Organisation",
    "reporting_organisation_type": "Reporting Organisation Type",
    "aid_type": "Aid Type",
    "finance_type": "Finance Type",
    "flow_type": "Flow Type",
    "provider_organisation": "Provider Organisation",
    "provider_organisation_type": "Provider Organisation Type",
    "receiver_organisation": "Receiver Organisation",
    "receiver_organisation_type": "Receiver Organisation Type",
    "recipient_country_or_region": "Recipient Country or Region",
    "multi_country": "Multi Country",
    "sector_category": "Sector Category",
    "sector": "Sector",
    "humanitarian": "Humanitarian",
    "year.year": "Calendar Year",
    "quarter.quarter": "Calendar Quarter",
    "calendar_year_and_quarter.calendar_year_and_quarter": "Calendar Year and Quarter",
    "transaction_type": "Transaction Type",
  },
  codelistLookups: {
    reporting_organisation: 'ReportingOrganisation',
    reporting_organisation_type: 'OrganisationType',
    aid_type: 'AidType',
    finance_type: 'FinanceType',
    flow_type: 'FlowType',
    transaction_type: 'TransactionType',
    sector_category: 'SectorGroup',
    sector: 'Sector',
    recipient_country_or_region: 'Country'
  },
  reportingOrganisationGroup: [],
  fieldsEN: {
    reporting_organisation: {}
  },
  fields: {
    reporting_organisation: [],
    reporting_organisation_type: [],
    aid_type: [],
    finance_type: [],
    flow_type: [],
    transaction_type: [],
    recipient_country_or_region: [],
    multi_country: [
      {
        code: "0",
        name: "Not Multi Country",
        label: "Not Multi Country"
      },
      {
        code: "1",
        name: "Multi Country",
        label: "Multi Country"
      }
    ],
    sector_category: [],
    sector: [],
    humanitarian: [
      {
        code: "0",
        name: "Development",
        label: "Development"
      },
      {
        code: "1",
        name: "Humanitarian",
        label: "Humanitarian"
      }
    ],
    year: calendarYears().map(item => {
      return {
        code: item,
        label: item,
        name: item
      }
    }),
    calendar_year_and_quarter: calendarYears().reduce((summary, year) => {
      ['Q1', 'Q2', 'Q3', 'Q4'].forEach(quarter => {
        summary.push({
          code: `${year} ${quarter}`,
          label: `${year} ${quarter}`,
          name: `${year} ${quarter}`
        })
      })
      return summary
    }, [])
  },
  codelistsRetrieved: null,
});

export const mutations = {
  setFields(state, {field, data, locale}) {
    var codes = Object.values(data.reduce((summary, item) => {
      // We don't show withdrawn countries or reporting organisations anywhere
      if ((['recipient_country_or_region', 'reporting_organisation'].includes(field)) &&
        (item['status'] != 'active')) {
        return summary
      }
      var code, name, label = null
      if (field == 'sector_category') {
        var code = String(item['codeforiati:group-code'])
        var name = item['codeforiati:group-name']
      } else {
        var code = String(item.code)
        var name = String(item.name).trim()
      }
      // Fall back to EN language for reporting organisation
      // (translations of other codelists should be up to date!)
      if ((field == 'reporting_organisation') && (locale != 'en') && (name === 'null')) {
        name = state.fieldsEN.reporting_organisation[code].name
      }
      if (['recipient_country_or_region', 'reporting_organisation', 'reporting_organisation_type'].includes(field)) {
        var label = name
      } else {
        var label = `${code} - ${name}`
      }



      summary[code] = {
        code: code,
        label: label,
        name: name,
        status: item.status
      }
      if (item.description) {
        summary[code].description = item.description
      }
      return summary
    }, {}))
    if (['recipient_country_or_region', 'reporting_organisation'].includes(field)) {
      codes = codes.sort((a,b) => a.name > b.name ? 1 : -1);
    }
    if (field == 'transaction_type') {
      codes = codes.filter(code => {
        return ['1','2', '3','4'].includes(code.code)
      })
      const budgetTranslations = {
        'en': 'Budget',
        'fr': 'Budget',
        'es': 'Presupuesto',
        'pt': 'Orçamento',
      }
      const budgetName = budgetTranslations[this.$i18n.locale]
      codes.push({
        code: 'budget',
        label: budgetName,
        name: budgetName
      })
    }
    Vue.set(state.fields, field, codes);
    if ((field == 'reporting_organisation') && (locale == 'en')) {
      const codes_obj = codes.reduce((summary, item) => {
        summary[item.code] = item
        return summary
      }, {})
      Vue.set(state.fieldsEN, 'reporting_organisation', codes_obj)
    }
  },
  setCodelistsRetrieved(state, value) {
    state.codelistsRetrieved = value
  },
  setAvailableDrilldowns(state, value) {
    state.availableDrilldowns = value
  },
  setReportingOrganisationGroup(state, data) {
    state.reportingOrganisationGroup = Object.values(
      data.reduce((summary, item) => {
        // Ignore withdrawn codes
        if (item.status == 'withdrawn') { return summary }
        const group_code = String(item['codeforiati:group-code'])
        const group_name = item['codeforiati:group-name']
        if (!(group_code in summary)) {
          summary[group_code] = {
            code: group_code,
            label: group_name,
            name: group_name,
            items: []
          }
        }
        summary[group_code].items.push(item.code)
        return summary
      }, {})
    ).sort((a,b) => a.name > b.name ? 1 : -1)
  }
};

export const actions = {
  async getCodelists({commit, state, dispatch}) {
    if (state.codelistsRetrieved != this.$i18n.locale) {
      commit('setCodelistsRetrieved', this.$i18n.locale)
      commit('setAvailableDrilldowns', this.$i18n.t('dataDashboards.availableDrilldowns'))
      Object.keys(state.fields).forEach(field => {
        const codelist = state.codelistLookups[field]
        if (codelist == undefined) {
          return
        }
        dispatch('getCodelistData', {field: field, codelist: codelist})
      })
      dispatch('getCodelistData', { field: 'reporting_organisation_group', codelist: 'ReportingOrganisationGroup' })
    }
  },
  async getCodelistData({ commit, state, dispatch }, { field, codelist, locale = this.$i18n.locale }) {
    // Also load reporting organisation codelist in EN if
    // the locale is not EN.
    if ((field == 'reporting_organisation') && (locale != 'en') && (Object.keys(state.fieldsEN.reporting_organisation).length===0)) {
      await dispatch('getCodelistData', {field: field, codelist: codelist, locale: 'en'})
    }
    const response = await axios.get(`https://codelists.codeforiati.org/api/json/${locale}/${codelist}.json`
      )
    var data = response.data.data
    if (field == 'recipient_country_or_region') {
      const response_regions = await axios.get(`https://codelists.codeforiati.org/api/json/${locale}/Region.json`
      )
      var data_regions = response_regions.data.data
      commit('setFields', {field: field, data: data.concat(data_regions), locale: locale})
    } else if (field == 'reporting_organisation_group') {
      commit('setReportingOrganisationGroup', data)
    } else {
      commit('setFields', {field: field, data: data, locale: locale})
    }
  },
  async nuxtServerInit({commit, state, dispatch}) {
    this.dispatch('getCodelistData', { field: 'recipient_country_or_region', codelist: 'Country' })
    this.dispatch('getCodelistData', { field: 'sector_category', codelist: 'SectorGroup' })
    this.dispatch('getCodelistData', { field: 'reporting_organisation', codelist: 'ReportingOrganisation' })
    this.dispatch('getCodelistData', { field: 'reporting_organisation_group', codelist: 'ReportingOrganisationGroup' })
  }
};
