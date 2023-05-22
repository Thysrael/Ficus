<template>
  <div class="pl-2 pr-4" style="font-family: 'Noto Sans SC'">
    <div style="font-size: 13px" class="my-2">
      节点详情信息
    </div>
    <div style="font-size: 12px; margin-top: 15px;">
      <b>节点名</b>: {{ node.name }}
    </div>
    <div style="font-size: 12px; margin-top: 15px;" v-if="type !== 2">
      <b>节点路径</b>: {{ node.path }}
    </div>
    <div style="font-size: 12px; margin-top: 15px;" v-if="type === 2">
      该tag下有 {{ node.fileNum }} 个文件，分别位于 {{ node.pathNum }} 个路径下
    </div>
    <div style="font-size: 12px; margin-top: 15px;" v-if="type === 1">
      该文件共引用 {{ node.citing }} 个文件，被 {{ node.cited }} 个文件引用
    </div>
    <hr style="border: none;border-top: 2px solid #ccc;height: 1px;margin: 20px 0;">
    <ul>
      <li v-for="(item, index) in node.children" :key="index">
        <GraphItem :unit="item"></GraphItem>
      </li>
    </ul>
    <hr style="border: none;border-top: 2px solid #ccc;height: 1px;margin: 20px 0;">
    <button class="optionBtn1" @click="quitGraph">
      退出榕图
    </button>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'
import GraphItem from '@/renderer/components/sideBar/GraphItem'
import { ref } from 'vue'

export default {
  name: 'GraphBar',
  components: { GraphItem },
  setup () {
    const type = ref(0) // 当前节点类型：文件夹 0 ，文件 1 ，标签 2

    const node = ref({
      name: '未选中任何节点',
      path: '无'
    })

    function handleProcess () {
      bus.emit('showMyAlert', { message: '敬请期待！' })
    }

    function quitGraph () {
      bus.emit('quitFromGraph', 0)
    }

    bus.on('curNode', async (obj) => {
      console.log(obj)
      type.value = obj.category // 当前节点类型：文件夹 0 ，文件 1 ，标签 2
      if (obj.category === 0) { /* empty */ } else if (obj.category === 1) {
        node.value = await window.electronAPI.getFileCiteTraverse(obj.path)
        console.log(node.value)
      } else if (obj.category === 2) {
        node.value = await window.electronAPI.getTagGroups(obj.name)
        console.log(node.value)
      }
    })

    return {
      handleProcess,
      quitGraph,
      node,
      type
    }
  }
}
</script>

<style scoped>
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

.optionBtn1 {
  margin-left: 10px;
  margin-top: 10px;
  width: 130px;
  height: 25px;
  border-radius: 3px;
  opacity: 1;
  background-color: #7b88b7;
  font-size: 12px;
  font-family: "Noto Sans SC";
  font-weight: lighter;
  color: #FFFFFF
}

.optionBtn1:hover {
  background-color: #414862;
  -webkit-transition: .2s;
  -webkit-transition:left .2s, background-color .2s;
}

.optionBtn1:active {
  background-color: #3D3D3D;
}
</style>
