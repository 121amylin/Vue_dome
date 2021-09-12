<template>
  <div class="show" v-if="isloadend">
    <into :propsID="get_id"></into>
  </div>
</template>

<script>
import into from '@/components/into.vue'

export default {
  name: 'show',
  components: { into },
  data () {
    return { isloadend: false }
  },

  computed: {
    get_data () {
      return this.$store.state.db
    },
    get_id () {
      return this.$route.params.id
    }
  },
  mounted () {
    if (this.$store.state) {
      this.isloadend = true
    }
  }
}
</script>
