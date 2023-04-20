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
<<<<<<< HEAD
import mindmap from 'ficus-mindmap'
import 'ficus-mindmap/dist/style.css'
=======
>>>>>>> f68fd58 (feat(./src/renderer/components/mindeditor): 添加了ficus-mindmap插件包)
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
    const onChange = () => console.log('text')
    return {
      data,
      onChange
    }
  }
})
</script>
