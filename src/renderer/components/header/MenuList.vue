<template>
  <div class="text-gray-600 text-sm" style="display: flex;margin-left: 100px;margin-top:20px"
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
      />
    </ul>
    <ul v-if="secondShow">
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in secondItems"
          :key="index"
          @mouseenter="mouseIn(2, index)"
          @click="show(2, index)"
      />
    </ul>
    <ul v-if="thirdShow">
      <MenuItem
          :item="navItem"
          v-for="(navItem, index) in thirdItems"
          :key="index"
          @mouseenter="mouseIn(3, index)"
          @click="show(3, index)"
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
  setup () {
    const items = [{
      name: '文件',
      children: [{
        name: '新建文件'
      }, {
        name: '新建窗口'
      }, {
        name: '打开本地文件'
      }, {
        name: '打开工作区'
      }]
    }, {
      name: '编辑',
      children: [{
        name: '撤销'
      }]
    }, {
      name: '段落'
    }, {
      name: '视图和布局',
      children: [{
        name: '主题偏好',
        children: [{
          name: '经典主题'
        }, {
          name: '暗黑主题'
        }]
      }]
    }]

    const secondItems = ref([{}])
    const secondShow = ref(false)
    const thirdItems = ref([{}])
    const thirdShow = ref(false)

    const menu = ref(false)
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx

    console.log(proxy, _this)

    watch(menu, (newValue, oldValue) => {
      console.log(`menu changed from ${oldValue} to ${newValue}`)
      if (newValue) {
        _this.$nextTick(() => {
          _this.$refs.myMenu.focus()
        })
      }
    })

    function mouseIn (layer, index) {
      const op = (layer === 1) ? items[index] : (layer === 2) ? secondItems.value[index] : thirdItems.value[index]

      if (op.children && op.children.length) {
        if (layer === 1) {
          secondItems.value = op.children
          secondShow.value = true
          thirdShow.value = false
        } else {
          thirdItems.value = op.children
          thirdShow.value = true
        }
      } else {
        if (layer === 1) {
          secondShow.value = false
          thirdShow.value = false
        } else if (layer === 2) {
          thirdShow.value = false
        }
      }
    }

    function show (layer, index) {
      // 导航
      mouseIn(layer, index)

      // 功能
      const op = (layer === 1) ? items[index] : (layer === 2) ? secondItems.value[index] : thirdItems.value[index]

      if (!(op.children && op.children.length)) {
        closeMenu() // 点击叶节点关闭菜单
        // 根据index找相应的函数执行
        if (layer === 1) {
          //
        } else if (layer === 2) {
          //
        } else {
          //
        }
      }
    }

    function closeMenu () {
      menu.value = false
    }

    bus.on('showMenu', () => {
      menu.value = true
    })

    return {
      items,
      secondItems,
      thirdItems,
      secondShow,
      thirdShow,
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
