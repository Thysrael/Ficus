<template>
  <li style="display: flex">
    <div
        class="flex items-center cursor-pointer"
        @dblclick="doubleEvent"
        @click="toggle"
    >
      {{ item.path }}
    </div>
    <div v-if="hasChildren && item.curChild !== -1" class="flex">
      >>>
      <ul>
        <BreadCrumbItem
            :show="show"
            :item="item.children[item.curChild]"
        />
      </ul>
    </div>

  </li>
  <div v-if="menu" class="bg-blue-400">
    <ol>
      <li v-for="(child, index) in item.children" :key="index"
          @click="changeTab(item, child, index)"
      >{{ child.path }}
      </li>
    </ol>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import bus from 'vue3-eventbus'

export default {
  name: 'BreadCrumbItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const selected = ref('default')
    const menu = ref(false)
    const curItem = ref(props.item)
    let time = null

    // 创建一个计算属性，用于判断当前项是否有子节点
    const hasChildren = computed(() => {
      return props.item.children && props.item.children.length
    })

    function changeTab (item, child, index) {
      item.curChild = index
      child.curChild = -1
      bus.emit('changeShow')
      menu.value = false
      //
      if (!(child.children && child.children.length)) {
        bus.emit('openNewTab', child)
      }
    }

    function doubleEvent () {
      clearTimeout(time)
      curItem.value.curChild = -1
    }

    function toggle () {
      clearTimeout(time)
      time = setTimeout(() => {
        if (hasChildren.value && !props.show) {
          menu.value = true
          bus.emit('changeShow')
        }
      }, 200)
    }

    // 返回 reactive 对象和方法
    return {
      hasChildren,
      toggle,
      changeTab,
      doubleEvent,
      curItem,
      selected,
      menu
    }
  }
}
</script>

<style scoped>

</style>
