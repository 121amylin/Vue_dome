import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.use(Vuex)

function API (url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        // eslint-disable-next-line prefer-promise-reject-errors
        return res.status === 200 ? res.json() : reject()
      })
      .then(result => {
        resolve(result)
      })
  })
}

export default new Vuex.Store({
  state: {
    db: null,
    db2: null,
    now_city: '臺中市',
    first_data: 0
  },
  mutations: {
    GET_DB (state, date) {
      state.db = date
    },
    GET_DB2 (state, date) {
      state.db2 = date
    },
    CHANGE_CITY (state, date) {
      state.now_city = date
    }
  },
  getters: {},
  actions: {
    get_API (store) {
      axios
        .get(
          'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
        )
        .then(res => {
          store.commit('GET_DB', res.data)
        })
    },
    get_API_group (store) {
      const temp = []
      const url1 =
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=1'
      const url2 =
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=2'
      const url3 =
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=3'
      const url4 =
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=4'
      const url5 =
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5'
      const url6 =
        'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'

      async function apiGroup () {
        const arr = [
          API(url1),
          API(url2),
          API(url3),
          API(url4),
          API(url5),
          API(url6)
        ]
        for (const item of arr) {
          await item
            .then(res => {
              return res.map(item => {
                return temp.push({
                  UID: item.UID,
                  title: item.title,
                  location: item.showInfo[0].location,
                  showUnit: item.showUnit,
                  descriptionFilterHtml: item.descriptionFilterHtml,
                  webSales: item.webSales,
                  imageUrl: item.imageUrl,
                  startDate: item.startDate,
                  endDate: item.endDate,
                  category: item.category
                })
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
        console.log(temp)
        store.commit('GET_DB2', temp)
      }

      apiGroup()
    }
  },
  modules: {}
})
