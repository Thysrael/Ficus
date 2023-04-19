<template>
  <div class="text-gray-600 text-sm">
    <ul class="space-y-1" v-if="items.length !== 0">
      <OutLineItem
          :item="item"
          v-for="(item, index) in items"
          :key="index"
      />
    </ul>
    <div v-if="items.length === 0">
      <div style="font-size: 12px">
        大纲内容为空
      </div>
    </div>
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
