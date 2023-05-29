<template>
  <div style="font-size: 14px; font-family: 'Noto Sans SC'; color: #565656"
       class="mt-4 mb-2 font-bold"
       v-if="unit.name !== undefined"
       :title="unit.name">
    {{ unit.name }}
  </div>
  <ul style="margin-top: 15px" v-if="unit.children.length !== 0">
    <li v-for="(path, key) in unit.children"
        :key="key">
      <div style="display: flex" class="items-center content-center relBarItem p-1 my-1">
        <div
            style="display: flex;"
            class="pl-1 flex"
            :class="(getShow(path)) ? `selectedElement` : `nonSelectedElement`"
        >
          <button style="margin-top: 8px" @click="changeShow(path)">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="20" height="15" viewBox="0 0 20 15"><defs><clipPath id="master_svg0_93_2922"><rect x="0" y="0" width="15" height="15" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_93_2922)"><g></g><g></g><g><g><path d="M13.04039189376831,10.861825785446166L8.35336189376831,0.5489007854461669C8.20148189376831,0.21468178544616698,7.868201893768311,-0.0004742145538330078,7.49976189376831,-0.0004742145538330078C7.13180189376831,-0.0004742145538330078,6.79851189376831,0.21468178544616698,6.6464118937683105,0.5489007854461669L1.9589075937683105,10.861625785446167C1.8271888937683105,11.151825785446167,1.8517982937683106,11.489725785446167,2.0238298937683106,11.756925785446168C2.1970328937683106,12.025525785446167,2.4937518937683105,12.187525785446168,2.8122678937683103,12.187525785446168L6.562271893768311,12.187525785446168L6.562271893768311,14.062525785446168C6.562271893768311,14.580725785446168,6.98156189376831,15.000025785446168,7.499771893768311,15.000025785446168C8.01820189376831,15.000025785446168,8.43750189376831,14.580725785446168,8.43750189376831,14.062525785446168L8.43750189376831,12.187525785446168L12.18699189376831,12.187525785446168C12.50559189376831,12.187525785446168,12.802291893768311,12.025525785446167,12.976191893768311,11.757225785446167C13.148391893768311,11.489725785446167,13.172091893768311,11.152025785446167,13.04039189376831,10.861825785446166Z" fill="#89D3B1" fill-opacity="1"/></g></g></g></svg>
          </button>
          <div :class="getShow(path) ? `pointer-events-auto` : `pointer-events-none`"
              @click="getFocusedById(path)" class="pl-2 overflow-hidden align-middle content-center flex flex-wrap" id="btnRef">
            <div style="font-size: 12px"
                 :title="path">
              {{ getName(path) }}
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <div v-else style="font-size: 12px; color: #565656">
    暂无结果
  </div>

  <div class="mt-2 mb-4 place-content-center content-center justify-center flex flex-wrap"
       v-if="unit.children.length !== 0">
    <button class="optionBtn flex align-middle justify-center content-center py-1" @click="handle"
            v-if="showHandle">
      {{ unit.handle }}
    </button>
  </div>
</template>

<script>

import bus from 'vue3-eventbus'
import store from '@/renderer/store'
import { ref } from 'vue'

export default {
  name: 'GraphItem',
  props: {
    unit: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    showHandle: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const hide = ref([])

    function changeShow (path) {
      const index = hide.value.findIndex(filePath => filePath === path)
      if (index === -1) {
        // 隐藏
        // store.commit('files/queryNodeId', { name: path, hidden: true })
        hide.value.push(path)
      } else {
        // 显示
        // store.commit('files/queryNodeId', { name: path, hidden: false })
        hide.value.splice(index, 1)
      }
    }

    function getShow (path) {
      for (let i = 0; i < hide.value.length; i++) {
        if (path === hide.value[i]) {
          return false
        }
      }
      return true
    }

    function getName (path) {
      return window.pathAPI.basename(path)
    }

    function handle () {
      hide.value.length = 0
      bus.emit('handle', props.index)
    }

    function getFocusedById (path) {
      store.commit('files/queryNodeId', { name: path, timeout: 50 })
    }

    return {
      getShow,
      changeShow,
      getName,
      handle,
      getFocusedById
    }
  }
}
</script>

<style scoped>
.optionBtn {
  margin-left: 10px;
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
  -webkit-transition: left .2s, background-color .2s;
}

.optionBtn:active {
  background-color: #3D3D3D;
}

.relBarItem {
  font-family: "Noto Sans SC";
}

.relBarItem:hover {
  background-color: #e3e3e3;
  border-radius: 6px;
  -webkit-transition: .2s;
}

.selectedElement {
  padding: 4px;
  color: #3d3d3d;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-transition: .2s;
}

.selectedElement path {
  fill: #66eaae;
  -webkit-transition: .2s;
}

.selectedElement:hover {
  background-color: #e3e3e3;
  border-radius: 8px;
  -webkit-transition: .2s;
}

.nonSelectedElement {
  padding: 4px;
  color: #909090;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nonSelectedElement:hover {
  background-color: #e3e3e3;
  border-radius: 8px;
  -webkit-transition: .2s;
}

.nonSelectedElement path {
  fill: #6b6b6b;
  -webkit-transition: .2s;
}
</style>
