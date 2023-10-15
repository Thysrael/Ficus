<template>
  <div class="flex flex-col area-header">
    <div class="area-header-top flex flex-wrap content-center items-center" style="z-index: 10000;display: flex;-webkit-app-region: drag;">
      <img v-if="hiddenHeaderButton" alt="logo" src="../../assets/bg_trans.png"
           @click="showMenu"
           class="appIcon"
           :title="'菜单'"/>
      <menu-list :data="data"
                class="absolute"
                style="z-index: 100;
                ft-webkit-app-region: no-drag;
                top: 10px; left: 40px" />
      <bread-crumb :items="data" style="position: relative; margin-left: 60px;-webkit-app-region: no-drag" class="items-center content-center" />
      <mode-choose class="object-contain area-header-mode" style="-webkit-app-region: no-drag" />
      <window-controller v-if="hiddenHeaderButton" />
    </div>
    <div class="area-header-bot items-center content-center flex flex-wrap z-10">
      <tab-list :open-files="openFiles"
               :cur-obj="curObj"
               class="flex-shrink"
               ref="tabList"
               @update:tabListOverflow="handleTabListOverflow" />
      <button @click="togglePopover"
              id="downtabRef"
              v-show="tabListOverflow"
              :title="'展示隐藏的标签页'"
              class="theme-element z-50"
              style="-webkit-app-region: no-drag; right: 40px; position: fixed;">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="15" height="15" viewBox="0 0 15 15">
          <g clip-path="url(#master_svg0_240_0876)">
          <path d="M2.683056,5.183056C2.9271380000000002,4.9389812,3.3228619999999998,4.9389812,3.5669399999999998,5.183056L7.5,9.11613L11.43306,5.183056C11.67712,4.9389812,12.07288,4.9389812,12.31694,5.183056C12.561,5.427138,12.561,5.822862,12.31694,6.06694L7.94194,10.441939999999999C7.69788,10.686,7.30212,10.686,7.05806,10.441939999999999L2.683056,6.06694C2.4389812,5.822862,2.4389812,5.427138,2.683056,5.183056Z"
                fill-rule="evenodd" fill="#000000" fill-opacity="1"/>
          </g>
        </svg>
      </button>
      <button @click="changeTheme"
                :title="'切换字体主题'"
              class="theme-element z-50"
              v-show="(mode === 0 || mode === 1)"
              style="-webkit-app-region: no-drag; right: 10px; position: fixed;">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
             width="15" height="15" viewBox="0 0 15 15">
          <g style="mix-blend-mode:passthrough">
            <path
                d="M0.224609,13.125L3.41797,13.125L3.41797,12.2852L2.12891,12.2852L2.9541,9.6875L6.77734,9.6875L7.63184,12.2852L6.34277,12.2852L6.34277,13.125L10.3809,13.125L10.3809,12.2852L9.59961,12.2852L6.20605,2.5L4.39453,2.5L1.00098,12.2852L0.224609,12.2852L0.224609,13.125ZM4.84375,3.97461L4.91699,3.97461L6.52344,8.81836L3.22266,8.81836L4.84375,3.97461Z"
                fill="#474747" fill-opacity="1"/>
          </g>
        </svg>
      </button>
    </div>
    <div id="hiddenTabRef"
         v-show="popoverShow && openFiles.length !== 0"
         class="fixed items-center bg-white overflow-y-auto content-center transition-all border-0 shadow-xl z-50 font-normal text-sm text-left no-underline break-words"
         style="font-family: 'Noto Sans SC'; max-height: 500px; "
         :style="{ left: menuLeft + 'px', top: menuTop + 'px' }">
      <div class="px-3 py-2">
        <ol>
          <li v-for="(child, index) in openFiles" :key="index"
              @click="switchToCurFile(child)"
              class="breadCrumbChild px-3 overflow-hidden whitespace-nowrap"
              style="max-width: 160px; font-size: 13px; text-overflow: ellipsis"
              :title="getName(child)"
          >
            {{ getName(child) }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, toRaw, watch } from 'vue'
