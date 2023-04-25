<template>
  <mindmap v-model="data"
           drag="true"
           zoom="true"
           center-btn="true"
           fit-btn="true"
           download-btn="true"
           ctm="true"
           @update:model-value="onChange"
           @select="onSelect"
           ref="ficustree"
  >
  </mindmap>
</template>

<script>
import { defineComponent, ref } from 'vue'
import mindmap from 'ficus-mindmap'
import 'ficus-mindmap/dist/style.css'
import bus from 'vue3-eventbus'

export default defineComponent({
  components: {
    mindmap
  },
  setup () {
    const data = ref([{
      name: ''
    }])
    const onChange = (msg) => {
      console.log(msg[0])
      bus.emit('saveChangeMindUI', msg[0])
    }
    const onSelect = (msg) => {
      // console.log(msg)
    }
    const ficustree = ref()
    const init = (obj) => {
      if (ficustree.value) {
        ficustree.value.init([obj])
        // data.value = [obj]
      }
    }

    // 监听data变化
    bus.on('sendToFicTree', (obj) => {
      console.log('getObj: ', obj)
      init(obj)
    })

    bus.on('exportTreePNG', () => {
      exportPNG()
    })

    return {
      data,
      onChange,
      onSelect,
      ficustree
    }
  }
})
</script>
