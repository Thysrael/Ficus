<template>
  <li style="display: flex">
    <div
        class="flex items-center cursor-pointer"
        @dblclick="doubleEvent"
        @click="toggle"
    >
      {{ item.name }}
    </div>
    <div v-if="hasChildren && item.curChild !== -1" class="flex">
      >>>
      <ul>
        <BreadCrumbItem
            :item="item.children[item.curChild]"
        />
      </ul>
    </div>
  </li>
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
    }
  },
  setup (props) {
    const selected = ref('default')
    const isFocused = ref(false)
    const curItem = ref(props.item)
    let time = null

    // 创建一个计算属性，用于判断当前项是否有子节点
    const hasChildren = computed(() => {
      return props.item.children && props.item.children.length
    })

    bus.on('changeTab', (obj) => {
      obj.item.curChild = obj.index
      obj.child.curChild = -1
      if (!(obj.child.children && obj.child.children.length)) {
        bus.emit('openNewTab', obj.child)
      }
    }
    )

    function doubleEvent () {
      clearTimeout(time)
      bus.emit('wantShow', {}) // 传递空对象
      curItem.value.curChild = -1
    }

    function toggle () {
      clearTimeout(time)
      time = setTimeout(() => {
        bus.emit('wantShow', props.item)
      }, 200)
    }

    function lossFocus () {
      bus.emit('wantShow', {}) // 传递空对象
    }

    return {
      hasChildren,
      toggle,
      doubleEvent,
      lossFocus,
      curItem,
      selected,
      isFocused
    }
  }
}
</script>

<style scoped>

</style>
