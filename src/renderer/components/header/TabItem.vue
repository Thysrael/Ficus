<template>
  <div :class="(isFocused) ? `area-tab-bg-1` : `area-tab-bg-2`" style="display: flex;"
       @click="getTab"
  >
    {{ name }}
    <div style="margin-top: 5px" @click.stop="closeTab">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
           width="12" height="12" viewBox="0 0 12 12">
        <defs>
          <clipPath id="master_svg0_1_540">
            <rect x="0" y="0" width="12" height="12" rx="0"/>
          </clipPath>
        </defs>
        <g style="mix-blend-mode:passthrough" clip-path="url(#master_svg0_1_540)">
          <g style="mix-blend-mode:passthrough">
            <path
                d="M2.646446,2.646446C2.841709,2.4511845,3.15829,2.4511845,3.353555,2.646446C3.353555,2.646446,6,5.2928999999999995,6,5.2928999999999995C6,5.2928999999999995,8.64645,2.646446,8.64645,2.646446C8.8417,2.4511845,9.1583,2.4511845,9.35355,2.646446C9.5488,2.841709,9.5488,3.15829,9.35355,3.353555C9.35355,3.353555,6.70711,6,6.70711,6C6.70711,6,9.35355,8.64645,9.35355,8.64645C9.5488,8.8417,9.5488,9.1583,9.35355,9.35355C9.1583,9.5488,8.8417,9.5488,8.64645,9.35355C8.64645,9.35355,6,6.70711,6,6.70711C6,6.70711,3.353555,9.35355,3.353555,9.35355C3.15829,9.5488,2.841709,9.5488,2.646446,9.35355C2.4511845,9.1583,2.4511845,8.8417,2.646446,8.64645C2.646446,8.64645,5.2928999999999995,6,5.2928999999999995,6C5.2928999999999995,6,2.646446,3.353555,2.646446,3.353555C2.4511845,3.15829,2.4511845,2.841709,2.646446,2.646446C2.646446,2.646446,2.646446,2.646446,2.646446,2.646446Z"
                fill-rule="evenodd" fill="#AAAAAA" fill-opacity="1"/>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>

import { computed } from 'vue'
import bus from 'vue3-eventbus'

export default {
  name: 'TabItem',
  props: {
    item: {
      type: Object,
      require: true
    },
    curObj: {
      type: Object,
      require: true
    }
  },
  setup (props) {
    const isFocused = computed(() => {
      return props.item === props.curObj
    })

    function getTab () {
      bus.emit('sendToTextUI', props.item)
    }

    function closeTab () {
      bus.emit('deleteTab', props.item)
    }

    const name = computed(() => {
      const index = props.item.absolutePath.length + props.item.offset
      let res = props.item.absolutePath[index]
      for (let i = index + 1; i <= props.item.absolutePath.length - 1; i++) {
        res += '\\' + props.item.absolutePath[i]
      }
      return res
    })
    return {
      name,
      isFocused,
      getTab,
      closeTab
    }
  }
}
</script>

<style scoped>

</style>
