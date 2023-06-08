<template>
  <li>
    <div class="flex flex-wrap items-center">
      <div style="width: 10px;padding-left: 10px">
        <span v-if="item.checked"
              class="inline-flex items-center justify-center p-1 text-xs text-gray-500 rounded overflow-x-hidden flex-none"
              style="background-color: #42b983;"/>
      </div>
      <div
        style="width: 200px;height: 23px;"
        class="flex content-center items-center hoverParent"
      >
        <div class="ml-4"
             style="width: 160px; font-size: 12px; user-select: none; display: flex; justify-content: space-between; ">
          <div style="text-align: left; text-overflow: ellipsis; overflow: hidden; white-space: nowrap" :title="item.label" >
            {{ item.label }}
          </div>
          <div style="text-align: right">
          {{ item.accelerator }}
          </div>
        </div>
        <div v-if="hasChildren">
          <svg class="hoverItem" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" width="15px" height="15px">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
              <path d="M9,18l7-6L9,6V18z" fill="#474747" fill-opacity="1"></path> <rect class="st0" width="24" height="24"></rect><rect class="st0" width="24" height="24"></rect>
            </g>
          </svg>

          <svg class="notHoverItem" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" width="15px" height="15px">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
              <path d="M6.5,8.5l6,7l6-7H6.5z" fill="#474747" fill-opacity="1"></path> <rect class="st0" width="24" height="24"></rect> <rect class="st0" width="24" height="24"></rect>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    // 创建一个计算属性，用于判断当前项是否有子节点
    const hasChildren = computed(() => {
      return props.item.submenu && props.item.submenu.length
    })

    return {
      hasChildren
    }
  }
}
</script>

<style scoped>
.hoverItem, .notHoverItem {
  display: none;
}

.hoverParent:hover .hoverItem {
  display: block;
}

.hoverParent:not(:hover) .notHoverItem {
  display: block;
}
</style>
