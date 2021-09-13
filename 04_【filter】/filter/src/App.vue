<template>
  <div id="app" v-if="isloadend">
    <myheader></myheader>
    <div class="main">
      <div class="container flex">
        <myaside></myaside>
        <!-- <div id="content"><router-view /></div> -->
        {{ get_10 }}
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
    this.$store.dispatch('get_API_group')
  },
  mounted () {
    if (this.$store.state) {
      this.isloadend = true
    }
  },
  computed: {
    get_data () {
      return this.$store.state.db2
    },
    get_10 () {
      const arr = []
      for (let i = 0; i < 10; i++) {
        arr.push(this.get_data[i])
      }
      return arr
    }
  }
}
</script>
