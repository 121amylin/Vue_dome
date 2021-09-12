import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db: null
  },
  mutations: {
    GET_DB (state, date) {
      state.db = date
    }
  },
  actions: {
    get_API (store) {
      axios
        .get(
          'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
        )
        .then(res => {
          store.commit('GET_DB', res.data)
        })
    }
  },
  modules: {}
})
