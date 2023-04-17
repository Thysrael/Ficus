<template>
  <li
      @contextmenu.stop.prevent="handleRightClick($event)"
      v-contextmenu:contextmenu
      @dragenter.stop="dragenter($event)"
      @dragover.stop="dragover($event)"
      @dragstart.stop="dragstart()"
      draggable="true">
    <div
        :style="isSelected ? `display: flex;color: #42b983` : `display: flex;color: #2563eb`"
        @click.exact="toggle(1)"
        @click.ctrl="toggle(2)"
    >
      <svg
          v-if="hasChildren"
          :class="[expanded ? 'transform rotate-90' : '', 'w-4 h-4 mr-2']"
          fill="currentColor"
          viewBox="0 0 20 20"
          style="height: 10px;width: 10px"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            fill-rule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
        ></path>
      </svg>
      {{ item.name }}
    </div>
    <div>
      <v-contextmenu ref="contextmenu">
        <v-contextmenu-item>新建文件</v-contextmenu-item>
        <v-contextmenu-item>新建文件夹</v-contextmenu-item>
        <v-contextmenu-item>复制</v-contextmenu-item>
      </v-contextmenu>
    </div>
    <ul v-if="hasChildren && expanded" class="pl-4">
      <FileNavItem
          :selected="selected"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          @click="getCurChild(item, index)"
      />
    </ul>
  </li>
</template>

<script>
import { computed, getCurrentInstance, ref, watch } from 'vue'
import bus from 'vue3-eventbus'
import { directive, Contextmenu, ContextmenuItem } from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'
import { useStore } from 'vuex'

export default {
  name: 'FileNavItem',
  directives: {
    contextmenu: directive
  },
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem
  },
  props: {
    selected: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const expanded = ref(false) // 控制是否显示孩子节点
    const curItem = ref(props.item)
    const selectedList = ref(props.selected)
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

    // 创建一个计算属性，用于判断当前项是否有子节点
    const hasChildren = computed(() => {
      return props.item.children && props.item.children.length
    })

    const isSelected = computed(() => {
      // console.log('selected is ', selectedList.value)
      for (let i = 0; i < selectedList.value.length; i++) {
        if (props.item.path === selectedList.value[i].path) {
          return true
        }
      }
      return false
    })

    // 创建一个方法，用于切换节点的展开状态
    function toggle (index) {
      if (index === 1) {
        curItem.value.curChild = -1
        if (hasChildren.value) {
          expanded.value = !expanded.value
        } else {
          bus.emit('openNewTab', props.item)
        }
        // 单击会新建一个列表
        bus.emit('newSelected', props.item)
      } else if (index === 2) {
        // isFocused.value = !isFocused.value
        // ctrl + 单击 不会新建列表，会往里添加，如果里面已经有则是删除
        let index = -1
        for (let i = 0; i < selectedList.value.length; i++) {
          if (props.item.path === selectedList.value[i].path) {
            index = i
            break
          }
        }
        if (index !== -1) {
          selectedList.value.splice(index, 1)
        } else {
          selectedList.value.push(props.item)
        }
      }
    }

    function getCurChild (item, index) {
      item.curChild = index
    }

    function dragstart (index) {
      // 源对象
      bus.emit('getSource', props.item)
    }

    function dragenter (e) {
      e.preventDefault()
      // 避免源对象触发自身的dragenter事件
    }

    function dragover (e) {
      e.preventDefault()
      bus.emit('toDst', props.item)
    }

    function handleRightClick (e) {
      console.log('i am clicked')
      TabXY.value = { x: e.clientX, y: e.clientY }
      store.dispatch('updateXY', TabXY.value)
    }

    return {
      dragstart,
      dragenter,
      dragover,
      expanded,
      hasChildren,
      isSelected,
      toggle,
      curItem,
      getCurChild,
      handleRightClick
    }
  }
}
</script>

<style scoped>

</style>
