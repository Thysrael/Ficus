<template>
  <div class="flexStyle flex-wrap"
       :style="`margin-right: 20px; left: ${store.getters.getSideBarWidth}px; position: fixed`"
       v-show="(mode >= 0 && mode <= 2)">
    <ol class="flex">
      <li
          class="relative items-center content-center flex flex-wrap flex-auto align-middle place-content-center w-auto"
          :class="(item.path === curObj.path) ? `tab-item-selected` : `tab-item `"
          style="max-width: 200px"
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
        <div class="tabItem w-10/12 px-3" :title="getName(item)">
          {{ getName(item) }}
        </div>
        <div class="w-2/12 h-full flex">
          <div class="tabBtn mr-2 absolute self-center" @click.stop="closeTabByItem(item)"
               style="right: 20px">
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
        </div>
        <div :class="(item.path === curObj.path) ? `border-none` : `border-r`" style="width: 10px"/>
      </li>
    </ol>
  </div>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="closeTab" class="hover:bg-gray-200 text-gray-700">关闭标签页</v-contextmenu-item>
      <v-contextmenu-item @click="closeOtherTab" class="hover:bg-gray-200 text-gray-700">关闭其他标签页</v-contextmenu-item>
    </v-contextmenu>

</template>

<script>

import { computed, getCurrentInstance, ref, watch } from 'vue'
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
    const _this = proxy
    const mode = computed(() => {
      return store.getters.getMode
    })

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

    function closeOtherTab () {
      bus.emit('closeAllOtherTab', rightClickItem.value)
    }

    function lockTab () {

    }

    return {
      mode,
      store,
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
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Noto Sans SC";
  font-size: 12px;
  -webkit-transition: .3s;
}

.tabBtn {
  width: 12px;
  height: 12px;
}

.tabBtn:hover {
  background-color: #686c6a;
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

.tab-item {
  position: relative;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 -15px;
  color: #7c7c7c;
  background-image:
      radial-gradient(circle at 27px 12px, var(--color,#f4f4f3) 12px, transparent 0),
      linear-gradient(var(--color,#f4f4f3),var(--color,#f4f4f3)),
      linear-gradient(var(--color,#f4f4f3),var(--color,#f4f4f3)),
      radial-gradient(circle at 15px 0, transparent 15px,var(--color, #f4f4f3) 0);
  background-size:calc(100% - 54px), calc(100% - 30px) calc(100% - 12px), calc(100% - 54px) 100%, 100% 15px;
  background-position:left top, center bottom, center bottom, -15px bottom;
  background-repeat: repeat-x, no-repeat, no-repeat, repeat-x;
}

.tab-item:hover {
  background-image:
      radial-gradient(circle at 27px 12px, var(--color, #f9f9f9) 12px, transparent 0),
      linear-gradient(var(--color,#f9f9f9),var(--color,#f9f9f9)),
      linear-gradient(var(--color,#f9f9f9),var(--color,#f9f9f9)),
      radial-gradient(circle at 15px 0, transparent 15px,var(--color, #f9f9f9) 0);
}

.tab-item-selected {
  position: relative;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 -15px;
  color: #565656;
  background-image:
      radial-gradient(circle at 27px 12px, var(--color,rgba(255, 255, 255, 1)) 12px, transparent 0),
      linear-gradient(var(--color,#ffffff),var(--color,#ffffff)),
      linear-gradient(var(--color,#ffffff),var(--color,#ffffff)),
      radial-gradient(circle at 15px 0, transparent 15px,var(--color, #ffffff) 0);
  background-size:calc(100% - 54px), calc(100% - 30px) calc(100% - 12px), calc(100% - 54px) 100%, 100% 15px;
  background-position:left top, center bottom, center bottom, -15px bottom;
  background-repeat: repeat-x, no-repeat, no-repeat, repeat-x;
}

</style>
