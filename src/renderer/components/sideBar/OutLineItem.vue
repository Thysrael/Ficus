<template>
  <li>
    <div
        :class="isFocused ? `flex items-center cursor-pointer bg-red-300` : `flex items-center cursor-pointer bg-fuchsia-300`"
        @click="toggle"
        tabindex="0"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :style="pl"
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
    <ul v-if="hasChildren && expanded">
      <OutLineItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
      />
    </ul>
  </li>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'OutLineItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const expanded = ref(false) // 控制是否显示孩子节点
    const isFocused = ref(false)

    // 创建一个计算属性，用于判断当前项是否有子节点
    const hasChildren = computed(() => {
      return props.item.children && props.item.children.length
    })

    const pl = computed(() => {
      return `padding-left:${props.item.level - 1}rem`
    })

    // 创建一个方法，用于切换节点的展开状态
    function toggle () {
      if (hasChildren.value) {
        expanded.value = !expanded.value
      } else {
        //
      }
    }

    return {
      expanded,
      hasChildren,
      isFocused,
      pl,
      toggle
    }
  }
}
</script>

<style scoped>

</style>
