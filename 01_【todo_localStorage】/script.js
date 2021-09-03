new Vue({
  el: "#app",
  data() {
    return {
      isdark_mode: false,
      value_enter: '',
      filter_class: 'all',
      list: []
    }
  },
  computed: {
    in_all() {
      return (this.filter_list.filter(item => {
        return item.complete === false
      })).length
    },
    filter_list() {
      let temp = []
      if (this.filter_class === "all") {
        temp = this.list
      } else if (this.filter_class === "active") {
        temp = this.list.filter(item => {
          return item.complete === false
        })
      } else if (this.filter_class === "complete") {
        temp = this.list.filter(item => {
          return item.complete === true
        })
      } else {
        alert("系統錯誤，沒有這個選項")
        temp = this.list
      }
      return temp
    }
  },
  methods: {
    change_filter_class_handle(cls) {
      this.filter_class = cls
    },
    change_complete_handle(id) {
      this.list.filter(item => {
        if (item.id === id) {
          item.complete = !item.complete
        }
        this.update_localStorage()
        return
      })
    },
    add_item_handle() {
      if (this.value_enter !== "") {
        this.list.push({
          id: new Date().getTime(),
          content: this.value_enter,
          complete: false
        })
        this.value_enter = ''
        this.update_localStorage()
      } else {
        alert("請輸入新增事項")
      }
    },
    delete_ID_handle(item) {
      let temp_point = 0
      let max = this.list.length
      for (i = 0; i < max; i++) {
        if (this.list[i].id === item) {
          break
        } else {
          temp_point++
        }
      }
      this.list.splice(temp_point, 1)
      this.update_localStorage()
    },
    delete_all_complete_handle() {
      let temp_arr = []
      temp_arr = this.list.filter(item => {
        return item.complete === false
      })
      this.list = temp_arr
      this.update_localStorage()
    },
    change_mode_handle() {
      this.isdark_mode = !this.isdark_mode
    },
    update_localStorage() {
      localStorage.setItem("list", JSON.stringify(this.list))
    }
  },
  mounted() {
    let localStorage_list = localStorage.getItem("list") || []
    this.list = JSON.parse(localStorage_list)
  }
})