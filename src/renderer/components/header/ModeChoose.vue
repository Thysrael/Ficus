<template>
  <div class="flex object-contain px-2 py-1">
    <button class="flex-grow hover:text-blueGray-800 text-gray-500 font-semibold shadow-sm"
            style="font-size: 10px; -webkit-transition: color .5s; -webkit-transition:left .5s, background-color .5s;"
            :class="editMode === 0 ? `text-blueGray-800` : ``"
            :style="editMode === 0 ? `background-color: white; border-radius: 5px;` : ``"
            @click="changeEditMode(0)">
      文本
    </button>
    <button class="flex-grow hover:text-blueGray-800 text-gray-500 font-semibold shadow-sm"
            style="font-size: 10px; -webkit-transition: color .5s; -webkit-transition:left .5s, background-color .5s;"
            :class="editMode === 2 ? `text-blueGray-800` : ``"
            :style="editMode === 2 ? `background-color: white; border-radius: 5px;` : ``"
            @click="changeEditMode(2)">
      榕树
    </button>
    <button class="flex-grow hover:text-blueGray-800 text-gray-500 font-semibold shadow-sm"
            style="font-size: 10px; -webkit-transition: color .5s; -webkit-transition:left .5s, background-color .5s;"
            :class="editMode === 1 ? `text-blueGray-800` : ``"
            :style="editMode === 1 ? `background-color: white; border-radius: 5px;` : ``"
            @click="changeEditMode(1)">
      源码
    </button>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'
import { ref } from 'vue'

export default {
  name: 'ModeChoose',
  setup () {
    const editMode = ref(0)
    function changeEditMode (mode) {
      editMode.value = mode
      if (mode === 2) {
        bus.emit('changeToFicus')
      } else {
        bus.emit('changeEditMode', { mode })
      }
    }
    return {
      editMode,
      changeEditMode
    }
  }
}
</script>

<style scoped>

</style>
