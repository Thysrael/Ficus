<template>
  <button class="optionBtn" style="text-align: center">
    从榕根选择
  </button><br>
  <button class="optionBtn" style="text-align: center">
    从榕柱选择
  </button><br>
  <button class="optionBtn" style="text-align: center">
    清除
  </button><br>
  <button class="optionBtn" style="text-align: center">
    新建基底
  </button><br>
  <button class="optionBtn" style="text-align: center">
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
    // const files = ref([{
    //   name: 'components',
    //   path: 'app2\\src\\components',
    //   selected: false,
    //   type: 'folder',
    //   children: [{
    //     name: 'File',
    //     path: 'app2\\src\\components\\File',
    //     selected: false,
    //     type: 'folder',
    //     children: [{
    //       name: 'FileNav.vue',
    //       path: 'app2\\src\\components\\File\\FileNav.vue',
    //       selected: false,
    //       children: [],
    //       type: 'file'
    //     }]
    //   }]
    // }, {
    //   name: 'components',
    //   path: 'app2\\src\\components',
    //   selected: false,
    //   type: 'folder',
    //   children: [{
    //     name: 'File',
    //     path: 'app2\\src\\components\\File',
    //     selected: false,
    //     type: 'folder',
    //     children: [{
    //       name: 'FileNav.vue',
    //       path: 'app2\\src\\components\\File\\FileNav.vue',
    //       selected: false,
    //       children: [],
    //       type: 'file'
    //     }]
    //   }]
    // }])

    const files = ref(props.data)

    // onMounted(() => {
    //
    // })

    const selectedList = []

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
    })

    return {
      files
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
