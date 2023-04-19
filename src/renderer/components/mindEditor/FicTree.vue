<template>
  <mindmap v-model="data"
           drag="true"
           zoom="true"
           center-btn="true"
           fit-btn="true"
           download-btn="true"
           timetravel="true"
           ctm="true"
           update:model-value="onChange"
  >
  </mindmap>
</template>

<script>
import mindmap from 'ficus-mindmap'
import 'ficus-mindmap/dist/style.css'
import testMind from './test_mind.json'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    mindmap
  },
  setup () {
    const data = ref(testMind)
    const onChange = () => console.log('text')
    return {
      data,
      onChange
    }
  }
})
</script>
