<template>
  <li>
    <div
        class="outlineItem pl-2 content-center items-center"
        tabindex="0"
        :style="pl"
    >
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
          class="py-1"
      />
    </ul>
  </li>
</template>

<script>
import { computed } from 'vue'
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
    const pl = computed(() => {
      return `margin-left:${props.item.level - 0.5}rem`
    })

    function getIndex (index, child) {
      bus.emit('addToTitles', index)
    }

    return {
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
