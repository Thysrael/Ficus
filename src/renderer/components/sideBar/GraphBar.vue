<template>
  <div class="searchBar content-center items-center w-full mt-2 mb-4 pl-2 pr-4" style="display: flex">
    <div class="mr-2 w-full">
      <input class="area-search-tab w-full px-2 placeholder-gray text-sm"
             style="font-family: 'Noto Sans SC'; font-weight: lighter; font-size: 12px" v-model="keyWord"
             placeholder="搜索节点" type="text" @keyup.enter="handleSearch"/>
    </div>
    <button class="searchBtn" @click="handleSearch">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
           width="15" height="15" viewBox="0 0 10 10">
        <g style="mix-blend-mode:passthrough" clip-path="url(#master_svg0_71_1377)">
          <g style="mix-blend-mode:passthrough">
            <path
                d="M4.583335876464844,1.6666631544189454C2.9725058764648438,1.6666631544189454,1.6666688764648439,2.9725001544189453,1.6666688764648439,4.583330154418945C1.6666688764648439,6.194160154418945,2.9725058764648438,7.500000154418945,4.583335876464844,7.500000154418945C5.369125876464844,7.500000154418945,6.082375876464844,7.1892501544189455,6.606835876464844,6.683910154418945C6.617795876464844,6.6696601544189456,6.6297958764648435,6.655910154418946,6.642875876464844,6.6428701544189455C6.655915876464844,6.629790154418945,6.669665876464844,6.6177901544189455,6.683915876464844,6.606830154418946C7.189255876464844,6.082370154418945,7.500005876464844,5.369120154418946,7.500005876464844,4.583330154418945C7.500005876464844,2.9725001544189453,6.194165876464844,1.6666631544189454,4.583335876464844,1.6666631544189454C4.583335876464844,1.6666631544189454,4.583335876464844,1.6666631544189454,4.583335876464844,1.6666631544189454ZM7.513295876464844,6.924040154418945C8.026455876464844,6.282500154418945,8.333335876464844,5.468750154418945,8.333335876464844,4.583330154418945C8.333335876464844,2.5122601544189456,6.654415876464844,0.8333301544189453,4.583335876464844,0.8333301544189453C2.512265876464844,0.8333301544189453,0.8333358764648438,2.5122601544189456,0.8333358764648438,4.583330154418945C0.8333358764648438,6.654410154418946,2.512265876464844,8.333330154418945,4.583335876464844,8.333330154418945C5.468755876464844,8.333330154418945,6.282505876464843,8.026460154418945,6.924045876464843,7.513290154418946C6.924045876464843,7.513290154418946,8.455375876464844,9.044620154418945,8.455375876464844,9.044620154418945C8.618085876464843,9.207330154418946,8.881915876464843,9.207330154418946,9.044625876464844,9.044620154418945C9.207335876464844,8.881910154418945,9.207335876464844,8.618080154418944,9.044625876464844,8.455370154418945C9.044625876464844,8.455370154418945,7.513295876464844,6.924040154418945,7.513295876464844,6.924040154418945C7.513295876464844,6.924040154418945,7.513295876464844,6.924040154418945,7.513295876464844,6.924040154418945Z"
                fill-rule="evenodd" fill="#767676" fill-opacity="1"/>
          </g>
        </g>
      </svg>
    </button>
  </div>
  <div v-bind:class="{'hidden': !showM, 'block': showM}"
       @mouseleave="handleSearch"
       class="items-center content-center overflow-y-auto transition-all ease-linear bg-white border-0 shadow-md mr-3 py-2 block font-normal text-base text-left no-underline break-words rounded-lg"
       style="position: fixed; font-family: 'Noto Sans SC'; max-height: 300px; width: 150px; z-index: 999">
    <div v-for="(path, index) in resNodes"
         class="px-3 py-1 option"
         :key="index"
         @click="handleFocus(path)">
      {{ path }}
    </div>
  </div>
  <div class="px-2" style="font-family: 'Noto Sans SC'">
    <div style="font-size: 14px" class="my-2 flex flex-wrap font-semibold content-center place-content-center">
      节点信息
      <div @click="showInfo = !showInfo" class="ml-2 foldIcon">
        <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" v-if="showInfo"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M11.47 5.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 01-1.06 1.06L12 6.81 9.28 9.53a.75.75 0 01-1.06-1.06l3.25-3.25z"></path><path fill-rule="evenodd" d="M12 5.5a.75.75 0 01.75.75v8a.75.75 0 01-1.5 0v-8A.75.75 0 0112 5.5zM10.75 18a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-8 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm12 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-8 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm12 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z"></path></g></svg>
        <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" v-else><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M12 19a.75.75 0 01-.53-.22l-3.25-3.25a.75.75 0 111.06-1.06L12 17.19l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25A.75.75 0 0112 19z"></path><path fill-rule="evenodd" d="M12 18a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 18zM10.75 6a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-8 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 012.75 6zm12 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-8 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 016.75 6zm12 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z"></path></g></svg>
      </div>
    </div>
    <hr style="border: none;border-top: 1px solid #ccc;height: 1px;margin: 2px 0;">
    <div v-if="showInfo">
      <div class="nodeInfo mt-2" :title="node.name">
        <div class="font-bold my-1" style="font-size: 14px; color: #565656"> 节点名 </div>
        <div class="nodeSubInfo"> {{ node.name }} </div>
      </div>
      <div class="nodeInfo mt-2" v-if="type !== 2" :title="node.path">
        <div class="font-bold my-1" style="font-size: 14px; color: #565656"> 节点路径 </div>
        <div class="nodeSubInfo"> {{ node.path }} </div>
      </div>
      <div class="nodeInfo mt-2" >
        <div class="font-bold my-1" style="font-size: 14px; color: #565656">
          节点详情
        </div>
        <div class="nodeSubInfo" v-if="type === 2">
          该 tag 下有 {{ node.fileNum }} 个文件<br>
          分别位于 {{ node.pathNum }} 个路径下
        </div>
        <div class="nodeSubInfo" v-else-if="type === 1">
          该文件共引用 {{ node.citing }} 个文件<br>
          被 {{ node.cited }} 个文件引用
        </div>
        <div class="nodeSubInfo" v-else-if="type === 0">
          文件夹节点
        </div>
        <div class="nodeSubInfo" v-else>
          暂无节点信息
        </div>
      </div>
    </div>

    <div style="font-size: 14px" class="mt-8 mb-2 flex flex-wrap font-semibold content-center place-content-center">
      节点操作
      <div @click="showOpt = !showOpt" class="ml-2 foldIcon">
        <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" v-if="showOpt"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M11.47 5.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 01-1.06 1.06L12 6.81 9.28 9.53a.75.75 0 01-1.06-1.06l3.25-3.25z"></path><path fill-rule="evenodd" d="M12 5.5a.75.75 0 01.75.75v8a.75.75 0 01-1.5 0v-8A.75.75 0 0112 5.5zM10.75 18a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-8 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm12 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-8 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm12 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z"></path></g></svg>
        <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" v-else><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M12 19a.75.75 0 01-.53-.22l-3.25-3.25a.75.75 0 111.06-1.06L12 17.19l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25A.75.75 0 0112 19z"></path><path fill-rule="evenodd" d="M12 18a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 18zM10.75 6a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-8 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 012.75 6zm12 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-8 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 016.75 6zm12 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z"></path></g></svg>
      </div>
    </div>
    <hr style="border: none;border-top: 1px solid #ccc;height: 1px;margin: 2px 0;">
    <ul v-if="showOpt" class="mt-2">
      <li v-for="(item, index) in node.children" :key="index">
        <GraphItem :show-handle="node.path !== data[0].path" :unit="item" :index="index"></GraphItem>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'
