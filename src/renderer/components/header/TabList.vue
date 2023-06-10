<template>
  <div class="flexStyle flex-wrap fixed"
       style=""
       :style="tabOverflow ? `margin-right: 35px; right: 35px; left: ${store.getters.getSideBarWidth}px;` : `margin-right: 20px; right: 20px; left: ${store.getters.getSideBarWidth}px;`"
       ref="tablist"
       id="tabListDiv"
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
          <div class="tabBtn mr-2 absolute self-center flex" @click.stop="closeTabByItem(item)"
               style="right: 20px">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="15" height="15" viewBox="0 0 15 15"><defs><clipPath id="master_svg0_243_0886"><rect x="0" y="0" width="15" height="15" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_243_0886)"><g><path d="M4.146446,4.146446C4.341709,3.9511844,4.658291,3.9511844,4.853556,4.146446L7.50001,6.7928999999999995L10.146460000000001,4.146446C10.341709999999999,3.9511844,10.65831,3.9511844,10.85356,4.146446C11.04881,4.341709,11.04881,4.658291,10.85356,4.853556L8.20712,7.50001L10.85356,10.146460000000001C11.04881,10.341709999999999,11.04881,10.65831,10.85356,10.85356C10.65831,11.04881,10.341709999999999,11.04881,10.146460000000001,10.85356L7.50001,8.20712L4.853556,10.85356C4.658291,11.04881,4.341709,11.04881,4.146446,10.85356C3.9511844,10.65831,3.9511844,10.341709999999999,4.146446,10.146460000000001L6.7928999999999995,7.50001L4.146446,4.853556C3.9511844,4.658291,3.9511844,4.341709,4.146446,4.146446Z" fill-rule="evenodd" fill="#AAAAAA" fill-opacity="1"/></g></g></svg>
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

import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
  emits: ['update:tabListOverflow'],
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

    const tabOverflow = ref(false)
    const containerRef = ref(null)
    const checkTablistOverflow = () => {
      const tablistWidth = containerRef.value.clientWidth
      const contentWidth = containerRef.value.scrollWidth
      tabOverflow.value = contentWidth > tablistWidth
      _this.$emit('update:tabListOverflow', tabOverflow.value)
    }

    // scrollToElement 函数接受一个参数 index
    // 代表数组中要滚动到可见区域的元素索引
    function scrollToElement (index) {
      const container = document.getElementById('tabListDiv')
      const listItem = container.querySelectorAll('li')

      if (index >= 0 && index < listItem.length) {
        listItem[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }

    watch(() => store.state.xy, (newValue, oldValue) => {
      const temp = TabXY.value.x + '+' + TabXY.value.y
      if (store.getters.getXY !== temp) {
        _this.$refs.contextmenu.hide()
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkTablistOverflow)
    })

    onMounted(() => {
      window.addEventListener('resize', checkTablistOverflow)
    })

    watch(list.value, (newList, oldList) => {
      console.log('list 长度变化了:', newList.length)
      checkTablistOverflow()
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
        checkTablistOverflow()
      }
    }

    function closeTabByItem (item) {
      bus.emit('deleteTab', item)
      checkTablistOverflow()
    }

    function closeTab () {
      bus.emit('deleteTab', rightClickItem.value)
      checkTablistOverflow()
    }

    function closeOtherTab () {
      bus.emit('closeAllOtherTab', rightClickItem.value)
      checkTablistOverflow()
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
      updateRightClickItem,
      tabOverflow,
      containerRef,
      scrollToElement
    }
  },
  mounted () {
    this.containerRef = this.$refs.tablist
  }
}
</script>

<style scoped>
.flexStyle{
  /* 设置超出滚动 */
  overflow-x:auto;
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
  width: 15px;
  height: 15px;
}

.tabBtn:hover {
  background-color: #dcdcdc;
  border-radius: 2.5px;
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
