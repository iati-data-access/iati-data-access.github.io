import Vue from "vue";
import axios from "axios";

const baseURL = "https://humportal.org";
const apiURL = "https://humportal.github.io/humportal-data";
const analyticsURL =
  "https://raw.githubusercontent.com/codeforIATI/IATI-Stats-public/gh-pages";

export const state = () => ({
  availableDrilldowns: {
    "reporting_organisation": "Reporting Organisation",
    "reporting_organisation.type": "Reporting Organisation Type",
    "recipient_country_or_region": "Country or Region",
    "sector_category": "Sector Category",
    "sector": "Sector",
    "activity.title": "Activity Title",
    "activity.iati_identifier": "Activity IATI Identifier",
    "provider_organisation.name": "Provider Organisation",
    "receiver_organisation.name": "Receiver Organisation",
    "aid_type": "Aid Type",
    "finance_type": "Finance Type",
    "humanitarian": "Humanitarian",
    "transaction_type": "Transaction Type",
    "year": "Year",
    "quarter": "Quarter",
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
  fields: {
    reporting_organisation: [],
    reporting_organisation_type: [],
    aid_type: [],
    finance_type: [],
    flow_type: [],
    transaction_type: [],
    sector_category: [],
    sector: [],
    recipient_country_or_region: [],
    humanitarian: [
      {
        code: 0,
        label: "Not Humanitarian"
      },
      {
        code: 1,
        label: "Humanitarian"
      }
    ]
  },
  fieldNames: {
    reporting_organisation: {'en': 'Reporting Organisation'},
    reporting_organisation_type: {'en': 'Reporting Organisation Type'},
    aid_type:  {'en': 'Aid Type'},
    finance_type:  {'en': 'Finance Type'},
    flow_type:  {'en': 'Flow Type'},
    transaction_type:  {'en': 'Transaction Type'},
    sector_category:  {'en': 'Sector Category'},
    sector:  {'en': 'Sector'},
    recipient_country_or_region:  {'en': 'Recipient Country or Region'},
    humanitarian:  {'en': 'Humanitarian'}
  },
  codelistsRetrieved: false,
  years: ['2014', '2015', '2016', '2017',
        '2018', '2019', '2020', '2021', '2022',
        '2023', '2024', '2025', '2026', '2027',
        '2028', '2029', '2030'],
  calendar_years_and_quarters: ['2000 Q1', '2000 Q2', '2000 Q3', '2000 Q4', '2001 Q1', '2001 Q2', '2001 Q3', '2001 Q4', '2002 Q1', '2002 Q2', '2002 Q3', '2002 Q4', '2003 Q1', '2003 Q2', '2003 Q3', '2003 Q4', '2004 Q1', '2004 Q2', '2004 Q3', '2004 Q4', '2005 Q1', '2005 Q2', '2005 Q3', '2005 Q4', '2006 Q1', '2006 Q2', '2006 Q3', '2006 Q4', '2007 Q1', '2007 Q2', '2007 Q3', '2007 Q4', '2008 Q1', '2008 Q2', '2008 Q3', '2008 Q4', '2009 Q1', '2009 Q2', '2009 Q3', '2009 Q4', '2010 Q1', '2010 Q2', '2010 Q3', '2010 Q4', '2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4', '2013 Q1', '2013 Q2', '2013 Q3', '2013 Q4', '2014 Q1', '2014 Q2', '2014 Q3', '2014 Q4', '2015 Q1', '2015 Q2', '2015 Q3', '2015 Q4', '2016 Q1', '2016 Q2', '2016 Q3', '2016 Q4', '2017 Q1', '2017 Q2', '2017 Q3', '2017 Q4', '2018 Q1', '2018 Q2', '2018 Q3', '2018 Q4', '2019 Q1', '2019 Q2', '2019 Q3', '2019 Q4', '2020 Q1', '2020 Q2', '2020 Q3', '2020 Q4', '2021 Q1', '2021 Q2', '2021 Q3', '2021 Q4', '2022 Q1', '2022 Q2', '2022 Q3', '2022 Q4', '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2', '2027 Q3', '2027 Q4', '2028 Q1', '2028 Q2', '2028 Q3', '2028 Q4', '2029 Q1', '2029 Q2', '2029 Q3', '2029 Q4', '2030 Q1', '2030 Q2', '2030 Q3', '2030 Q4']
});

export const mutations = {
  setFields(state, { field, values }) {
    Vue.set(state.fields, field, values);
    state.codelistsRetrieved = true
  },
  setCodelistsRetrieved(state, value) {
    state.codelistsRetrieved = value
  }
};

export const actions = {
  async getCodelists({commit, state, dispatch}) {
    if (state.codelistsRetrieved == false) {
      commit('setCodelistsRetrieved', null)
      Object.keys(state.fields).forEach(field => {
        const codelist = state.codelistLookups[field]
        if (codelist == undefined) {
          return
        }
        dispatch('getCodelistData', {field: field, codelist: codelist})
      })
    }
  },
  async getCodelistData({ commit }, { field, codelist }) {
    const response = await axios.get(`https://codelists.codeforiati.org/api/json/en/${codelist}.json`
      )
    const data = response.data.data
    var codes = Object.values(data.reduce((summary, item) => {
      if (item['status'] != 'active') {
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
      if (['recipient_country_or_region', 'reporting_organisation', 'reporting_organisation_type'].includes(field)) {
        var label = name
      } else {
        var label = `${code} - ${name}`
      }

      summary[code] = {
        code: code,
        label: label,
        name: name
      }
      return summary
    }, {}))
    if (['recipient_country_or_region', 'reporting_organisation'].includes(field)) {
      codes = codes.sort((a,b) => a.name > b.name ? 1 : -1);
    }

    commit('setFields', {field: field, values: codes})
  }
};
