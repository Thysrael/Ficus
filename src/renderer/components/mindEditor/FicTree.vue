<template>
  <mindmap v-model="data"
           drag="true"
           zoom="true"
           center-btn="true"
           fit-btn="true"
           download-btn="true"
           :branch="3"
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
    const init = () => {
      if (ficustree.value) {
        ficustree.value.init()
        // data.value = [obj]
      }
    }

    function exportPNG () {
      if (ficustree.value) {
        ficustree.value.downloadPNG()
      }
    }

    async function getData (obj) {
      data.value = [obj]
    }

    // 监听data变化
    bus.on('sendToFicTree', (obj) => {
      console.log('getObj: ', obj)
      getData(obj).then(init)
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
