import Vue from "vue";
import axios from "axios";

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
    "calendar_year_and_quarter.calendar_year_and_quarter": "Calendar Year and Quarter"
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
        label: "Not Multi Country"
      },
      {
        code: "1",
        label: "Multi Country"
      }
    ],
    sector_category: [],
    sector: [],
    humanitarian: [
      {
        code: "0",
        label: "Development"
      },
      {
        code: "1",
        label: "Humanitarian"
      }
    ]
  },
  codelistsRetrieved: null,
  years: ['2014', '2015', '2016', '2017',
        '2018', '2019', '2020', '2021', '2022',
        '2023', '2024', '2025', '2026', '2027',
        '2028', '2029', '2030'],
  calendar_years_and_quarters: ['2000 Q1', '2000 Q2', '2000 Q3', '2000 Q4', '2001 Q1', '2001 Q2', '2001 Q3', '2001 Q4', '2002 Q1', '2002 Q2', '2002 Q3', '2002 Q4', '2003 Q1', '2003 Q2', '2003 Q3', '2003 Q4', '2004 Q1', '2004 Q2', '2004 Q3', '2004 Q4', '2005 Q1', '2005 Q2', '2005 Q3', '2005 Q4', '2006 Q1', '2006 Q2', '2006 Q3', '2006 Q4', '2007 Q1', '2007 Q2', '2007 Q3', '2007 Q4', '2008 Q1', '2008 Q2', '2008 Q3', '2008 Q4', '2009 Q1', '2009 Q2', '2009 Q3', '2009 Q4', '2010 Q1', '2010 Q2', '2010 Q3', '2010 Q4', '2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4', '2013 Q1', '2013 Q2', '2013 Q3', '2013 Q4', '2014 Q1', '2014 Q2', '2014 Q3', '2014 Q4', '2015 Q1', '2015 Q2', '2015 Q3', '2015 Q4', '2016 Q1', '2016 Q2', '2016 Q3', '2016 Q4', '2017 Q1', '2017 Q2', '2017 Q3', '2017 Q4', '2018 Q1', '2018 Q2', '2018 Q3', '2018 Q4', '2019 Q1', '2019 Q2', '2019 Q3', '2019 Q4', '2020 Q1', '2020 Q2', '2020 Q3', '2020 Q4', '2021 Q1', '2021 Q2', '2021 Q3', '2021 Q4', '2022 Q1', '2022 Q2', '2022 Q3', '2022 Q4', '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2', '2027 Q3', '2027 Q4', '2028 Q1', '2028 Q2', '2028 Q3', '2028 Q4', '2029 Q1', '2029 Q2', '2029 Q3', '2029 Q4', '2030 Q1', '2030 Q2', '2030 Q3', '2030 Q4']
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
