<template>
  <FicTree/>
</template>

<script>
import FicTree from '@/renderer/components/mindEditor/FicTree.vue'
import FicForest from '@/renderer/components/mindEditor/FicForest.vue'
import FicGraph from '@/renderer/components/mindEditor/FicGraph.vue'
import bus from 'vue3-eventbus'

export default {
  name: 'MindMap',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  components: {
    FicTree,
    FicForest,
    FicGraph
  },
  setup(props) {
    // TODO
  }
}
</script>

<style scoped>

</style>