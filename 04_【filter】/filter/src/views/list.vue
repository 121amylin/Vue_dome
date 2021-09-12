<template>
  <div class="list" v-if="isloadend">
    <piclist :props_list_data="get_10"></piclist>
    <pages></pages>
  </div>
</template>

<script>
import piclist from '@/components/pic_list.vue'
import pages from '@/components/pages.vue'

export default {
  name: 'list',
  components: { piclist, pages },
  data () {
    return {
      isloadend: false,
      first_data: 0
    }
  },
  computed: {
    get_data () {
      return this.$store.state.db
    },
    get_10 () {
      const arr = []
      for (let i = this.first_data; i < 10; i++) {
        arr.push(this.get_data[i])
      }
      return arr
    }
  },
  mounted () {
    if (this.$store.state) {
      this.isloadend = true
    }
  }
}
</script>
