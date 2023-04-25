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
      console.log('检测到修改', msg[0])
      bus.emit('saveChangeMindUI', msg[0])
    }
    const onSelect = (msg) => {
      // console.log(msg)
    }

    // 监听data变化
    bus.on('sendToFicTree', (obj) => {
      console.log('getObj: ', obj)
      data.value = [obj]
    })

    return {
      data,
      onChange,
      onSelect
    }
  }
})
</script>
