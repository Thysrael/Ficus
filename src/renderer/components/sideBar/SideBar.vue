<template>
  <div class="area-sidebar">
    <FileNav :navItems="data">
    </FileNav>
  </div>
</template>

<script>

import FileNav from '@/renderer/components/sideBar/FileNav'
export default {
  name: 'SideBar',
  components: { FileNav },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
