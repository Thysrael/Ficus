<template>
  <div class="text-gray-600 text-sm flexStyle">
    <ul class="space-y-1 w-full overflow-x-hidden overflow-y-auto" v-if="navItems.length !== 0">
      <FileNavItem
          :topItem="navItems[0]"
          :selected="selected"
          :init="true"
          :item="navItem"
          v-for="(navItem, index) in navItems"
          :key="index"
      />
    </ul>
    <div v-if="navItems.length === 0" style="width: 100%;">
      <div style="display: flex; font-size: 13px" class="items-center content-center">
        <p class="pl-2">
          无打开的文件夹。
        </p>
      </div>
      <button @click="handleOpenDir"
              class="openFolderBtn">
        打开文件夹
      </button>
    </div>
  </div>
</template>

<script>

import FileNavItem from '@/renderer/components/sideBar/FileNavItem'
import bus from 'vue3-eventbus'

export default {
  name: 'FileNav',
  components: {
    FileNavItem
  },
  props: {
    selected: {
      type: Array,
      required: true
    },
    navItems: {
      type: Array,
      required: true
    }
  },
  setup () {
    async function handleOpenDir () {
      bus.emit('cmd::execute', { id: 'file.open-folder' })
    }

    async function handleOpenFile () {
      bus.emit('cmd::execute', { id: 'file.open-file' })
    }

    return {
      handleOpenDir,
      handleOpenFile
    }
  }
}
</script>

<style scoped>
.flexStyle {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  /* 设置超出滚动 */
  overflow-x: hidden;
  overflow-y: auto;
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
