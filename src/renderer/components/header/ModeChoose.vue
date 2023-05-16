<template>
  <div class="flex object-contain px-2 py-1" v-show="(mode >= 0 && mode <= 2)">
    <button class="flex-grow modeTab hover:text-blueGray-800 text-gray-500 font-semibold shadow-sm"
            :class="editMode === 0 ? `text-blueGray-800` : ``"
            :style="editMode === 0 ? `background-color: white; border-radius: 5px;` : ``"
            @click="changeEditMode(0)">
      文本
    </button>
    <button class="flex-grow modeTab hover:text-blueGray-800 text-gray-500 font-semibold shadow-sm"
            :class="editMode === 2 ? `text-blueGray-800` : ``"
            :style="editMode === 2 ? `background-color: white; border-radius: 5px;` : ``"
            @click="changeEditMode(2)">
      榕树
    </button>
    <button class="flex-grow modeTab hover:text-blueGray-800 text-gray-500 font-semibold shadow-sm"
            :class="editMode === 1 ? `text-blueGray-800` : ``"
            :style="editMode === 1 ? `background-color: white; border-radius: 5px;` : ``"
            @click="changeEditMode(1)">
      源码
    </button>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'
import { computed, ref } from 'vue'
import store from '@/renderer/store'

export default {
  name: 'ModeChoose',
  setup () {
    const editMode = ref(0)
    const mode = computed(() => {
      return store.getters.getMode
    })

    function changeEditMode (mode) {
      editMode.value = mode
      bus.emit('changeShowMode', mode)
      bus.emit('changeMode', mode)
    }

    /**
     * 模式切换
     * @param obj {{mode: int}}
     */

    bus.on('changeModeChoose', (mode) => {
      changeEditMode(mode)
    })

    // 回到进入榕视图之前的模式
    bus.on('backToEditMode', () => {
      bus.emit('changeMode', editMode.value)
    })
    return {
      editMode,
      mode,
      changeEditMode
    }
  }
}
</script>

<style scoped>
.modeTab {
  font-size: 11px;
  font-family: "Noto Sans SC";
  -webkit-transition: left .5s, color .5s;
  -webkit-transition:left .5s, background-color .5s;
}
</style>
