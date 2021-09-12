<template>
  <div id="app" v-if="isloadend">

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
  methods: {},
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
