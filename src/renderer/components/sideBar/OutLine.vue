<template>
  <div class="text-gray-600 text-sm">
    <ul class="space-y-1">
      <OutLineItem
          :item="item"
          v-for="(item, index) in items"
          :key="index"
      />
    </ul>
  </div>
</template>

<script>

import OutLineItem from '@/renderer/components/sideBar/OutLineItem'
export default {
  name: 'OutLine',
  components: { OutLineItem },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
