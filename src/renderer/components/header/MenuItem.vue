<template>
  <li>
    <div style="display: flex">
      <div style="width: 10px;padding-left: 5px">
        {{ item.selected ? `√`: ``}}
      </div>
      <div
        style="width: 200px;height: 23px;"
        @mouseenter="hover = true"
        @mouseout="hover = false"
        class="flex content-center items-center"
    >

      <div class="ml-4" style="width: 150px; font-size: 12px; user-select: none;display: flex;justify-content: space-between;">
        <div style="text-align: left">
          {{item.name}}
        </div>
        <div style="text-align: right">
        {{item.keyBoard}}
        </div>
      </div>
<!--      <div class="ml-4" style="margin-left: 50px; width: 170px; font-size: 10px; user-select: none;">-->
<!--        -->
<!--      </div>-->
      <svg fill="#000000"
           v-if="hasChildren"
           :class="[(hover) ? 'transform rotate-90' : '', 'w-4 h-4 mr-2']"
           style="height: 12px;width: 12px;margin-left: 20px"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M6.5,8.5l6,7l6-7H6.5z"></path>
        </g>
      </svg>
    </div>
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
