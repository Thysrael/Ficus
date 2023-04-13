<template>
  <div class="text-gray-600 text-sm">
    <ul class="space-y-1">
      <FileNavItem
          :item="navItem"
          v-for="(navItem, index) in navItems"
          :key="index"
      />
    </ul>
  </div>
</template>

<script>
import FileNavItem from './FileNavItem.vue'

export default {
  name: 'FileNav',
  components: { FileNavItem },
  props: {
    navItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
