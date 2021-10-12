const list = {
  template: `<div class="list_page">
  <div v-if="getStore">
    <aside class="aside">
      <div class="item">
        <label for="city">請選擇城市</label>
        <select name="city" id="city"  v-model="choose.city">
        <option value="全部" >全部</option>
          <option :value="n" v-for="n in tCity">{{n}}</option>
        </select>
      </div>

      <div class="item">
      <label for="unit">請選擇主辦單位</label>
      <select name="unit" id="unit"  v-model="choose.unit">
        <option value="全部" >全部</option>
        <option :value="n" v-for="n in getUnit">{{n}}</option>
      </select>
    </div>

      <div class="item">
        <label for="start">請選擇起始時間</label>
        <input type="date" id="start" v-model="choose.start">
      </div>

      <div class="item">
        <label for="end">請選擇結束時間</label>
        <input type="date" id="end"  v-model="choose.end">
      </div>
      

    </aside>
    <main>
      <ul>
        <li v-for="item in filterList" :key="item.UID">
          <h3>{{item.title}}</h3>

          <p>
            <b>主辦單位 : </b>{{item.showUnit}}
          </p>
          <p>
            <b>活動地址 : </b>{{item.showInfo[0].location}}
          </p>
          <p>
            <b>活動時間 : </b>{{item.showInfo[0].time}} ~ {{item.showInfo[0].endTime}}
          </p>
          <p>
            <b>活動介紹 : </b>{{item.descriptionFilterHtml | cuttext}}<span v-if="item.descriptionFilterHtml">...</span>
          </p>
          <a :href="item.webSales" target="_blank">連結網址</a>
          <br>
          <br>
          <a href="javascript:;" @click="todetail(item.UID)">查看活動細節</a>
        </li>
      </ul>
    </main>
</div>
<div v-else>loading</div>

  </div>`,
  data() {
    return {
      choose: {
        city: '全部',
        unit: "全部",
        start: null,
        end: null
      },
      tCity: ["基隆市", "宜蘭縣", "臺北市", "新北市", "桃園市", "新竹縣", "新竹市", "苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣", "嘉義縣", "嘉義市", "臺南市", "高雄市", "屏東縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣", ]
    }
  },
  computed: {
    getStore() {
      return this.$store.state.apiDate
    },
    getUnit() {
      if (this.getStore) {
        let arr = []
        this.getStore.forEach(element => {
          element.masterUnit.forEach(item => {
            if (item) {
              arr.push(item)
            }
          })
        });
        return new Set(arr)
      }
    },
    allID() {
      if (this.getStore) {
        let arr = []
        this.getStore.forEach(item => {
          arr.push(item.UID)
        })
        return arr
      }
    },
    filterCityID() {
      if (this.getStore) {
        if (this.choose.city == "全部") {
          return this.allID
        } else {
          let arr = []
          this.getStore.forEach(item => {
            if (item.showInfo[0].location.indexOf(this.choose.city) > -1) {
              arr.push(item.UID)
            }
          })
          return arr
        }
      }
    },
    filterUnitID() {
      if (this.getStore) {
        if (this.choose.unit == "全部") {
          return this.allID
        } else {
          let arr = []
          this.getStore.forEach(item => {
            if (item.masterUnit.indexOf(this.choose.unit) > -1) {
              arr.push(item.UID)
            }
          })
          return arr
        }
      }
    },
    filterStartID() {
      if (this.getStore) {
        if (!this.choose.start) {
          return this.allID
        } else {
          // let filterTime = Date.parse(this.choose.start)
          let filterTime = new Date(this.choose.start).getTime() + 24 * 60 * 60 *60
          let arr = []
          this.getStore.forEach(item => {
            if (new Date(item.showInfo[0].time).getTime() < filterTime) {
              arr.push(item.UID)
            }
          })
          return arr
        }
      }
    },
    filterEndID() {
      if (this.getStore) {
        if (!this.choose.end) {
          return this.allID
        } else {
          let filterTime =new Date(this.choose.end).getTime()
          let arr = []
          this.getStore.forEach(item => {
            if (new Date(item.showInfo[0].endTime).getTime() > filterTime) {
              arr.push(item.UID)
            }
          })
          return arr
        }
      }
    },
    filterALLID() {
      if (this.getStore) {
        let arr = []
        this.allID.forEach(item => {
          if (this.filterCityID.includes(item) &&
            this.filterUnitID.includes(item) &&
            this.filterStartID.includes(item) &&
            this.filterEndID.includes(item)) {
            arr.push(item)
          }
        })
        return arr

      }
    },
    filterList() {
      if (this.getStore) {
        let arr = []
        this.getStore.forEach(item => {
          this.filterALLID.forEach(id => {
            if (item.UID === id) {
              arr.push(item)
            }
          })
        })
        return arr
      }
    }
  },
  methods: {
    todetail(id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  mounted() {
    this.$store.dispatch('sendAPI')
  }
}


const detail = {
  template: `
  <div class="detail_page">
    <div  v-if="getShowDatw">
      <h3>{{getShowDatw.title}}</h3>
      <p>
        <b>主辦單位 : </b>{{getShowDatw.showUnit}}
      </p>
      <p>
        <b>活動地址 : </b>{{getShowDatw.showInfo[0].location}}
      </p>
      <p>
        <b>活動時間 : </b>{{getShowDatw.showInfo[0].time}} ~ {{getShowDatw.showInfo[0].endTime}}
      </p>
      <p>
        <b>活動介紹 : </b>{{getShowDatw.descriptionFilterHtml}}
      </p>
      <a :href="getShowDatw.webSales" target="_blank">連結網址</a>
      <br>
      <br>
      <button @click="goback">回上一頁</button>
    </div>
    <div v-else>loading</div>
  </div>`,
  computed: {
    getUID() {
      return this.$route.params.id
    },
    getStore() {
      return this.$store.state.apiDate
    },
    getShowDatw() {
      if(this.getStore){
        const indexNum = this.getStore.findIndex(item => {
            return item.UID === this.getUID
          })
          return this.getStore[indexNum]
      }

    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.$store.dispatch('sendAPI')
  }
}


const routes = [{
    path: '/',
    component: list
  },
  {
    path: '/detail/:id',
    component: detail
  }
]

const router = new VueRouter({
  routes
})


const store = new Vuex.Store({
  state: {
    apiDate: null
  },
  actions: {
    sendAPI(context) {
      fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6').then(res => {
        return res.json()
      }).then(result => {
        context.state.apiDate = result
      })
    }
  }
})

Vue.filter("cuttext", function (value) {
  return value.slice(0, 100)
})
new Vue({
  el: "#app",
  router,
  store,
  data() {
    return {
      isloading: true
    }
  },

})