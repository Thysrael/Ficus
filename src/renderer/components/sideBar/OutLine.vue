<template>
  <div class="text-gray-600 text-sm h-full overflow-auto">
    <ul class="space-y-1" v-if="items !== undefined && items.length !== 0">
      <OutLineItem
          :item="item"
          v-for="(item, index) in items"
          :key="index"
          @click="getIndex(index, item)"
          class="py-1 pl-2"
      />
    </ul>
    <div v-if="items === undefined || items.length === 0">
      <div style="font-size: 13px; font-family: 'Noto Sans SC'" class="pl-2">
        大纲内容为空。
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
::-webkit-scrollbar {
  width: 5px;
  border-radius: 8px;

}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #b7b7b7;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #777777;
}
</style>
