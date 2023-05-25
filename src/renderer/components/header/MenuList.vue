<template>
  <div class="text-gray-600 text-sm" style="display: flex; margin-top:20px; outline:none;"
       v-if="menu"
       tabindex="0"
       @blur="closeMenu"
       ref="myMenu"
  >
    <ul>
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in items"
          :key="index"
          @mouseenter="mouseIn(1, index)"
          @click="show(1, index)"
          class="hover:bg-gray-200 bg-white shadow-md"
      />
    </ul>
    <ul v-if="secondShow" :style="`margin-top: ${secondOffset}px`">
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in secondItems"
          :key="index"
          @mouseenter="mouseIn(2, index)"
          @click="show(2, index)"
          class="hover:bg-gray-200 bg-white shadow-md"
      />
    </ul>
    <ul v-if="thirdShow" :style="`margin-top: ${secondOffset + thirdOffset}px`">
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in thirdItems"
          :key="index"
          @mouseenter="mouseIn(3, index)"
          @click="show(3, index)"
          class="hover:bg-gray-200 bg-white shadow-md"
      />
    </ul>
  </div>
</template>

<script>
import { getCurrentInstance, ref, watch } from 'vue'
import bus from 'vue3-eventbus'
import MenuItem from '@/renderer/components/header/MenuItem'

export default {
  name: 'MenuList',
  components: { MenuItem },
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  setup (props) {
    const items = ref([])

    window.menuAPI.setAppMenu((e, menuItems) => {
      items.value = menuItems
    })

    const secondItems = ref([{}])
    const secondShow = ref(false)
    const secondOffset = ref(0)
    const thirdOffset = ref(0)
    const thirdItems = ref([{}])
    const thirdShow = ref(false)
    const menu = ref(false)
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance()
    const _this = proxy
    let range = ''

    watch(menu, (newValue, oldValue) => {
      if (newValue) {
        _this.$nextTick(() => {
          if (window.getSelection().rangeCount >= 1) {
            range = window.getSelection().getRangeAt(0).cloneRange()
          }
          if (_this.$refs.myMenu !== null) {
            _this.$refs.myMenu.focus()
          }
        })
      }
    })

    // 鼠标移入事件监听
    function mouseIn (layer, index) {
      const op = (layer === 1) ? items.value[index] : (layer === 2) ? secondItems.value[index] : thirdItems.value[index]

      if (op.submenu && op.submenu.length) {
        if (layer === 1) {
          secondItems.value = op.submenu
          secondShow.value = true
          secondOffset.value = index * 23
          thirdShow.value = false
          thirdOffset.value = 0
        } else {
          thirdItems.value = op.submenu
          thirdShow.value = true
          thirdOffset.value = index * 23
        }
      } else {
        if (layer === 1) {
          secondShow.value = false
          thirdShow.value = false
          secondOffset.value = 0
          thirdOffset.value = 0
        } else if (layer === 2) {
          thirdShow.value = false
          thirdOffset.value = 0
        }
      }
    }

    // 菜单栏核心逻辑分发函数
    async function show (layer, index) {
      // 导航
      mouseIn(layer, index)

      // 功能
      const op = (layer === 1) ? items.value[index] : (layer === 2) ? secondItems.value[index] : thirdItems.value[index]
      const { id, meta } = op
      if (id) {
        bus.emit('cmd::execute', { id, meta })
        closeMenu() // 点击叶节点关闭菜单
      }
    }

    /**
     * 模式显示
     * @param obj {{mode: int}}
     */

    bus.on('changeShowMode', (mode) => {
      if (items.value) {
        const modeArray = items.value[4].submenu
        for (let i = 0; i <= 2; i++) {
          modeArray[i].checked = (i === mode)
        }
      }
    })

    bus.on('changeShowTypewriterMode', (enable) => {
      if (items.value) {
        const modeArray = items.value[4].submenu
        modeArray[4].checked = enable // FIXME
      }
    })

    function closeMenu () {
      menu.value = false
      secondOffset.value = 0
      thirdOffset.value = 0
      secondShow.value = false
      thirdShow.value = false
      const selection = window.getSelection()
      selection.removeAllRanges()
      if (range instanceof Range) {
        selection.addRange(range)
      }
    }

    bus.on('showMenu', () => {
      menu.value = true
    })

    return {
      items,
      secondItems,
      thirdItems,
      secondShow,
      secondOffset,
      thirdShow,
      thirdOffset,
      menu,
      closeMenu,
      show,
      mouseIn
    }
  }
}
</script>

<style scoped>

</style>