import bus from 'vue3-eventbus'
import MenuList from '@/renderer/components/header/MenuList'
import BreadCrumb from '@/renderer/components/header/BreadCrumb'
import ModeChoose from '@/renderer/components/header/ModeChoose'
import WindowController from './WindowController'
import TabList from '@/renderer/components/header/TabList'
import store from '@/renderer/store'
import { getRenamePath } from '@/renderer/utils/pathHelpter'

export default {
  name: 'MyHeader',
  components: { TabList, ModeChoose, BreadCrumb, MenuList, WindowController },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    onMounted(() => {
      const gap = store.getters.getCommon.saveTime

      function autoSave () {
        if (curObj.value !== undefined && openFiles.value.length !== 0 && store.getters.getCommon.autoSave) {
          writeBack()
        }
      }

      let interval = setInterval(autoSave, (gap * 1000))

      watch(() => {
        return store.getters.getCommon.saveTime
      }, (newValue, oldValue) => {
        clearInterval(interval) // 取消现有的定时器
        interval = setInterval(autoSave, (newValue * 1000)) // 设置新的间隔时间
      })
    })

    const openFiles = ref([]) // 存储已打开的文件，浅比较（ === 引用相同），深比较（值相同）
    const curObj = ref({
      name: '',
      path: ''
    }) // 维护现在打开的文件对象
    const content = ref('') // 当前工作区文本内容
    const theme = ref('classic') // 当前主题
    const mode = computed(() => {
      return store.getters.getMode
    })

    const hiddenHeaderButton = !window.electronAPI.isOSx()

    const tabListOverflow = ref(false)
    const popoverShow = ref(false)
    const menuLeft = ref(0)
    const menuTop = ref(0)
    const tabList = ref(null)

    // 打开tab，首先检测目标文件是否已经打开，没打开则将对象计入openFiles
    bus.on('openNewTab', async (obj) => {
      if (contain(obj)) {
        console.log('file already open!')
      } else {
        const { absolutePath, path, name, type, offset } = obj
        openFiles.value.push({ absolutePath, path, name, type, offset })
        update()
      }
      store.dispatch('files/setCurrentFile', { filepath: obj.path }).then(() => {
        obj.content = store.getters['files/markdown']
        if (store.getters.getMode === -1) {
          // 正在展示欢迎界面，默认进入纯文本模式
          bus.emit('changeMode', 0)
        }
        bus.emit('sendToTextUI', obj)
        const index = getIndex(obj)
        if (index !== -1) {
          scrollToElement(index)
        }
      }, () => {
        return bus.emit('deleteTab', obj)
      })
    })

    // 模式改变核心逻辑
    bus.on('changeMode', (value) => {
      const mode = store.getters.getMode
      if (openFiles.value.length === 0 && value !== -1) {
        store.dispatch('updateMode', { value: -1 })
        return
      }
      if (mode !== value) {
        // 模式改变 0表示纯文本，1表示源码，2表示树形
        if (mode !== -1) {
          // 工作区有打开文件
          store.dispatch('updateMode', { value })
          bus.emit('sendToTextUI', curObj.value)
        } else {
          store.dispatch('updateMode', { value })
        }
      }
    })

    // TextUI接口：TextUI实时将工作区修改保存到content中
    bus.on('saveChange', (obj) => {
      content.value = obj.content
      store.commit('files/updateByMarkdown', { content: content.value })
      getOutLine()
      getTags()
      bus.emit('getInfoOfFile', obj) // 更新信息栏
    })

    // 另存为接口
    bus.on('saveToAnotherFile', () => {
      if (curObj.value.path && openFiles.value.length !== 0) {
        window.electronAPI.saveToAnotherFile(content.value)
      }
    })

    // MindUI接口：MindUI实时将工作区修改保存到content中
    bus.on('saveChangeMindUI', async (json) => {
      const inDocumentPath = await window.electronAPI.getBuiltInDocumentsPath()
      if (inDocumentPath.indexOf(curObj.value.path) !== -1) {
        return
      }
      if (store.getters.getMode === 2) {
        store.commit('files/updateByMind', { mindJson: json.data })
        content.value = store.getters['files/markdown']
        getOutLine()
      } else if (json.data.data.type) { // FIXME: 第一次type可能不存在
        store.commit('files/updateForestByMind', json.data)
      }
    })

    // 将前端的content写回后端文件中，并且更新前端容器
    async function writeBack () {
      // 有可能路径不存在
      const inDocumentPath = await window.electronAPI.getBuiltInDocumentsPath()
      if (curObj.value.path && inDocumentPath.indexOf(curObj.value.path) === -1) {
        window.electronAPI.saveFile(curObj.value.path, content.value)
      }
    }

    function handleTabListOverflow (value) {
      tabListOverflow.value = value
    }

    function togglePopover (e) {
      this.popoverShow = !this.popoverShow
      menuLeft.value = e.clientX - 160
      menuTop.value = e.clientY + 15
    }

    const scrollToElement = (index) => {
      if (tabList.value) {
        tabList.value.scrollToElement(index)
      }
    }

    function getName (item) {
      const index = item.absolutePath.length + item.offset
      let res = item.absolutePath[index]
      for (let i = index + 1; i <= item.absolutePath.length - 1; i++) {
        res += '>' + item.absolutePath[i]
      }
      return res
    }

    function switchToCurFile (file) {
      bus.emit('openNewTab', file)
      popoverShow.value = false
    }

    // 传参给，根据mode选择传参给哪个组件
    function sendContentByMode () {
      if (store.getters.getMode === 5) {
        const obj = store.getters['files/forestMind']
        bus.emit('sendToFicTree', toRaw(obj))
      } else if (store.getters.getMode === 2) {
        const obj = store.getters['files/mind']
        bus.emit('sendToFicTree', toRaw(obj))
      } else if (store.getters.getMode >= 0) {
        if (content.value !== undefined) {
          (async () => {
            bus.emit('setEditorContent', { content: content.value })
          })().then(async () => {
            const inDocumentPath = await window.electronAPI.getBuiltInDocumentsPath()
            if (inDocumentPath.indexOf(curObj.value.path) === -1) {
              bus.emit('setEditable', { enable: true })
            } else {
              bus.emit('setEditable', { enable: false })
            }
            bus.emit('changeEditMode', { mode: store.getters.getMode })
          }
          )
        } else {
          console.log('bug: 正在尝试发送给ficus-editor undefined')
        }
      }
    }

    // TextUI接口，更新textUI的展示内容
    bus.on('sendToTextUI', (obj) => {
      // 写回content
      writeBack()
      store.dispatch('files/setCurrentFile', { filepath: obj.path }).then(() => {
        content.value = store.getters['files/markdown']
        curObj.value = obj
        window.electronAPI.changePath(curObj.value.path)
        if (curObj.value.name !== '') {
          getOutLine()
          getTags()
          getCites()
        }
        updateBread()
        sendContentByMode()
      })
    })

    // 清空当前curObj的影响
    // 调用场景：关闭最后一个标签页，需要写回最后一个标签页，之后将curObj置为无效初值，最后刷新所有关联值

    function clearCurObj () {
      writeBack()
      curObj.value = { name: '', path: '' }
      content.value = ''
      store.commit('files/closeCurrentFile')
      getOutLine()
      getTags()
      getCites()
      store.dispatch('updateMode', { value: -1 })
      bus.emit('changeName', '')
    }

    // 删除tab，从openFile中删去，同时如果工作区还有文件，则选定一个邻近的文件赋为curObj，如果工作区没有文件，则赋curObj为空对象
    bus.on('deleteTab', (obj) => {
      obj.offset = -1
      let index = openFiles.value.findIndex(file => file.path === obj.path)
      openFiles.value.splice(index, 1)

      if (curObj.value.path === obj.path) {
        index = Math.max(index - 1, 0)
        if (openFiles.value.length !== 0) {
          bus.emit('sendToTextUI', openFiles.value[index])
        } else {
          clearCurObj()
        }
      }
      update()
    })

    bus.on('closeAllOtherTab', (obj) => {
      openFiles.value.length = 0
      openFiles.value.push(obj)
      if (curObj.value.path !== obj.path) {
        bus.emit('sendToTextUI', obj)
      }
      update()
    })

    function showMenu () {
      bus.emit('showMenu')
    }

    function changeTheme () {
      theme.value = (theme.value === 'classic' ? 'modern' : 'classic')
      bus.emit('changeContentTheme', { theme: theme.value })
    }

    bus.on('changeToGraph', async () => {
      const info = await window.electronAPI.getLinks()
      info.files = props.data[0]
      store.commit('files/buildGraph', info)
      bus.emit('getNodeAndLink', {
        nodes: toRaw(store.getters['files/graphNodes']),
        links: toRaw(store.getters['files/graphLinks'])
      })
      await store.dispatch('updateMode', { value: 3 })
    })

    bus.on('changeToForest', () => {
      store.dispatch('updateMode', { value: 5 })
      sendContentByMode()
    })

    async function getCites () {
      const { citing, cited } = await window.electronAPI.getCites(curObj.value.path)
      bus.emit('editCites', { citing, cited })
    }

    function getTags () {
      const tags = store.getters['files/tags']
      bus.emit('editTags', { tags })
    }

    function getOutLine () {
      const outline = store.getters['files/outline']
      bus.emit('openOutLine', outline)
    }

    bus.on('addTags', (tagName) => {
      store.commit('files/addTag', tagName)
      content.value = store.getters['files/markdown']
      writeBack()
      sendContentByMode()
    })

    bus.on('removeTags', (tagName) => {
      store.commit('files/removeTag', tagName)
      content.value = store.getters['files/markdown']
      writeBack()
      sendContentByMode()
    })

    bus.on('changeToRelation', () => {
      getCites()
    })

    bus.on('changeToTag', () => {
      getTags()
    })

    // 对于一个待打开的文件，判断是否已经包含在已打开的文件中
    function contain (file) {
      return openFiles.value.find(openfile => openfile.path === file.path) !== undefined
    }

    function getIndex (file) {
      return openFiles.value.findIndex(openfile => openfile.path === file.path)
    }

    bus.on('openRefFile', async (obj) => {
      const file = await window.electronAPI.linkToFile(curObj.value.path, obj.path)
      if (file !== undefined) {
        bus.emit('openNewTab', file)
      }
    })

    bus.on('renameOpenFiles', ({ oldPath, newPath }) => {
      for (const file of openFiles.value) {
        if (file.path === curObj.value.path) {
          curObj.value.path = getRenamePath(oldPath, newPath, file.path)
          curObj.value.absolutePath = file.path.split(window.pathAPI.sep)
          curObj.value.name = window.pathAPI.basename(file.path)
        }
        file.path = getRenamePath(oldPath, newPath, file.path)
        file.absolutePath = file.path.split(window.pathAPI.sep)
        file.name = window.pathAPI.basename(file.path)
      }
      update()
    })

    // 每次对于openFiles的增加和删除，都需要重新计算特异路径
    function update () {
      // 第一步，将所有对象按名字分组
      const sameNameArrays = []
      const flag = Array(openFiles.value.length).fill(false)

      for (let i = 0; i < openFiles.value.length; i++) {
        if (flag[i]) {
          continue
        }
        const tempArray = []
        tempArray.push(openFiles.value[i])
        for (let j = i + 1; j < openFiles.value.length; j++) {
          if (flag[j]) {
            continue
          }
          if (openFiles.value[i].name === openFiles.value[j].name) {
            tempArray.push(openFiles.value[j])
            flag[j] = true
          }
        }
        if (tempArray.length > 1) {
          flag[i] = true
          sameNameArrays.push(tempArray)
        }
      }

      // 第二步，计算所有组的偏移
      for (let i = 0; i < sameNameArrays.length; i++) {
        let offset = -2
        while (sameNameArrays[i].length + offset >= 0) {
          const nameSet = new Set()
          for (let j = 0; j < sameNameArrays[i].length; j++) {
            // 判断path的倒数第二个是否全部互异\
            const index = sameNameArrays[i][j].absolutePath.length + offset
            nameSet.add(sameNameArrays[i][j].absolutePath[index])
          }
          if (nameSet.size === sameNameArrays[i].length) {
            break
          } else {
            offset--
          }
        }
        for (let j = 0; j < sameNameArrays[i].length; j++) {
          sameNameArrays[i][j].offset = offset // 修改对象的偏移
        }
      }

      // 第三步，将没有重复元素的offset设为-1
      for (let i = 0; i < openFiles.value.length; i++) {
        if (!flag[i]) {
          openFiles.value[i].offset = -1
        }
      }
    }

    // 暴露给菜单栏writeBack接口
    bus.on('writeBackForMenu', () => {
      writeBack()
    })

    // 暴露给菜单栏关闭当前标签页接口
    bus.on('closeCurTab', () => {
      bus.emit('deleteTab', curObj.value)
    })
    // 暴露给菜单栏重命名当前文件
    bus.on('renameCurTabForMenu', () => {
      if (openFiles.value.length === 0) {
        return
      }
      bus.emit('showDialogForRenameFile', curObj.value)
    })

    // 暴露给菜单栏撤销
    bus.on('undoCurTab', () => {
      if (openFiles.value.length !== 0) {
        store.commit('files/undo')
        content.value = store.getters['files/markdown']
        sendContentByMode()
        getOutLine()
        getTags()
      }
    })

    // 暴露给菜单栏重做
    bus.on('redoCurTab', () => {
      if (openFiles.value.length !== 0) {
        store.commit('files/redo')
        content.value = store.getters['files/markdown']
        sendContentByMode()
        getOutLine()
        getTags()
      }
    })

    // 暴露刷新大纲
    bus.on('updateOutLine', () => {
      getOutLine()
    })

    // 暴露刷新引用
    bus.on('updateCite', () => {
      getCites()
    })

    // 暴露刷新标签
    bus.on('updateTag', () => {
      getTags()
    })

    // 返回父对象
    function findFather (file, father) {
      for (let i = 0; i < father.children.length; i++) {
        if (file.path === father.children[i].path) {
          father.curChild = i
          return {
            has: true,
            res: father
          }
        }
        if (father.children[i].type === 'folder') {
          const obj = findFather(file, father.children[i])
          if (obj.has) {
            father.curChild = i
            return obj
          }
        }
      }
      return {
        has: false,
        res: file
      }
    }

    // 更新面包屑
    function updateBread () {
      if (props.data.length) {
        const obj = findFather(curObj.value, props.data[0])
        if (obj.has) {
          curObj.value.curChild = -1
          return
        }
        // eslint-disable-next-line vue/no-mutating-props
        props.data[0].curChild = -2
      }
      bus.emit('changeName', curObj.value.name)
    }

    return {
      openFiles,
      update,
      curObj,
      content,
      mode,
      showMenu,
      changeTheme,
      hiddenHeaderButton,
      handleTabListOverflow,
      tabListOverflow,
      togglePopover,
      getName,
      switchToCurFile,
      popoverShow,
      menuLeft,
      menuTop,
      tabList,
      scrollToElement
    }
  }
}
</script>

<style scoped>
.theme-element:hover path {
  fill: #42b983;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
  -webkit-transition:left .3s, fill .3s;
}

.theme-element:active path {
  fill: #19734b;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
  -webkit-transition:left .3s, fill .3s;
}

.theme-element path {
  fill: #474747;
  fill-opacity: 1;
}
.appIcon {
  position: absolute;
  left: 5px;
  width: 40px;
  height: 40px;
  opacity: 1;
  -webkit-app-region: no-drag;
}

.appIcon:hover {
  perspective: 200px;
  transform: rotateY(45deg);
  -webkit-transition: .2s;
}

.breadCrumbChild {
  cursor: pointer;
  color: #565656;
}

.breadCrumbChild:hover {
  background-color: #f4f4f3;
  border-radius: 8px;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}

.breadCrumbChild:active {
  background-color: #a8a8a8;
  border-radius: 8px;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}

</style>
