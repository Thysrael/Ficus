<template>
  <mindmap v-model="data"
           drag="true"
           zoom="true"
           center-btn="true"
           fit-btn="true"
           download-btn="true"
           timetravel="true"
           ctm="true"
           @update:model-value="onChange"
           @select="onSelect"
  >
  </mindmap>
</template>

<script>
import testMind from './test_mind.json'
import { defineComponent, ref } from 'vue'
import mindmap from 'ficus-mindmap'
import 'ficus-mindmap/dist/style.css'
export default defineComponent({
  components: {
    mindmap
  },
  setup () {
    const data = ref(testMind)
    const onChange = (msg) => {
      console.log(msg)
    }
    const onSelect = (msg) => {
      console.log(msg)
    }
    return {
      data,
      onChange,
      onSelect
    }
  }
})
</script>
