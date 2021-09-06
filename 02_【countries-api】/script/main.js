const into = {
  props: ['all_list', "peee"],
  template: `<div class="into_area">
    <div class="container">
      <a href="#" class="backbtn"  @click.prevent="goback">回上一頁</a>
      <div class="into">
        <div class="pic">
          <img :src="showNow.flag" alt="">
        </div>
        <div class="text">
          <h3>{{showNow.name}}</h3>
          <p>國家名稱 : <span>{{showNow.nativeName}}</span> </p>
          <p>蛋黃區 : <span v-for="i in showNow.topLevelDomain">{{i}}</span></p>
          <p>人口 :  <span>{{showNow.population}}</span>  </p>
          <p>貨幣 :  <span v-for="i in showNow.currencies">{{i.name}}</span></p>
          <p>地區 :  <span>{{showNow.region}}</span> </p>
          <p>官方語言 : <span v-for="i in showNow.languages">{{i.name}}</span> </p>
          <p>次區域 :  <span>{{showNow.subregion}}</span>  </p>
          <p>首都 :  <span>{{showNow.capital}}</span> </p>
          <p v-show="showNow.borders.length>0">鄰近國家 : <span v-for="i in showNow.borders">{{i}}</span></p>
        </div>
      </div>
    </div>
  </div>
  `,
  computed: {
    allItem() {
      let arr = []
      this.all_list.forEach(item => {
        arr.push(...item.itemlist)
      })
      return arr
    },
    showNow() {
      return this.allItem.find(item => {
        return item.name === this.$route.params.id
      })
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}



const list = {
  props: ["all_list"],
  data() {
    return {
      nowClass: "all",
      searchText: ''
    }
  },
  template: `<div>

  <div class="choose_area">
    <div class="container">
      <label for="" class="search">
        <i class="zoom-in"></i>
        <input type="text" name="" id="" v-model="searchText" placeholder="請輸入國家名稱">
      </label>
      <select v-model="nowClass">
        <option value="" disabled>請選擇洲別</option>
        <option value="all">全部</option>
        <option :value="item.class" v-for="item in all_list" :key="item.class">
          {{item.class}}
        </option>
      </select>
    </div>
  </div>
  
  <div class="list_area">
    <div class="container">
      <ul class="list">
        <li v-for="item in filterInput" :key="item.name">      
          <a href="#" @click.prevent="tointoHandle(item.name)">
            <div class="pic">
              <img :src="item.flag" alt="">
            </div>
            <div class="text">
              <h3>{{item.name}}</h3>
              <p>人口 : {{item.population}} </p>
              <p>地區 : {{item.region}} </p>
              <p>首都 : {{item.capital}}</p>
            </div>
          </a> 
        </li>
      </ul>
    </div>
  </div>
  
  </div>`,
  computed: {
    allItem() {
      let arr = []
      this.all_list.forEach(item => {
        arr.push(...item.itemlist)
      })
      return arr
    },
    filterClass() {
        if (this.nowClass === "all") {
          return this.allItem
        } else {
          let temp = this.all_list.filter(item => {
            return item.class === this.nowClass
          })
          return temp[0].itemlist
        }
    },
    filterInput(){
      if(!this.searchText){
        return this.filterClass
      }else{
        return this.filterClass.filter(item=>{
          return item.name.toLowerCase().indexOf(this.searchText.toLowerCase())!==-1
        })
      }
    }
  },
  methods: {
    changenowClassHandle(value) {
      this.nowClass = value
    },
    tointoHandle(id) {
      this.$router.push(`/into/${id}`)
    }
  },
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
    component: list
  },
  {
    path: '/into/:id',
    component: into
  },
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
    }
  },
  methods: {
    changeModeHandle() {
      this.isdarkMode = !this.isdarkMode
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