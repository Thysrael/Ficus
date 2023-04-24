<template>
  <li>
    <div
        :class="isFocused ? `flex cursor-pointer bg-red-300` : `flex cursor-pointer bg-fuchsia-300`"
        class="outlineItem pl-2 content-center items-center"
        @click="toggle"
        tabindex="0"
        @focus="isFocused = true"
        @blur="isFocused = false"
    >
      <div>
        <svg v-if="hasChildren && !expanded" viewBox="0 0 16 16" width="10px" height="10px" xmlns="http://www.w3.org/2000/svg" fill="none">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fill="#3D3D3D" d="M8 3a5 5 0 100 10A5 5 0 008 3z"></path>
        </g>
        </svg>
      </div>

      <svg v-if="hasChildren && expanded" viewBox="0 0 16 16" width="10px" height="10px" xmlns="http://www.w3.org/2000/svg" fill="none">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path fill="#3D3D3D" fill-rule="evenodd" d="M8 3a5 5 0 100 10A5 5 0 008 3zm0 1.5v7a3.5 3.5 0 100-7z" clip-rule="evenodd"></path>
        </g>
      </svg>

<!--      <svg-->
<!--          v-if="hasChildren"-->
<!--          :class="[expanded ? 'transform rotate-90' : '', 'w-4 h-4 mr-2']"-->
<!--          fill="currentColor"-->
<!--          viewBox="0 0 20 20"-->
<!--          style="height: 10px;width: 10px"-->
<!--          xmlns="http://www.w3.org/2000/svg"-->
<!--      >-->
<!--        <path-->
<!--            fill-rule="evenodd"-->
<!--            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"-->
<!--            clip-rule="evenodd"-->
<!--        ></path>-->
<!--      </svg>-->
      <div class="pl-2">
        {{ item.name }}
      </div>
    </div>
    <ul>
      <OutLineItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          @click="getIndex(index, child)"
          class="py-2"
      />
    </ul>
  </li>
</template>

<script>
import { computed, ref } from 'vue'
import bus from 'vue3-eventbus'

export default {
  name: 'OutLineItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const isFocused = ref(false)

    const pl = computed(() => {
      return `padding-left:${props.item.level - 1}rem`
    })

    function getIndex (index, child) {
      bus.emit('addToTitles', index)
    }

    return {
      isFocused,
      pl,
      getIndex
    }
  }
}
</script>

<style scoped>
.outlineItem {
  font-family: "Noto Sans SC";
  font-size: 14px;
  color: #3D3D3D;
  box-sizing: border-box;
  border-width: 0px 0px 0px 2px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
}

.outlineItem:hover {
  background-color: #e3e3e3;
  border-radius: 6px;
  -webkit-transition: background-color .2s;
  -webkit-transition:left .3s, background-color .2s;
}
</style>
