<template>
  <div class="pl-2 pr-4" style="font-family: 'Noto Sans SC'">
    <div style="font-size: 13px" class="my-2">
      节点详情信息
    </div>
    <div style="font-size: 12px; margin-top: 15px;">
      <b>节点名</b>: {{ test.name }}
    </div>
    <div style="font-size: 12px; margin-top: 15px;">
      <b>节点路径</b>: {{ test.path }}
    </div>
    <div style="font-size: 12px; margin-top: 15px;">
      该tag下有 {{ test.fileNum }} 个文件，分别位于 {{ test.pathNum }} 个路径下
    </div>
    <div style="font-size: 12px; margin-top: 15px;">
      该文件共引用 {{ test.citing }} 个文件，被 {{ test.cited }} 个文件引用
    </div>
    <hr style="border: none;border-top: 2px solid #ccc;height: 1px;margin: 20px 0;">
    <ul>
      <li v-for="(item, index) in test.children" :key="index">
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

    const test = ref({
      name: '选中文件',
      path: '我在这里',
      fileNum: 2,
      pathNum: 3,
      citing: 2,
      cited: 3,
      children: [{
        name: '正向遍历',
        children: [{
          name: 'a.md',
          path: 'c/a.md'
        }],
        handle: '转变为tag'
      }, {
        name: '逆向遍历',
        children: [{
          name: 'b.md',
          path: 'c/b.md'
        }],
        handle: '转变为tag'
      }, {
        name: '无向遍历',
        children: [{
          name: 'e.md',
          path: 'c/e.md'
        }],
        handle: '转变为tag'
      }]
    })

    function handleProcess () {
      bus.emit('showMyAlert', { message: '敬请期待！' })
    }

    function quitGraph () {
      bus.emit('quitFromGraph', 0)
    }

    bus.on('curNode', (obj) => {
      console.log(obj)
      console.log(obj.name)
      console.log(obj.path)
      type.value = obj.category

      const me = {}

      test.value = me
    })

    return {
      handleProcess,
      quitGraph,
      test,
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
