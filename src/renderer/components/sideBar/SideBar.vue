<template>
  <div style="display: flex">
    <div>
      <div style="margin-top: 100px" @click="changeFileToOutLine">切换树和大纲</div>
      <div>新建文件</div>
      <div>新建文件夹</div>
    </div>
    <div class="area-sidebar" v-contextmenu:contextmenu @contextmenu="handleRightClick($event)">
      <FileNav :navItems="data" v-if="isFile" :selected="selected"></FileNav>
      <OutLine :items="titles" v-if="!isFile"></OutLine>
    </div>
  </div>
  <v-contextmenu ref="contextmenu">
    <v-contextmenu-item>菜单1</v-contextmenu-item>
    <v-contextmenu-item>菜单2</v-contextmenu-item>
    <v-contextmenu-item>菜单3</v-contextmenu-item>
  </v-contextmenu>
</template>

<script>

import FileNav from '@/renderer/components/sideBar/FileNav'
import OutLine from '@/renderer/components/sideBar/OutLine'
import { getCurrentInstance, ref, watch } from 'vue'
import { directive, Contextmenu, ContextmenuItem } from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'
import bus from 'vue3-eventbus'
import { useStore } from 'vuex'

export default {
  name: 'SideBar',
  directives: {
    contextmenu: directive
  },
  components: {
    OutLine,
    FileNav,
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup () {
    const isFile = ref(true)
    const titles = ref([]) // root的children
    const selected = ref([]) // 存储被选中的对象
    const store = useStore()
    const TabXY = ref({ x: -1, y: -1 })
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx

    console.log(proxy, _this)

    watch(() => store.state.xy, (newValue, oldValue) => {
      const temp = TabXY.value.x + '+' + TabXY.value.y
      if (store.getters.getXY !== temp) {
        _this.$refs.contextmenu.hide()
      }
    })

    bus.on('addToSelected', (obj) => {
      selected.value.push(obj)
    })

    bus.on('newSelected', (obj) => {
      selected.value.length = 0
      selected.value.push(obj)
      console.log('newSelected ', selected.value)
    })

    bus.on('deleteFromSelected', (index) => {
      selected.value.splice(index, 1)
    })

    function changeFileToOutLine () {
      isFile.value = !isFile.value
      // if (!isFile.value) {
      //   // 通知header调用openOutLine，似乎不需要
      // }
    }

    function handleRightClick (e) {
      TabXY.value = { x: e.clientX, y: e.clientY }
      store.dispatch('updateXY', TabXY.value)
    }

    bus.on('openOutLine', (obj) => {
      titles.value = obj
      console.log('修改了前端大纲', titles.value)
    })

    return {
      isFile,
      titles,
      selected,
      handleRightClick,
      changeFileToOutLine
    }
  }
}
</script>

<style scoped>

</style>
