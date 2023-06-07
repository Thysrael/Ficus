<template>
  <div class="flex justify-between text-gray-600 text-sm pl-2 relative" v-if="mode !== -1">
    <ul class="space-y-1 w-full overflow-y-auto" v-if="items !== undefined && items.length !== undefined && items.length !== 0">
      <OutLineItem
          :item="item"
          v-for="(item, index) in items"
          :key="index"
          @click="getIndex(item)"
      />
    </ul>
    <div v-if="items === undefined || items.length === undefined || items.length === 0">
      <div style="font-size: 12px; font-family: 'Noto Sans SC'" class="pl-1">
        大纲内容为空。
      </div>
    </div>
  </div>
  <div v-if="mode === -1">
    <button @click="handleOpenFile"
            class="openFolderBtn">
      打开文件
    </button>
  </div>
</template>

<script>

import OutLineItem from '@/renderer/components/sideBar/OutLineItem'
import bus from 'vue3-eventbus'
import store from '@/renderer/store'
import { computed } from 'vue'
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
    let titles = [-1, -1, -1, -1, -1, -1]
    const mode = computed(() => {
      return store.getters.getMode
    })

    bus.on('addToTitles', (child) => {
      titles[child.level - 1] = child.id
    })

    function getIndex (item) {
      titles[item.level - 1] = item.id
      bus.emit('scrollToHeading', { info: titles })
      titles = [-1, -1, -1, -1, -1, -1]
    }

    function handleOpenFile () {
      bus.emit('cmd::execute', { id: 'file.open-file' })
    }

    return {
      handleOpenFile,
      getIndex,
      mode
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

.openFolderBtn {
  margin-left: 10px;
  margin-top: 10px;
  width: 80%;
  height: 25px;
  border-radius: 3px;
  opacity: 1;
  background-color: #42b983;
  font-size: 13px;
  color: #FFFFFF
}

.openFolderBtn:hover {
  background-color: #19734b;
  -webkit-transition: .2s;
  -webkit-transition:left .2s, background-color .2s;
}

.openFolderBtn:active {
  background-color: #3D3D3D;
}
</style>
