<template>
  <div class="into" v-if='get_data'>
    <div class="pic">
      <img v-if="get_show_data.imageURL" :src="get_show_data.imageURL" alt="" />
    </div>
    <div class="into">
      <h2 class="title">{{ get_show_data.title }}</h2>
      <h3 class="des"><span>主辦單位：</span>{{ get_show_data.showUnit }}</h3>
      <h3 class="des">
        <a :href="get_show_data.webSales">活動連結<i class="gg-link"></i></a>
      </h3>
      <div class="into_box">
        <div class="into_item">
          <i class="gg-pin"></i>{{ get_show_data.showInfo[0].location }}
        </div>

        <div class="into_item">
          <i class="gg-calendar-dates"></i>開始時間 :
          {{ get_show_data.showInfo[0].time }}
        </div>
        <div class="into_item">
          <i class="gg-calendar-dates"></i>結束時間 :
          {{ get_show_data.showInfo[0].endTime }}
        </div>
      </div>
      <div class="into_des">
        <p>
          {{ get_show_data.descriptionFilterHtml }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['propsID'],

  computed: {
    get_data () {
      return this.$store.state.db
    },
    get_show_data () {
      return this.get_data.find(item => item.UID === this.propsID)
    }
  }
}
</script>

<style lang="scss">
@import '../scss/base';

.pic {
  text-align: center;
  margin-bottom: 24px;
}
.into {
  background-color: #fff;
  padding: 20px 30px;
  margin-bottom: 40px;
  @media (max-width: 991px) {
    padding: 20px;
  }
  .title {
    margin-bottom: 25px;
    font-size: 3.6rem;
    color: $main-color;
    font-weight: 700;
    line-height: 1.25;
  }
  .des {
    font-size: 1.6rem;
    color: $g_color_1;
    margin-bottom: 10px;
    span {
      font-weight: 700;
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
    margin: 24px 0;
    font-size: 0;
  }
  .into_item {
    padding: 8px 0;
    font-size: 1.6rem;
    color: $g_color_1;
    i {
      display: inline-block;
      color: #000;
      vertical-align: middle;
      margin-right: 8px;
    }
  }
}
.back {
  text-align: center;
  a {
    display: inline-block;
    padding: 8px 24px;
    background-color: #fff;
  }
}
</style>
