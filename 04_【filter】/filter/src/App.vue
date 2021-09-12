<template>
  <div id="app" v-if="isloadend">
    <!-- <div id="nav">
      <router-link to="/">list</router-link> |
      <router-link to="/show/123">more</router-link>
    </div> -->
    <myheader></myheader>
    <div class="main">
      <div class="container flex">
        <myaside></myaside>
        <div id="content"><router-view /></div>
      </div>
    </div>
  </div>
</template>
<script>
import myheader from '@/components/header.vue'
import myaside from '@/components/aside.vue'

export default {
  components: { myheader, myaside },
  data () {
    return {
      isloadend: false
    }
  },
  created () {
    this.$store.dispatch('get_API')
  },
  mounted () {
    if (this.$store.state) {
      this.isloadend = true
    }
  }
}
</script>
