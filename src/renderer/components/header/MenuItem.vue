<template>
  <li @mouseenter="hover = true"
      @mouseout="hover = false">
    <div class="flex flex-wrap items-center">
      <div style="width: 10px;padding-left: 5px">
        {{ item.checked ? `√`: ``}}
      </div>
      <div
        style="width: 200px;height: 23px;"
        class="flex content-center items-center"
    >

      <div class="ml-4"
           style="width: 150px; font-size: 12px; user-select: none; display: flex; justify-content: space-between; ">
        <div style="text-align: left; text-overflow: ellipsis; overflow: hidden" :title="item.label">
          {{ item.label }}
        </div>
        <div style="text-align: right">
        {{ item.accelerator }}
        </div>
      </div>

        <svg v-if="hasChildren && hover" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" width="15px" height="15px">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
            <path d="M9,18l7-6L9,6V18z" fill="#474747" fill-opacity="1"></path> <rect class="st0" width="24" height="24"></rect><rect class="st0" width="24" height="24"></rect>
          </g>
        </svg>

        <svg v-if="hasChildren && !hover" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" width="15px" height="15px">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
            <path d="M6.5,8.5l6,7l6-7H6.5z" fill="#474747" fill-opacity="1"></path> <rect class="st0" width="24" height="24"></rect> <rect class="st0" width="24" height="24"></rect>
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
      return props.item.submenu && props.item.submenu.length
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
