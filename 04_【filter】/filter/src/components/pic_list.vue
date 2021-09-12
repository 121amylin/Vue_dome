<template>
  <div class="pic_list_area" v-if="get_data">
    <!-- {{ get_now_city }}
    {{ filter_list }} -->
    <!-- <ul class="list">
      <li class="item" v-for="item in filter_list" :key="item.UID">
        <a class="flex" href="#" @click.prevent="tointo(item.UID)">
          <div class="pic">
            <img v-if="item.imageURL" :src="item.imageURL" alt="" />
            <img v-else src="../assets/temp_pic.png" alt="" />
          </div>
          <div class="text">
            <h2 class="title">{{ item.title }}</h2>
            <div class="into_des">
              <p>
                {{ trimIInto(item.descriptionFilterHtml) }}
              </p>
            </div>
            <h3 class="des"><span>主辦單位：</span>{{ item.showUnit }}</h3>
            <div class="into_box">
              <div class="into_item">
                <i class="gg-pin"></i>活動位置 : {{ item.showInfo[0].location }}
              </div>
              <div class="into_item">
                <i class="gg-calendar-dates"></i>開始時間 :
                {{ item.showInfo[0].time }}
              </div>
              <div class="into_item">
                <i class="gg-calendar-dates"></i>結束時間 :
                {{ item.showInfo[0].endTime }}
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul> -->
  </div>
</template>
<script>
export default {
  computed: {
    get_data () {
      return this.$store.state.db
    },
    get_now_city () {
      return this.$store.state.now_city
    },
    get_first_data () {
      return this.$store.state.first_data
    },

    filter_list () {
      return this.get_data.filter(item => {
        return item.showInfo[0].location.indexOf(this.get_now_city)
      })[0]
      // const arr = []

      // if (this.get_now_city === '全部') {
      //   for (let i = this.get_first_data; i < 10; i++) {
      //     arr.push(this.get_data[i])
      //   }
      // } else {
      //   const tempArr = this.get_data.filter(item => {
      //     return item.showInfo[0].location.indexOf(this.get_now_city)
      //   })
      //   for (let i = this.get_first_data; i < 10; i++) {
      //     arr.push(tempArr[i])
      //   }
      // }

      // return arr
    }
  },
  methods: {
    trimIInto (str) {
      return str.slice(1, 50) + '...'
    },
    tointo (id) {
      this.$router.push(`/show/${id}`)
    }
  }
}
</script>

<style lang="scss">
@import '../scss/base';

.pic_list_area {
  .list {
    padding-left: 0;
    list-style: none;
  }
  .item {
    background-color: #fff;
    padding: 24px 20px;
    + .item {
      margin-top: 24px;
    }
  }
  .pic {
    width: 28%;
    @media (max-width: 768px) {
      width: 100%;
    }
    img {
      display: block;
      max-width: 200px;
      margin: auto;
    }
  }
  .text {
    width: 72%;
    padding-left: 20px;
    @media (max-width: 768px) {
      width: 100%;
      padding-left: 0;
    }
    .title {
      margin-bottom: 16px;
      font-size: 2.4rem;
      color: $main-color;
      line-height: 1.25;
    }
    .into_des {
      margin-bottom: 10px;
    }
    .des {
      margin: 4px 0;
      font-size: 1.6rem;
      color: $g_color_1;
      span {
        color: #000;
      }
      a {
        color: $main-color;
        i {
          display: inline-block;
          margin-left: 12px;
          color: $g_color_1;
          vertical-align: middle;
        }
      }
    }
    .into_box {
      margin: 12px 0;
      @media (max-width: 768px) {
        flex-wrap: wrap;
      }
      .into_item {
        color: $g_color_1;
        margin: 8px 0;
        @media (max-width: 768px) {
          width: 100%;
          + .into_item {
            margin-top: 10px;
          }
        }
        i {
          display: inline-block;
          margin-right: 8px;
          color: #000;
        }
      }
    }
  }
}
</style>
