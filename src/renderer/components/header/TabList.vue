<template>
  <div class="flexStyle" style="margin-right: 20px; left: 230px; position: fixed">
    <ol class="flex">
      <li
          class="items-center content-center shadow-sm"
          :class="(item.path === curObj.path) ? `area-tab-bg-1 text-blueGray-800` : `area-tab-bg-2 text-gray-500 tabBg`" style="display: flex;"
          @dragenter="dragenter($event, index)"
          @dragover="dragover($event, index)"
          @dragstart="dragstart(index)"
          draggable="true"
          v-for="(item, index) in openFiles"
          :key="index"
          @click="getTab(item)"
          @contextmenu.prevent.stop="updateRightClickItem($event, item)"
          v-contextmenu:contextmenu
      >
        <div class="tabItem">
          {{ getName(item) }}
        </div>
        <div class="tabBtn" @click.stop="closeTabByItem(item)">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
               width="12" height="12" viewBox="0 0 12 12">
            <g style="mix-blend-mode:passthrough" clip-path="url(#master_svg0_1_540)">
              <g style="mix-blend-mode:passthrough">
                <path
                    d="M2.646446,2.646446C2.841709,2.4511845,3.15829,2.4511845,3.353555,2.646446C3.353555,2.646446,6,5.2928999999999995,6,5.2928999999999995C6,5.2928999999999995,8.64645,2.646446,8.64645,2.646446C8.8417,2.4511845,9.1583,2.4511845,9.35355,2.646446C9.5488,2.841709,9.5488,3.15829,9.35355,3.353555C9.35355,3.353555,6.70711,6,6.70711,6C6.70711,6,9.35355,8.64645,9.35355,8.64645C9.5488,8.8417,9.5488,9.1583,9.35355,9.35355C9.1583,9.5488,8.8417,9.5488,8.64645,9.35355C8.64645,9.35355,6,6.70711,6,6.70711C6,6.70711,3.353555,9.35355,3.353555,9.35355C3.15829,9.5488,2.841709,9.5488,2.646446,9.35355C2.4511845,9.1583,2.4511845,8.8417,2.646446,8.64645C2.646446,8.64645,5.2928999999999995,6,5.2928999999999995,6C5.2928999999999995,6,2.646446,3.353555,2.646446,3.353555C2.4511845,3.15829,2.4511845,2.841709,2.646446,2.646446C2.646446,2.646446,2.646446,2.646446,2.646446,2.646446Z"
                    fill-rule="evenodd" fill="#AAAAAA" fill-opacity="1"/>
              </g>
            </g>
          </svg>
        </div>
      </li>
    </ol>
  </div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="closeTab" class="hover:bg-gray-200 text-gray-700">关闭标签页</v-contextmenu-item>
      <v-contextmenu-item @click="closeOtherTab" class="hover:bg-gray-200 text-gray-700">关闭其他标签页</v-contextmenu-item>
    </v-contextmenu>

</template>

<script>

import { getCurrentInstance, ref, watch } from 'vue'
import bus from 'vue3-eventbus'
import { directive, Contextmenu, ContextmenuItem } from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'
import { useStore } from 'vuex'

export default {
  name: 'TabList',
  directives: {
    contextmenu: directive
  },
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem
  },
  props: {
    openFiles: {
      type: Array,
      require: true
    },
    curObj: {
      type: Object,
      require: true
    }
  },
  setup (props) {
    const dragIndex = ref(0)
    const list = ref(props.openFiles)
    const rightClickItem = ref({})
    const store = useStore()
    const TabXY = ref({ x: -1, y: -1 })
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx

    watch(() => store.state.xy, (newValue, oldValue) => {
      const temp = TabXY.value.x + '+' + TabXY.value.y
      if (store.getters.getXY !== temp) {
        _this.$refs.contextmenu.hide()
      }
    })

    function updateRightClickItem (e, item) {
      TabXY.value = { x: e.clientX, y: e.clientY }
      store.dispatch('updateXY', TabXY.value)
      rightClickItem.value = item
    }

    function dragstart (index) {
      dragIndex.value = index
    }

    function dragenter (e, index) {
      e.preventDefault()
      // 避免源对象触发自身的dragenter事件
      if (dragIndex.value !== index) {
        const source = props.openFiles[dragIndex.value]
        list.value.splice(dragIndex.value, 1)
        list.value.splice(index, 0, source)
        // 排序变化后目标对象的索引变成源对象的索引
        dragIndex.value = index
      }
    }

    function dragover (e) {
      e.preventDefault()
    }

    function getName (item) {
      const index = item.absolutePath.length + item.offset
      let res = item.absolutePath[index]
      for (let i = index + 1; i <= item.absolutePath.length - 1; i++) {
        res += '>' + item.absolutePath[i]
      }
      return res
    }

    function getTab (item) {
      if (props.curObj.path !== item.path) {
        bus.emit('sendToTextUI', item)
      }
    }

    function closeTabByItem (item) {
      bus.emit('deleteTab', item)
    }

    function closeTab () {
      bus.emit('deleteTab', rightClickItem.value)
    }

    function closeOtherTab (item) {

    }

    function lockTab () {

    }

    return {
      dragstart,
      dragenter,
      dragover,
      getName,
      getTab,
      closeTabByItem,
      closeTab,
      closeOtherTab,
      lockTab,
      updateRightClickItem
    }
  }
}
</script>

<style scoped>
.flexStyle{
  /* 设置超出滚动 */
  overflow-x:auto;
  right: 20px;
}
::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}

.tabItem {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 15px;
  font-family: "Noto Sans SC";
  font-size: 14px;
  -webkit-transition: color .3s;
  -webkit-transition:left .3s, color .3s;
}

.tabBtn {
  right: 10px;
  position: absolute;
}

.tabBtn:hover {
  background-color: #bbbbbb;
  border-radius: 10px;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}

.tabBtn:hover path {
  fill: #FFFFFF;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
  -webkit-transition:left .3s, fill .3s;
}

.tabBg:hover {
  background-color: #e0e8e6;
  color: #3D3D3D;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}
</style>
