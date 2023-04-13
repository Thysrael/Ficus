<template>
  <div>
    <button style="position: absolute;margin-left: 7.5px;margin-top: 2.5px;width: 48px;height: 15px;opacity: 1;font-size: 10px" @click="changeEditMode(0)">文本模式</button>
    <button style="position: absolute;margin-left: 60px;margin-top: 2.5px;width: 58px;height: 15px;opacity: 1;font-size: 10px">Ficus模式</button>
    <button style="position: absolute;margin-left: 118.5px;margin-top: 2.5px;width: 48px;height: 15px;opacity: 1;font-size: 10px" @click="changeEditMode(1)">源码模式</button>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'

export default {
  name: 'ModeChoose',
  setup () {
    function changeEditMode (mode) {
      bus.emit('changeEditMode', { mode })
    }
    return {
      changeEditMode
    }
  }
}
</script>

<style scoped>

</style>