import GraphItem from '@/renderer/components/sideBar/GraphItem'
import { ref, toRaw } from 'vue'
import store from '@/renderer/store'

export default {
  name: 'GraphBar',
  components: { GraphItem },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup () {
    const keyWord = ref('')
    const showM = ref(false)
    const resNodes = ref(['name', 'name2', 'name3'])

    const type = ref(-1) // 当前节点类型：未选中 -1， 文件夹 0 ，文件 1 ，标签 2
    let unit

    const node = ref({
      name: '未选中任何节点',
      path: '无'
    })
    const showInfo = ref(true)
    const showOpt = ref(true)

    function handleProcess () {
      bus.emit('showMyAlert', { message: '敬请期待！' })
    }

    function quitGraph () {
      bus.emit('quitFromGraph', 0)
    }

    bus.on('makeNewTag', (tagName) => {
      if (type.value === 0) {
        window.electronAPI.folderToTag(tagName)
      } else if (type.value === 1) {
        window.electronAPI.citeToTag(tagName, [node.value.path, ...unit.children])
        setTimeout(() => {
          bus.emit('changeToGraph')
        }, 100)
      }
    })

    /**
     * @param: {obj} unit
     */

    bus.on('handle', (index) => {
      unit = toRaw(node.value.children[index])
      if (type.value === 0) {
        bus.emit('showDialogForNewTag')
      } else if (type.value === 1) {
        bus.emit('showDialogForNewTag')
      } else if (type.value === 2) {
        window.electronAPI.tagToFolder(node.value.name, unit.name, unit.children)
      }
    })

    bus.on('curNode', async (obj) => {
      type.value = obj.category // 当前节点类型：文件夹 0 ，文件 1 ，标签 2
      if (obj.category === 0) {
        node.value = await window.electronAPI.getFolderStatInGraph(obj.path)
        for (let i = 0; i < node.value.children.length; i++) {
          node.value.children[i].name = node.value.path
        }
      } else if (obj.category === 1) {
        node.value = await window.electronAPI.getFileCiteTraverse(obj.path)
      } else if (obj.category === 2) {
        node.value = await window.electronAPI.getTagGroups(obj.name)
      }
    })

    bus.on('clearGraphResult', () => {
      node.value = {
        name: '未选中任何节点',
        path: '无'
      }
      type.value = -1
    })

    bus.on('sendNodesResult', ({ nodes }) => {
      resNodes.value.length = 0
      for (let i = 0; i < nodes.length; i++) {
        const obj = nodes[i]
        if (obj.category === 2) {
          resNodes.value.push(obj.name)
        } else {
          resNodes.value.push(obj.path)
        }
      }
    })

    async function handleSearch () {
      if (showM.value === false) {
        showM.value = true
        // 获取resNodes
        store.commit('files/queryNodesByToken', keyWord.value)
      } else {
        showM.value = false
      }
    }

    function handleFocus (path) {
      store.commit('files/queryNodeId', { name: path, timeout: 50 })
    }

    return {
      handleProcess,
      handleSearch,
      quitGraph,
      handleFocus,
      keyWord,
      resNodes,
      node,
      type,
      showInfo,
      showOpt,
      showM
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
  background-color: #565656;
}

.optionBtn1 {
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
  background-color: #565656;
}

.nodeInfo {
  font-family: "Noto Sans SC";
  padding: 3px;
}

.nodeSubInfo {
  font-size: 12px;
  color: #565656;
}

.nodeInfo:hover {
  background-color: #e3e3e3;
  border-radius: 6px;
  -webkit-transition: .2s;
}

.foldIcon:hover path {
  fill: #5dcc9a;
  -webkit-transition: .2s;
}

.foldIcon:active path {
  fill: #19734b;
  -webkit-transition: .2s;
}

.searchBar {
  display: flex;
  opacity: 1;
}

.searchBtn:hover path {
  fill: #42b983;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
}

.searchBtn:active path {
  fill: #19734b;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
}

.option {
  font-size: 12px;
}

.option:hover {
  background-color: #e5e5e5;
  font-weight: 900;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}

.option:active {
  background-color: #c9c9c9;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}
</style>
