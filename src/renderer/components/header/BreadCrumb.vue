<template>
  <div class="text-gray-600 text-sm">
    <ol class="list-none p-0 inline-flex">
      <BreadCrumbItem
          :show="show"
          :item="items[0]"
      />
    </ol>
  </div>
</template>

<script>
import BreadCrumbItem from '@/renderer/components/header/BreadCrumbItem'
import { ref } from 'vue'
import bus from 'vue3-eventbus'

export default {
  name: 'BreadCrumb',
  components: { BreadCrumbItem },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup () {
    const show = ref(false)
    bus.on('changeShow', () => {
      show.value = !show.value
    })
    return {
      show
    }
  }
}
</script>
