<template>
  <button class="optionBtn" style="text-align: center" @click="getDataBy(1)">
    从榕根选择
  </button><br>
  <button class="optionBtn" style="text-align: center" @click="getDataBy(2)">
    从榕柱选择
  </button><br>
  <button class="optionBtn" style="text-align: center" @click="handleClear">
    清除
  </button><br>
  <button class="optionBtn" style="text-align: center" @click="handleNewSet">
    新建基底
  </button><br>
  <button class="optionBtn" style="text-align: center" @click="handleOutput">
    导出
  </button><br>
  <div class="my-1 pl-2 pr-4 content-center items-center w-full mt-2">
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
import { ref } from 'vue'
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
      store.commit('filesManager/clearForest')
    }

    function handleOutput () {
      store.commit('filesManager/exportAll')
    }

    function handleNewSet () {
      store.commit('filesManager/addBaseToForest')
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
      store.dispatch('filesManager/updateFilesOfForest', selectedList)
    })

    return {
      files,
      handleClear,
      handleOutput,
      handleNewSet,
      getDataBy
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
  margin-left: 10px;
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
</style>
