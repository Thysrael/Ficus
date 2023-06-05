<template>
  <div class="place-content-center content-center justify-center flex flex-wrap">
    <button class="optionBtn py-1 flex align-middle justify-center content-center" style="text-align: center" @click="handleClear">
      清除
    </button>
  </div>
  <div class="place-content-center content-center justify-center flex flex-wrap">
    <button class="optionBtn py-1 flex align-middle justify-center content-center" style="text-align: center" @click="handleNewSet">
      新建基底
    </button>
  </div>
  <div class="place-content-center content-center justify-center flex flex-wrap">
    <button class="optionBtn py-1 flex align-middle justify-center content-center" style="text-align: center" @click="handleOutput">
      导出
    </button>
  </div>
  <div class="mt-5 place-content-center content-center justify-center flex flex-wrap">
    <a href="#" class="flex p-4 optionBar" @click="getDataBy(1)"
         :style="dataOption === 1 ? `color: #42b983; font-weight: 900; background-color: #eeeeee` : `color: #565656`">
      榕根选择
    </a>
    <a href="#" class="flex p-4 optionBar" @click="getDataBy(2)"
         :style="dataOption === 2 ? `color: #42b983; font-weight: 900; background-color: #eeeeee` : `color: #565656`">
      榕柱选择
    </a>
  </div>
  <div class="my-1 pl-2 pr-2 content-center items-center w-full mt-2">
    <ul style="margin-top: 15px">
      <ForestItem v-for="(item, index) in files"
          :key="index"
          :item="item">
        </ForestItem>
    </ul>
  </div>
</template>

<script>
import ForestItem from '@/renderer/components/sideBar/ForestItem'
import { onMounted, ref } from 'vue'
import bus from 'vue3-eventbus'
import store from '@/renderer/store'
export default {
  name: 'ForestBar',
  components: { ForestItem },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const files = ref([])

    const selectedList = []

    const dataOption = ref(0)

    onMounted(() => {
      getDataBy(1)
    })

    /**
     *
     * @param: array
     */
    function getDataByArray (array) {
      if (array === undefined || array.length === 0) {
        return []
      }
      const res = []
      for (let i = 0; i < array.length; i++) {
        if (array[i].type === 'file' && !window.pathAPI.isMarkdownExtname(array[i].path)) {
          continue
        }
        const obj = {
          name: array[i].name,
          path: array[i].path,
          selected: false,
          type: array[i].type,
          children: getDataByArray(array[i].children)
        }
        res.push(obj)
      }
      return res
    }

    /**
     * 1: root 2: tag
     * @param option
     */

    async function getDataBy (option) {
      dataOption.value = option
      if (option === 1) {
        if (props.data.length === 0) {
          bus.emit('showMyAlert', { message: '请先打开文件夹' })
        } else {
          files.value.length = 0
          files.value = getDataByArray(props.data)
        }
      } else if (option === 2) {
        files.value.length = 0
        const allTag = await window.electronAPI.getTags()
        console.log(allTag)
        for (let i = 0; i < allTag.length; i++) {
          const array = await window.electronAPI.getFilesByTag(allTag[i])
          const res = []
          for (let j = 0; j < array.length; j++) {
            res.push({
              name: window.pathAPI.basename(array[j]),
              path: array[j],
              selected: false,
              type: 'file',
              children: []
            })
          }
          files.value.push({
            name: allTag[i],
            selected: false,
            type: 'tag',
            children: res
          })
        }
      }
    }

    function handleClear () {
      clearSelected(files.value)
      store.commit('files/clearForest')
    }

    function handleOutput () {
      store.commit('files/exportAll')
    }

    function handleNewSet () {
      store.commit('files/addBaseToForest')
    }

    function clearSelected (array) {
      if (array.length === 0) {
        return
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].selected) {
          array[i].selected = false
        }
        if (array[i].type !== 'file' && array[i].children !== undefined) {
          clearSelected(array[i].children)
        }
      }
    }

    function getSelected (array) {
      if (array.length === 0) {
        return
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].type === 'file' && array[i].selected) {
          selectedList.push(array[i].path)
        }
        if (array[i].type !== 'file' && array[i].children !== undefined) {
          getSelected(array[i].children)
        }
      }
    }

    bus.on('sendDataToForest', () => {
      selectedList.length = 0
      getSelected(files.value)
      store.dispatch('files/updateFilesOfForest', selectedList)
    })

    bus.on('clearForestResult', () => {
      files.value.length = 0
      store.commit('files/clearForest')
    })

    return {
      files,
      handleClear,
      handleOutput,
      handleNewSet,
      getDataBy,
      dataOption
    }
  }
}
</script>

<style scoped>
.searchBtn:hover path {
  fill: #42b983;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
  -webkit-transition:left .3s, fill .3s;
}

.searchBtn:active path {
  fill: #19734b;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
  -webkit-transition:left .3s, fill .3s;
}

::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}

.relBarItem {
  font-family: "Noto Sans SC";
}

.relBarItem:hover {
  background-color: #e3e3e3;
  border-radius: 6px;
  -webkit-transition: .2s;
}

.optionBtn {
  margin-top: 10px;
  width: 130px;
  height: 25px;
  border-radius: 3px;
  opacity: 1;
  background-color: #5dcc9a;
  font-size: 12px;
  font-family: "Noto Sans SC";
  font-weight: lighter;
  color: #FFFFFF
}

.optionBtn:hover {
  background-color: #19734b;
  -webkit-transition: .2s;
  -webkit-transition:left .2s, background-color .2s;
}

.optionBtn:active {
  background-color: #3D3D3D;
}

.optionBar {
  border-radius: 8px;
  font-size: 14px;
}

.optionBar:hover {
  background-color: #e3e3e3;
  -webkit-transition: .2s;
  font-weight: 900;
}
</style>
