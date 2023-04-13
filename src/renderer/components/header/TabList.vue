<template>
  <div class="flex;flex-direction: row;" style="margin-left: 100px;">
    <ol class="flex">
      <TabItem
          :cur-obj="curObj"
          :item="item"
          v-for="(item, index) in openFiles"
          :key="index"
      >
      </TabItem>
    </ol>
  </div>
</template>

<script>

import TabItem from '@/renderer/components/header/TabItem'
export default {
  name: 'TabList',
  components: { TabItem },
  props: {
    openFiles: {
      type: Array,
      require: true
    },
    curObj: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped>

</style>
