<template>
  <li>
    <div
        style="width: 200px;height: 23px;"
        @mouseenter="hover = true"
        @mouseout="hover = false"
        class="flex content-center items-center"
    >
      <p class="ml-4" style="width: 170px; font-size: 12px">
        {{ item.name }}
      </p>

      <svg fill="#000000"
           v-if="hasChildren"
           :class="[(hover) ? 'transform rotate-90' : '', 'w-4 h-4 mr-2']"
           style="height: 12px;width: 12px;"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M6.5,8.5l6,7l6-7H6.5z"></path>
        </g>
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
