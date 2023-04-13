<template>
  <li>
    <div
        :class="(hover) ? `flex items-center cursor-pointer bg-red-300` : `flex items-center cursor-pointer bg-red-400`"
        style="width: 100px;height: 20px;"
        @mouseenter="hover = true"
        @mouseout="hover = false"
    >
      {{ item.name }}
      <svg
          v-if="hasChildren"
          :class="[(hover) ? 'transform rotate-90' : '', 'w-4 h-4 mr-2']"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            fill-rule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  </li>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const hover = ref(false)

    // 创建一个计算属性，用于判断当前项是否有子节点
    const hasChildren = computed(() => {
      return props.item.children && props.item.children.length
    })

    return {
      hasChildren,
      hover
    }
  }
}
</script>

<style scoped>

</style>
