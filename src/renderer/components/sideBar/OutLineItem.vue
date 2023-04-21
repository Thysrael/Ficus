<template>
  <li>
    <div
        :class="isFocused ? `flex items-center cursor-pointer bg-red-300` : `flex items-center cursor-pointer bg-fuchsia-300`"
        tabindex="0"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :style="pl"
    >
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
      {{ item.name }}
    </div>
    <ul>
      <OutLineItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          @click="getIndex(index, child)"
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

</style>
