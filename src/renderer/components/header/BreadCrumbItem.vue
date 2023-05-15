<template>
  <li class="flex ml-1 mr-1">
    <div class="inline">
      <div
          class="cursor-pointer"
          @dblclick="doubleEvent"
          @click="togglePopover()"
          id="btnRef"
          style="max-width: 100px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
          :title="item.name"
      >
        {{ item.name }}
      </div>
      <div id="popoverRef"
           v-show="popoverShow && hasChildren"
           class="fixed items-center overflow-y-auto content-center transition-all border-0 shadow-xl z-50 font-normal text-sm text-left no-underline break-words"
           @mouseleave.stop="togglePopover()"
           style="font-family: 'Noto Sans SC'; background-color: #727B85; max-height: 500px">
        <div class="px-3 py-2">
          <ol>
            <li v-for="(child, index) in item.children" :key="index"
                @click="changeTab(child, index)"
                class="breadCrumbChild px-3"
            >
              {{ child.name }}
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div v-if="hasChildren && item.curChild >= 0" class="flex ml-1 mr-1 place-content-center content-center align-middle">
      <div>
        <svg fill="#FFFFFF" viewBox="0 0 32 16" version="1.1" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"><path d="M22.314 16l-8.485 8.485-2.829-2.828 5.657-5.657-5.657-5.657 2.828-2.828 8.486 8.485z"></path></g>
        </svg>
      </div>
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
import { createPopper } from '@popperjs/core'

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
    const popoverShow = ref(false) // 显示完整面包屑的弹窗
    let time = null

    // 创建一个计算属性，用于判断当前项是否有子节点
    const hasChildren = computed(() => {
      return props.item.children && props.item.children.length
    })

    function doubleEvent () {
      clearTimeout(time)
      bus.emit('wantShow', {}) // 传递空对象
      curItem.value.curChild = -1
    }

    function changeTab (child, index) {
      // eslint-disable-next-line vue/no-mutating-props
      props.item.curChild = index
      child.curChild = -1
      if (!(child.children && child.children.length)) {
        bus.emit('openNewTab', child)
      }
    }

    function togglePopover () {
      clearTimeout(time)
      time = setTimeout(() => {
        const btnRef = document.querySelector('#btnRef')
        const popoverRef = document.querySelector('#popoverRef')
        if (this.popoverShow) {
          this.popoverShow = false
        } else {
          this.popoverShow = true
          createPopper(btnRef, popoverRef, {
            placement: 'bottom',
            element: 'arrow',
            strategy: 'fixed'
          })
        }
      }, 200)
    }

    return {
      hasChildren,
      doubleEvent,
      curItem,
      selected,
      isFocused,
      popoverShow,
      togglePopover,
      changeTab
    }
  }
}
</script>

<style scoped>
.breadCrumbChild:hover {
  background-color: #596067;
  color: #AAAAAA;
  border-radius: 8px;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}

.breadCrumbChild:active {
  background-color: #3b4044;
  color: #AAAAAA;
  border-radius: 8px;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}
</style>
