import Vue from "vue";
import axios from "axios";

const baseURL = "https://humportal.org";
const apiURL = "https://humportal.github.io/humportal-data";
const analyticsURL =
  "https://raw.githubusercontent.com/codeforIATI/IATI-Stats-public/gh-pages";

export const state = () => ({
  drilldowns: [
    {
      value: 'reporting_organisation',
      text: 'Reporting Organisation'
    },
    {
      value: 'sector_category',
      text: 'Sector Category'
    },
    {
      value: 'sector',
      text: 'Sector'
    },
    {
      value: 'activity.title',
      text: 'Activity Title'
    },
    {
      value: 'activity.iati_identifier',
      text: 'Activity IATI Identifier'
    },
    {
      value: 'reporting_organisation',
      text: 'Reporting Organisation'
    },
    {
      value: 'reporting_organisation.type',
      text: 'Reporting Organisation Type'
    },
    {
      value: 'recipient_country_or_region',
      text: 'Country or Region'
    },
    {
      value: 'aid_type',
      text: 'Aid Type'
    },
    {
      value: 'finance_type',
      text: 'Finance Type'
    },
    {
      value: 'humanitarian',
      text: 'Humanitarian'
    }
  ],
  codelistLookups: {
    reporting_organisation: 'ReportingOrganisation',
    'reporting_organisation.type': 'OrganisationType',
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
    'reporting_organisation.type': [],
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
    'reporting_organisation.type': {'en': 'Reporting Organisation Type'},
    aid_type:  {'en': 'Aid Type'},
    finance_type:  {'en': 'Finance Type'},
    flow_type:  {'en': 'Flow Type'},
    transaction_type:  {'en': 'Transaction Type'},
    sector_category:  {'en': 'Sector Category'},
    sector:  {'en': 'Sector'},
    recipient_country_or_region:  {'en': 'Recipient Country or Region'},
    humanitarian:  {'en': 'Humanitarian'}
  },
  codelistsRetrieved: false
});

export const mutations = {
  setFields(state, { field, values }) {
    Vue.set(state.fields, field, values);
    state.codelistsRetrieved = true
  }
};

export const actions = {
  async getCodelists({commit, state, dispatch}) {
    if (state.codelistsRetrieved == true) {
      return
    }
    Object.keys(state.fields).forEach(field => {
      const codelist = state.codelistLookups[field]
      if (codelist == undefined) {
        return
      }
      dispatch('getCodelistData', {field: field, codelist: codelist})
    })
  },
  async getCodelistData({ commit }, { field, codelist }) {
    const response = await axios.get(`https://codelists.codeforiati.org/api/json/en/${codelist}.json`
      )
    const data = response.data.data
    var codes = Object.values(data.reduce((summary, item) => {
      if (item['status'] != 'active') {
        return summary
      }
      var code = null
      var name = null
      if (field == 'sector_category') {
        var code = String(item['codeforiati:group-code'])
        var name = item['codeforiati:group-name']
      } else {
        var code = String(item.code)
        var name = String(item.name).trim()
      }
      summary[code] = {
        code: code,
        label: `${code} - ${name}`,
        name: name
      }
      return summary
    }, {}))
    codes = codes.sort((a,b) => a.name > b.name ? 1 : -1);
    console.log('codes', codes)


    commit('setFields', {field: field, values: codes})
  }
};
