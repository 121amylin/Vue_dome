const into={
  template:`<div class="container">

    <div class="into_area">
      <div class="pic">
        <img :src="pdate[0].cover" alt="" />
      </div>
      <div class="text">
        <h2 class="area_tit">{{pdate[0].name}}</h2>
        <p><strong>Genres</strong>{{pdate[0].Genres}}</p>

        <p><strong>Author</strong>{{pdate[0].Author}}</p>
        <p><strong>Status</strong>{{pdate[0].Status}}</p>
        <p class="rate"><strong>Rate</strong>{{pdate[0].Rate}}</p>
        <p><strong>Summary</strong></p>
        <p>{{pdate[0].Summary}}</p>
      </div>
    </div>
    <div class="list_area">
      <h3 class="area_tit">All Chapters</h3>
      <ul class="list">
        <li v-for="(item,index) in pdate[0].Chapter">
          <a href="#" @click.prevent="topage([pdate[0].seriesName,index])">Chapters {{index+1}} : {{item}}</a>
        </li>
      </ul>
    </div>
  
  
  
  </div>`,
  props:["pdate"],
  methods:{
    topage(props){
      let [seriesName,index]=props
      this.$router.push(`/pages/${seriesName}`)
      this.$emit("emit_change_chapter",index)
    }
  }
}
const page={
  template:`
    <div class="container">
        <div class="choose">
          <h3>{{pdate[0].name}}</h3>

          <select v-model="props_chapter">
            <option :value="i.part" v-for="i in pdate[0].chapter" :key="i.id">
              chapter{{i.part}}
            </option>
          </select>
          <select v-model="now_page">
            <option :value="j" v-for="j in get_page" :key="j">page{{j}}</option>
          </select>
          <div class="btn_area">
            <a href="#" v-if="props_darkmode" class="gg-sun" @click.prevent="changemode"></a>
            <a href="#" v-else class="gg-moon"  @click.prevent="changemode"></a>
          </div>
        </div>
        <div class="picture_area">
          <div class="show_pic pic_box">
            <div class="pic">
              <img :src="get_show_pic" alt="" />
            </div>
            <a href="#" class="btn prev_btn" @click.prevent="changepage('-1')"></a>
            <a href="#" class="btn next_btn" @click.prevent="changepage('+1')"></a>
          </div>
          <div class="choose_pic pic_box" ref="pic_box">
            <a @click.prevent="changepage(n)" v-for="n in get_page" :class="[n==now_page?'active':'']" ref="pic">
              <img :src="get_choose_pic(n)" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  props:["pdate","props_chapter" ,"props_darkmode"],
  data() {
    return {
      now_page:1,
    }
  },
  computed:{
    get_page(){
      return this.pdate[0].chapter[this.props_chapter-1].page
    },
    get_show_pic(){
      return `images/${this.pdate[0].seriesName}_${this.props_chapter}-${this.now_page}.png`
    },
    get_max_page(){
        return this.pdate[0].chapter[this.props_chapter-1].page
    },
    get_pic_size(){
      return this.$refs.pic.length
    }
  },
  methods:{
    get_choose_pic(n){
      return `images/${this.pdate[0].seriesName}_${this.props_chapter}-${n}.png`
    },
    changepage(num){
      if(num=="+1"){
        if(this.now_page>=this.get_max_page){
          this.now_page=1
        }else{
          this.now_page++
        }
      }else if(num=="-1"){
        if(1>=this.now_page){
          this.now_page=this.get_max_page
        }else{
          this.now_page--
        }
      }else{
        this.now_page=num*1
      }
      let scroll_box=this.$refs.pic_box
      let scroll_l=(scroll_box.scrollWidth-scroll_box.offsetWidth)/this.get_page
      if(this.now_page==1){
        scroll_box.scrollLeft=0
      }else{
        scroll_box.scrollLeft=scroll_l*this.now_page
      }
    },
    changemode(){
      this.$emit('emit_change_mode')
    }
  }
}
const routes=[{
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: into
  },
  {
    path: '/into',
    component: into
  },
  {
    path: '/pages/:id',
    component: page
  }]
const router=new VueRouter({
  routes
})

new Vue({
  router,
  el:'#app',
  data() {
    return {
      now_chapter:1,
      is_darkMode:false,
      comic:[
        {
          id:0,
          seriesName:'my_hexschool',
          name:'My Hexschool',
          Genres:'Fusce/vehicula/dolor',
          Author:'Namae Shiranai',
          Status:'Ongoing',
          Rate:'4',
          Summary:'If your banker breaks, you snap; if your apothecary by mistake sends you poison in your pills, you die. Therefore, I say, I saw that this situation of mine was the precise situation of every mortal that has this Siamese connexion with a plurality of other mortals.',
          Chapter: ['The F2E Challenge Start!','Todo List is Going Crazy!'],
          cover:'images/comic cover.png',
          ad:['ad-1.png','ad-2.png','ad-3.png'],
          chapter:[
            { id:0,
              part:1,
              page:5
            },
            { id:1,
              part:2,
              page:7
            }
          ]
        }
      ]
    }
  },
  components:{
    into,
    page
  },
  methods:{
    change_chapter(num){
      console.log(num)
      this.now_chapter=num+1
    },
    change_mode(){
      this.is_darkMode=!this.is_darkMode
    }
  },
  computed:{
    get_page(){
      return this.comic[0].chapter[this.now_chapter-1].page
    },
    get_show_pic(){
      return `images/${this.comic[0].seriesName}_${this.now_chapter}-${this.now_page}.png`
    },
    get_choose_pic(){
      return `images/${this.comic[0].seriesName}_${this.now_chapter}-`
    }
  }
})