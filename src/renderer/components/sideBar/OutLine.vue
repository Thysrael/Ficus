<template>
  <div class="text-gray-600 text-sm">
    <ul class="space-y-1" v-if="items !== undefined && items.length !== 0">
      <OutLineItem
          :item="item"
          v-for="(item, index) in items"
          :key="index"
          @click="getIndex(index, item)"
      />
    </ul>
    <div v-if="items === undefined || items.length === 0">
      <div style="font-size: 12px">
        大纲内容为空
      </div>
    </div>
  </div>
</template>

<script>

import OutLineItem from '@/renderer/components/sideBar/OutLineItem'
import bus from 'vue3-eventbus'
export default {
  name: 'OutLine',
  components: { OutLineItem },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup () {
    let titles = []

    bus.on('addToTitles', (index) => {
      titles.unshift(index)
    })

    function getIndex (index, item) {
      titles.unshift(index)
      for (let i = titles.length; i < 6; i++) {
        titles.push(-1)
      }
      console.log(titles)
      bus.emit('scrollToHeading', { info: titles })
      titles = []
    }

    return {
      getIndex
    }
  }
}
</script>

<style scoped>

</style>
