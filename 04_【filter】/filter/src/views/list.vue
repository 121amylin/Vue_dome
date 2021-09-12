<template>
  <div class="list">
    <piclist></piclist>
    <pages></pages>
  </div>
</template>

<script>
import piclist from '@/components/pic_list.vue'
import pages from '@/components/pages.vue'

export default {
  name: 'list',
  components: { piclist, pages }
}
</script>
