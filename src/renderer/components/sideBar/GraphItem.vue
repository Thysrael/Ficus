<template>
  <div style="font-size: 14px; font-family: 'Noto Sans SC'; color: #565656"
       class="mt-4 mb-2 font-bold"
       v-if="unit.name !== undefined"
       :title="unit.name">
    <a  href="#"
        style="display: flex;"
        class="pl-1 flex align-middle justify-center content-center"
        :class="(showAll) ? `selectedElement` : `nonSelectedElement`"
    >
      <div @click="changeShowAll" class="flex align-middle content-center place-content-center flex-wrap pt-2">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 15 15"><defs><clipPath id="master_svg0_218_1030"><rect x="0" y="0" width="15" height="15" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_218_1030)"><g></g><g></g><g><g><path d="M8.75,7.8125L7.8125,7.8125L7.8125,6.85C8.88779,6.6948,9.68623,5.77393,9.6875,4.6875C9.6875,3.60625,8.81562,0.9375,7.5,0.9375C7.26557,0.942652,7.03892,1.022581,6.85313,1.165625C7.39646,2.26695,7.7222,3.46276,7.8125,4.6875C7.81177,5.48694,7.47087,6.24829,6.875,6.78125C6.97748,6.81201,7.08188,6.83602,7.1875,6.85313L7.1875,7.8125L5.3125,7.8125L5.3125,6.85C6.38779,6.6948,7.18623,5.77393,7.1875,4.6875C7.1875,3.75,6.39062,0.3125,5,0.3125C3.60937,0.3125,2.8125,3.75,2.8125,4.6875C2.81377,5.77393,3.61221,6.6948,4.6875,6.85L4.6875,7.8125L2.8125,7.8125L2.8125,6.85313C2.91812,6.83602,3.02251,6.81201,3.125,6.78125C2.52913,6.24829,2.18823,5.48694,2.1875,4.6875C2.2778,3.46276,2.60354,2.26695,3.14687,1.165625C2.96108,1.022581,2.73443,0.942652,2.5,0.9375C1.184375,0.9375,0.3125,3.60625,0.3125,4.6875C0.31377304,5.77393,1.1122100000000001,6.6948,2.1875,6.85L2.1875,7.8125L1.25,7.8125C0.732233,7.8125,0.3125,8.232230000000001,0.3125,8.75L0.3125,9.375C0.3125,9.54759,0.452411,9.6875,0.625,9.6875L9.375,9.6875C9.54759,9.6875,9.6875,9.54759,9.6875,9.375L9.6875,8.75C9.6875,8.232230000000001,9.26777,7.8125,8.75,7.8125Z" fill="#89D3B1" fill-opacity="1"/></g></g></g></svg>
      </div>
      <div :title="unit.name" class="align-middle content-center flex flex-wrap">
        <div class="whitespace-nowrap overflow-hidden overflow-ellipsis" style="max-width: 140px">
          {{ unit.name }}
        </div>
      </div>
    </a>
  </div>
  <ul v-if="unit.children.length !== 0" class="border-l-2 border-gray-200 mt-1 ml-4 pr-2">
    <li v-for="(path, key) in unit.children"
        :key="key">
      <a href="#" style="display: flex" class="items-center content-center relBarItem p-1 my-1">
        <div
            style="display: flex;"
            class="pl-1 flex"
            :class="(getShow(path)) ? `selectedElement` : `nonSelectedElement`"
        >
          <div @click="changeShow(path)" class="flex align-middle content-center place-content-center flex-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="20" height="15" viewBox="0 0 20 15"><defs><clipPath id="master_svg0_93_2922"><rect x="0" y="0" width="15" height="15" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_93_2922)"><g></g><g></g><g><g><path d="M13.04039189376831,10.861825785446166L8.35336189376831,0.5489007854461669C8.20148189376831,0.21468178544616698,7.868201893768311,-0.0004742145538330078,7.49976189376831,-0.0004742145538330078C7.13180189376831,-0.0004742145538330078,6.79851189376831,0.21468178544616698,6.6464118937683105,0.5489007854461669L1.9589075937683105,10.861625785446167C1.8271888937683105,11.151825785446167,1.8517982937683106,11.489725785446167,2.0238298937683106,11.756925785446168C2.1970328937683106,12.025525785446167,2.4937518937683105,12.187525785446168,2.8122678937683103,12.187525785446168L6.562271893768311,12.187525785446168L6.562271893768311,14.062525785446168C6.562271893768311,14.580725785446168,6.98156189376831,15.000025785446168,7.499771893768311,15.000025785446168C8.01820189376831,15.000025785446168,8.43750189376831,14.580725785446168,8.43750189376831,14.062525785446168L8.43750189376831,12.187525785446168L12.18699189376831,12.187525785446168C12.50559189376831,12.187525785446168,12.802291893768311,12.025525785446167,12.976191893768311,11.757225785446167C13.148391893768311,11.489725785446167,13.172091893768311,11.152025785446167,13.04039189376831,10.861825785446166Z" fill="#89D3B1" fill-opacity="1"/></g></g></g></svg>
          </div>
          <div :class="getShow(path) ? `pointer-events-auto` : `pointer-events-none`"
              @click="getFocusedById(path)" class="pl-2 align-middle content-center flex flex-wrap" id="btnRef">
            <div style="font-size: 12px"
                 class="whitespace-nowrap overflow-hidden overflow-ellipsis"
                 :title="path">
              {{ getName(path) }}
            </div>
          </div>
        </div>
      </a>
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
    const showAll = ref(true)

    function changeShowAll () {
      if (showAll.value === true) {
        showAll.value = false
        // 全部隐藏
        for (let i = 0; i < props.unit.children.length; i++) {
          if (getShow(props.unit.children[i]) === true) {
            changeShow(props.unit.children[i])
          }
        }
      } else {
        showAll.value = true
        // 全部显示
        for (let i = 0; i < props.unit.children.length; i++) {
          if (getShow(props.unit.children[i]) === false) {
            changeShow(props.unit.children[i])
          }
        }
      }
    }

    function changeShow (path) {
      const index = hide.value.findIndex(filePath => filePath === path)
      if (index === -1) {
        // 隐藏
        store.commit('files/queryNodeId', { name: path, hidden: true })
        hide.value.push(path)
      } else {
        // 显示
        store.commit('files/queryNodeId', { name: path, hidden: false })
        hide.value.splice(index, 1)
      }
      if (hide.value.length === props.unit.children.length) {
        showAll.value = false
      } else if (hide.value.length === 0) {
        showAll.value = true
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
      showAll,
      getShow,
      changeShow,
      changeShowAll,
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
  color: #565656;
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

.selectedElement:hover path {
  fill: #a1a1a1;
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

.nonSelectedElement:hover path {
  fill: #a1a1a1;
  -webkit-transition: .2s;
}

.nonSelectedElement path {
  fill: #6b6b6b;
  -webkit-transition: .2s;
}
</style>
