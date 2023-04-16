<template>
  <div style="display: flex">
    <div>
      <div style="margin-top: 100px" @click="changeFileToOutLine">切换树和大纲</div>
      <div>新建文件</div>
      <div>新建文件夹</div>
    </div>
    <div class="area-sidebar">
      <FileNav :navItems="data" v-if="isFile"></FileNav>
      <OutLine :items="titles" v-if="!isFile"></OutLine>
    </div>
  </div>
</template>

<script>

import FileNav from '@/renderer/components/sideBar/FileNav'
import OutLine from '@/renderer/components/sideBar/OutLine'
import { ref } from 'vue'
import bus from 'vue3-eventbus'

export default {
  name: 'SideBar',
  components: { OutLine, FileNav },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup () {
    const isFile = ref(true)
    const titles = ref([]) // root的children

    function changeFileToOutLine () {
      isFile.value = !isFile.value
      // if (!isFile.value) {
      //   // 通知header调用openOutLine，似乎不需要
      // }
    }

    bus.on('openOutLine', (obj) => {
      titles.value = obj
      console.log('修改了前端大纲', titles.value)
    })

    return {
      isFile,
      titles,
      changeFileToOutLine
    }
  }
}
</script>

<style scoped>

</style>
