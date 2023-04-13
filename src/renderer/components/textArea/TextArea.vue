<template>
  <div class="area-textArea">
    <TextUI :content="content" style="width: 100%;height: 100%;position: relative"></TextUI>
  </div>
</template>

<script>
import TextUI from '@/renderer/components/richTextEditor'
import { ref } from 'vue'
import bus from 'vue3-eventbus'
export default {
  name: 'TextArea',
  components: { TextUI },
  setup () {
    const content = ref('')
    bus.on('setEditorContent', (obj) => {
      console.log(obj)
      content.value = obj
    })
    return {
      content
    }
  }
}
</script>

<style scoped>

</style>
