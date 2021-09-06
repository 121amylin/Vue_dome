const list = {
  template: `<div>list</div>`
}
const into = {
  template: `<div>
  

  <div class="choose_area">
  <div class="container">
    <label for="" class="search">
      <i class="zoom-in"></i>
      <input type="text" name="" id="">
    </label>
    <select v-model="nowClass">
      <option value="" disabled>請選擇洲別</option>
      <option value="all">全部</option>
      <option :value="item.class" v-for="item in datalist" :key="item.class">
        {{item.class}}
      </option>
    </select>
  </div>
</div>
  
  
  
  
  </div>`
}
const routes = [{
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: list
  },
  {
    path: '/into',
    component: into
  },
  {
    path: '/into/:id',
    component: into
  },
  // { path: '/into/:id', component: into }
]
const router = new VueRouter({
  routes
})


new Vue({
  router,
  el: '#app',
  data() {
    return {
      datalist: null,
      isdarkMode: false,
      nowClass: "all"
    }
  },
  computed: {
    filterClass() {
      if (this.nowClass === "all") {
        let arr = []
        this.datalist.forEach(item => {
          arr.push(...item.itemlist)
        })
        return arr
      } else {
        let temp = this.datalist.filter(item => {
          return item.class === this.nowClass
        })
        return temp[0].itemlist
      }
    },
  },
  methods: {
    changeModeHandle() {
      this.isdarkMode = !this.isdarkMode
    },
    changenowClassHandle(value) {
      this.nowClass = value
    }
  },
  mounted() {
    fetch('https://restcountries.eu/rest/v2/all').then((res) => {
      return res.json()
    }).then(resulte => {
      let tempclass = []
      let point = 0

      resulte.forEach(item => {
        if (tempclass.indexOf(item.region) == -1 && item.region !== "") {
          tempclass.push(item.region)
        }
      });
      tempclass.sort()
      let itemArr = tempclass.map(item => {
        return {
          id: point++,
          class: item,
          itemlist: []

        }
      })
      resulte.forEach(item => {
        itemArr.forEach(itemArr => {
          if (item.region === itemArr.class) {
            itemArr.itemlist.push(item)
          }
        })
      })

      this.datalist = itemArr

    })

  }
})