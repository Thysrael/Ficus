<template>
  <div class="text-gray-600 text-sm flexStyle">
    <ul class="space-y-1">
      <FileNavItem
          :selected="selected"
          :item="navItem"
          v-for="(navItem, index) in navItems"
          :key="index"
      />
    </ul>
  </div>
</template>

<script>

import FileNavItem from '@/renderer/components/sideBar/FileNavItem'

export default {
  name: 'FileNav',
  components: {
    FileNavItem
  },
  props: {
    selected: {
      type: Array,
      required: true
    },
    navItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.flexStyle {
  display: flex;
  justify-content: space-between;
  /* 设置超出滚动 */
  overflow-x: auto;
  overflow-y: auto;
}

::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}
</style>
