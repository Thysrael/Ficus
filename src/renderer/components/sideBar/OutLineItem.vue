<template>
  <li>
    <div
        class="outlineItem pl-1 py-1 content-center items-center h-full"
        tabindex="0"
        :style="pl"
    >
      <p class="pl-1">
        {{ item.name }}
      </p>
    </div>
    <ul>
      <OutLineItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          @click="getIndex(child)"
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
      return `margin-left:${props.item.level - 1}rem`
    })

    function getIndex (child) {
      bus.emit('addToTitles', child)
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
  font-size: 13px;
  color: #3D3D3D;
  border-width: 0px 0px 0px 2px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
}

.outlineItem:hover {
  background-color: #e3e3e3;
  border-radius: 6px;
  font-weight: 900;
  -webkit-transition: background-color .2s;
  -webkit-transition:left .3s, background-color .2s;
}
</style>
