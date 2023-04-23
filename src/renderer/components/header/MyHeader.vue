<template>
  <div class="area-header"
  >
    <div class="area-header-top" style="z-index: 10000;display: flex;-webkit-app-region: drag;">
      <MenuList :data="data" style="z-index: 100;margin-left: 5px;-webkit-app-region: no-drag"></MenuList>
      <img alt="logo" src="../../assets/bg_trans.png"
           @click="showMenu"
           style="position: absolute; left: 5px; top: 0; width: 40px; height: 40px; opacity: 1;-webkit-app-region: no-drag"/>
      <BreadCrumb :items="data" style="position:absolute; margin-left: 60px;-webkit-app-region: no-drag"></BreadCrumb>
      <ModeChoose class="area-header-mode" style="-webkit-app-region: no-drag"></ModeChoose>
      <button @click="myMin" style="-webkit-app-region: no-drag" class="tr1-element">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
             width="40" height="40" viewBox="0 0 40 40">
          <defs>
            <clipPath id="master_svg0_71_2542">
              <rect x="13" y="13" width="15" height="15" rx="0"/>
            </clipPath>
          </defs>
          <g style="mix-blend-mode:passthrough">
            <rect x="0" y="0" width="40" height="40" rx="0" fill="#666A70" fill-opacity="1"/>
            <g clip-path="url(#master_svg0_71_2542)">
              <g>
                <g>
                  <path
                      d="M24.875,21.5L20.5,21.5L16.125,21.5Q16.0265086,21.5,15.92991,21.480785Q15.833311,21.461570000000002,15.742317,21.423879Q15.651322,21.386188,15.56943,21.33147Q15.487537,21.276751,15.417893,21.207107Q15.348249,21.137463,15.29353,21.05557Q15.238812,20.973678,15.201121,20.882683Q15.16343,20.791689,15.144214999999999,20.69509Q15.125,20.5984914,15.125,20.5Q15.125,20.4015086,15.144214999999999,20.30491Q15.16343,20.208311,15.201121,20.117317Q15.238812,20.026322,15.29353,19.94443Q15.348249,19.862537,15.417893,19.792893Q15.487537,19.723249,15.56943,19.66853Q15.651322,19.613812,15.742317,19.576121Q15.833311,19.538429999999998,15.92991,19.519215Q16.0265086,19.5,16.125,19.5L20.5,19.5L24.875,19.5Q24.973489999999998,19.5,25.07009,19.519215Q25.16669,19.538429999999998,25.25768,19.576121Q25.34868,19.613812,25.43057,19.66853Q25.51246,19.723249,25.58211,19.792893Q25.65175,19.862537,25.70647,19.94443Q25.76119,20.026322,25.79888,20.117317Q25.836570000000002,20.208311,25.85578,20.30491Q25.875,20.4015086,25.875,20.5Q25.875,20.5984914,25.85578,20.69509Q25.836570000000002,20.791689,25.79888,20.882683Q25.76119,20.973678,25.70647,21.05557Q25.65175,21.137463,25.58211,21.207107Q25.51246,21.276751,25.43057,21.33147Q25.34868,21.386188,25.25768,21.423879Q25.16669,21.461570000000002,25.07009,21.480785Q24.973489999999998,21.5,24.875,21.5ZM25.875,20.5Q25.875,20.5984914,25.85578,20.69509Q25.836570000000002,20.791689,25.79888,20.882683Q25.76119,20.973678,25.70647,21.05557Q25.65175,21.137463,25.58211,21.207107Q25.51246,21.276751,25.43057,21.33147Q25.34868,21.386188,25.25768,21.423879Q25.16669,21.461570000000002,25.07009,21.480785Q24.973489999999998,21.5,24.875,21.5Q24.776510000000002,21.5,24.67991,21.480785Q24.58331,21.461570000000002,24.49232,21.423879Q24.40132,21.386188,24.31943,21.33147Q24.23754,21.276751,24.16789,21.207107Q24.09825,21.137463,24.04353,21.05557Q23.98881,20.973678,23.95112,20.882683Q23.913429999999998,20.791689,23.89421,20.69509Q23.875,20.5984914,23.875,20.5Q23.875,20.4015086,23.89421,20.30491Q23.913429999999998,20.208311,23.95112,20.117317Q23.98881,20.026322,24.04353,19.94443Q24.09825,19.862537,24.16789,19.792893Q24.23754,19.723249,24.31943,19.66853Q24.40132,19.613812,24.49232,19.576121Q24.58331,19.538429999999998,24.67991,19.519215Q24.776510000000002,19.5,24.875,19.5Q24.973489999999998,19.5,25.07009,19.519215Q25.16669,19.538429999999998,25.25768,19.576121Q25.34868,19.613812,25.43057,19.66853Q25.51246,19.723249,25.58211,19.792893Q25.65175,19.862537,25.70647,19.94443Q25.76119,20.026322,25.79888,20.117317Q25.836570000000002,20.208311,25.85578,20.30491Q25.875,20.4015086,25.875,20.5ZM17.125,20.5Q17.125,20.5984914,17.105785,20.69509Q17.086570000000002,20.791689,17.048879,20.882683Q17.011188,20.973678,16.95647,21.05557Q16.901751,21.137463,16.832107,21.207107Q16.762463,21.276751,16.68057,21.33147Q16.598678,21.386188,16.507683,21.423879Q16.416689,21.461570000000002,16.32009,21.480785Q16.2234914,21.5,16.125,21.5Q16.0265086,21.5,15.92991,21.480785Q15.833311,21.461570000000002,15.742317,21.423879Q15.651322,21.386188,15.56943,21.33147Q15.487537,21.276751,15.417893,21.207107Q15.348249,21.137463,15.29353,21.05557Q15.238812,20.973678,15.201121,20.882683Q15.16343,20.791689,15.144214999999999,20.69509Q15.125,20.5984914,15.125,20.5Q15.125,20.4015086,15.144214999999999,20.30491Q15.16343,20.208311,15.201121,20.117317Q15.238812,20.026322,15.29353,19.94443Q15.348249,19.862537,15.417893,19.792893Q15.487537,19.723249,15.56943,19.66853Q15.651322,19.613812,15.742317,19.576121Q15.833311,19.538429999999998,15.92991,19.519215Q16.0265086,19.5,16.125,19.5Q16.2234914,19.5,16.32009,19.519215Q16.416689,19.538429999999998,16.507683,19.576121Q16.598678,19.613812,16.68057,19.66853Q16.762463,19.723249,16.832107,19.792893Q16.901751,19.862537,16.95647,19.94443Q17.011188,20.026322,17.048879,20.117317Q17.086570000000002,20.208311,17.105785,20.30491Q17.125,20.4015086,17.125,20.5Z"
                      fill="#F4F4F3" fill-opacity="1"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
      <button @click="myMax" style="-webkit-app-region: no-drag" class="tr2-element">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
             width="40" height="40" viewBox="0 0 40 40">
          <defs>
            <clipPath id="master_svg0_71_507">
              <rect x="15" y="15" width="10" height="10" rx="0"/>
            </clipPath>
          </defs>
          <g style="mix-blend-mode:passthrough">
            <g clip-path="url(#master_svg0_71_507)">
              <g>
                <g>
                  <path
                      d="M15,23.130000000000003Q15,23.91,15.55,24.46Q16.1,25.009999999999998,16.88,25.009999999999998L21.25,25.009999999999998Q22.03,25.009999999999998,22.58,24.46Q23.130000000000003,23.91,23.130000000000003,23.130000000000003L23.130000000000003,18.75Q23.130000000000003,17.98,22.58,17.43Q22.03,16.88,21.25,16.88L16.88,16.88Q16.1,16.88,15.55,17.43Q14.9999999254942,17.98,14.9999999254942,18.75L15,23.130000000000003ZM16.25,23.130000000000003L16.25,19.38L21.88,19.38L21.88,23.130000000000003Q21.88,23.39,21.69,23.57Q21.5,23.75,21.25,23.75L16.88,23.75Q16.62,23.75,16.43,23.57Q16.24,23.39,16.25,23.130000000000003ZM16.25,18.13Q16.25,17.87,16.43,17.69Q16.61,17.509999999999998,16.88,17.5Q17.15,17.490000000000002,17.32,17.69Q17.490000000000002,17.89,17.5,18.13Q17.509999999999998,18.37,17.32,18.57Q17.13,18.77,16.88,18.759999999999998Q16.63,18.75,16.43,18.57Q16.23,18.39,16.25,18.13ZM16.99,16.25L21.88,16.25Q22.65,16.25,23.2,16.8Q23.75,17.35,23.75,18.13L23.75,23.02Q24.3,22.82,24.65,22.34Q25,21.86,25,21.25L25,16.88Q25,16.1,24.45,15.55Q23.9,14.9999999254942,23.130000000000003,14.9999999254942L18.75,14.9999999254942Q18.15,14.9999999254942,17.67,15.35Q17.19,15.7,16.99,16.25Z"
                      fill="#F4F4F3" fill-opacity="1"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
      <button @click="myClose" style="-webkit-app-region: no-drag" class="tr3-element">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
             width="40" height="40" viewBox="0 0 40 40">
          <defs>
            <clipPath id="master_svg0_71_2735">
              <rect x="15" y="17" width="10" height="10.000000953674316" rx="0"/>
            </clipPath>
          </defs>
          <g style="mix-blend-mode:passthrough">
            <rect x="0" y="0" width="40" height="40" rx="0" fill="#B13333" fill-opacity="1"/>
            <g clip-path="url(#master_svg0_71_2735)">
              <g>
                <g>
                  <g>
                    <g>
                      <path
                          d="M21.10138,22L24.84024,18.26098C24.943089999999998,18.15805,24.99984,18.02073,25,17.874309C25,17.727805,24.94325,17.590325,24.84024,17.487561L24.5126,17.16C24.40959,17.0568293,24.272280000000002,17.000325203,24.12569,17.000325203C23.97935,17.000325203,23.84203,17.0568293,23.73903,17.16L20.00016,20.89878L16.26114,17.16C16.15829,17.0568293,16.02089,17.000325203,15.87439,17.000325203C15.728049,17.000325203,15.59065,17.0568293,15.487805,17.16L15.16,17.487561C14.9466667,17.700894,14.9466667,18.04789,15.16,18.26098L18.89894,22L15.16,25.738860000000003C15.0570732,25.84195,15.000406504,25.97927,15.000406504,26.12569C15.000406504,26.272109999999998,15.0570732,26.40943,15.16,26.512439999999998L15.487724,26.84C15.590569,26.943089999999998,15.728049,26.999679999999998,15.874309,26.999679999999998C16.02081,26.999679999999998,16.15821,26.943089999999998,16.26106,26.84L20.00008,23.10114L23.73894,26.84C23.84195,26.943089999999998,23.97927,26.999679999999998,24.12561,26.999679999999998L24.12577,26.999679999999998C24.272199999999998,26.999679999999998,24.409509999999997,26.943089999999998,24.512520000000002,26.84L24.840159999999997,26.512439999999998C24.94301,26.409509999999997,24.999760000000002,26.272109999999998,24.999760000000002,26.12569C24.999760000000002,25.97927,24.94301,25.84195,24.840159999999997,25.73894L21.10138,22Z"
                          fill="#F4F4F3" fill-opacity="1"/>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
    </div>
    <div class="area-header-bot" style="z-index: 10;display: flex;">
      <TabList :open-files="openFiles" :cur-obj="curObj"></TabList>
      <button @click="changeTheme"
              class="theme-element"
              style="position: absolute; margin-left: 1320px;margin-top: 5px;-webkit-app-region: no-drag">
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
  </div>
</template>

<script>
import { ref } from 'vue'
import bus from 'vue3-eventbus'
import MenuList from '@/renderer/components/header/MenuList'
import BreadCrumb from '@/renderer/components/header/BreadCrumb'
import ModeChoose from '@/renderer/components/header/ModeChoose'
import TabList from '@/renderer/components/header/TabList'
import DataManager from '@/IR/manager'

export default {
  name: 'MyHeader',
  components: { TabList, ModeChoose, BreadCrumb, MenuList },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const dataManager = new DataManager()
    const openFiles = ref([]) // 存储已打开的文件，浅比较（ === 引用相同），深比较（值相同）
    const curObj = ref({
      name: '',
      path: '',
      content: '未打开任何文件'
    }) // 维护现在打开的文件对象
    const content = ref('') // 当前工作区文本内容
    const wordCnt = ref(0) // 当前工作区字符数
    const theme = ref('classic') // 当前主题
    let mode = -1 // 默认当前模式为欢迎界面

    // 对于一个待打开的文件，判断是否已经包含在已打开的文件中
    function contain (file) {
      for (let i = 0; i < openFiles.value.length; i++) {
        if (openFiles.value[i].path === file.path) {
          return true
        }
      }
      return false
    }

    bus.on('updateTabName', () => {
      update()
    })

    // 每次对于openFiles的增加和删除，都需要重新计算特异路径
    function update () {
      // 第一步，将所有对象按名字分组
      const sameNameArrays = []
      const flag = []
      for (let i = 0; i < openFiles.value.length; i++) {
        flag.push(false)
      }

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

    // TextUI接口，TextUI实时将工作区修改保存到content和wordCnt中
    bus.on('saveChange', (obj) => {
      content.value = obj.content
      wordCnt.value = obj.wordCnt
      // console.log('get change: ', content.value, wordCnt.value)
      dataManager.updateTreeFromMarkdown(content.value)
      const res = dataManager.getTreeOutline()
      bus.emit('openOutLine', res.children)
    })

    // MindUI接口，MindUI实时将工作区修改保存到json中
    bus.on('saveChangeMindUI', (json) => {
      console.log(json)
      dataManager.updateTreeFromMindJson(json)
      content.value = dataManager.getTreeMarkdown()
      console.log('树操作之后更新的json: ', content.value)
      const res = dataManager.getTreeOutline()
      bus.emit('openOutLine', res.children)
    })

    // 后端接口，将前端的content写回后端文件中，并且更新前端容器
    function writeBack () {
      if (curObj.value.path) {
        // electron.saveFile(curObj.value.path) // 接口
        console.log('我要保存文件了', content.value)
        window.electronAPI.saveFile(curObj.value.path, content.value)
        curObj.value.content = content.value
      }
    }

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

    // TextUI接口，更新textUI的展示内容
    bus.on('sendToTextUI', (obj) => {
      // 写回content，有可能路径不存在的
      writeBack()
      content.value = obj.content
      curObj.value = obj
      if (curObj.value.name !== '') {
        // const c = toRef(content.value)
        // const p = toRef(curObj.value.path)
        console.log(content.value, curObj.value.path)
        dataManager.buildTreeFromMarkdown({ content: content.value, path: curObj.value.path }, { replaced: true })
        const res = dataManager.getTreeOutline()
        console.log(res)
        bus.emit('openOutLine', res.children)
      }
      updateBread()
      // 传参给textUI，根据mode选择传参给哪个组件
      if (mode === 2) {
        const obj = dataManager.getTreeMindJson()
        console.log('正在传参：', obj)
        bus.emit('sendToFicTree', obj)
      } else if (mode >= 0) {
        console.log('正在传参：', content.value, typeof content.value)
        if (content.value !== undefined) {
          bus.emit('setEditorContent', { content: content.value })
        } else {
          console.log('bug need fix')
        }
      }
    })

    // 删除tab，从openFile中删去，同时如果工作区还有文件，则选定一个邻近的文件赋为curObj，如果工作区没有文件，则赋curObj为空对象
    bus.on('deleteTab', (obj) => {
      obj.offset = -1
      let index = -1
      for (let i = 0; i < openFiles.value.length; i++) {
        if (openFiles.value[i].path === obj.path) {
          index = i
          break
        }
      }
      if (index !== -1) {
        openFiles.value.splice(index, 1)
      } else {
        return
      }
      if (curObj.value.path === obj.path) {
        if (index === openFiles.value.length) {
          index = 0
        }
        if (openFiles.value.length !== 0) {
          bus.emit('sendToTextUI', openFiles.value[index])
        } else {
          // bus.emit('sendToTextUI', { name: '', path: '', content: '未打开任何文件' })
          bus.emit('changeMode', -1)
        }
      }
      update()
    })

    // 打开tab，首先检测目标文件是否已经打开，没打开则将对象计入openFiles
    bus.on('openNewTab', (obj) => {
      if (mode === -1) {
        // 正在展示欢迎界面，默认进入纯文本模式
        bus.emit('changeMode', 0)
      }
      if (contain(obj)) {
        console.log('already open!')
      } else {
        openFiles.value.push(obj)
        update()
      }
      bus.emit('sendToTextUI', obj)
    })

    function showMenu () {
      bus.emit('showMenu')
    }

    // // 监听content变化
    // watch(content, (newValue, oldValue) => {
    //   // 调用得到children，传递给sidebar
    //   dataManager.buildTreeFromMarkdown(newValue, true)
    //   const obj = dataManager.getTreeOutline()
    //   bus.emit('openOutLine', obj.children)
    // })

    function myMin () {
      console.log('min')
      window.electronAPI.minWindow()
    }

    function myMax () {
      console.log('max')
      window.electronAPI.maxWindow()
    }

    function myClose () {
      console.log('close')
      // 需要关闭开发者窗口
      window.electronAPI.closeWindow()
    }

    function changeTheme () {
      theme.value = (theme.value === 'classic' ? 'modern' : 'classic')
      bus.emit('changeContentTheme', { theme: theme.value })
    }

    bus.on('changeMode', (value) => {
      if (mode !== value) {
        // 模式改变 0表示纯文本，1表示源码，2表示树形
        if (value === 2) {
          bus.emit('chooseToShowPage', 2) // 展示树型组件
        } else if (value >= 0) {
          bus.emit('changeEditMode', { mode: value }) // 切换textUI的模式
          bus.emit('chooseToShowPage', 1) // 展示编辑器组件
        } else if (value === -1) {
          bus.emit('chooseToShowPage', 0)
        }
        if (mode !== -1) {
          // 工作区有打开文件
          console.log('发生了模式切换：', curObj.value)
          mode = value
          bus.emit('sendToTextUI', curObj.value)
        } else {
          mode = value
        }
      }
    })

    bus.on('changeToGraph', () => {
      dataManager.buildGraphFromFiles({ files: props.data[0] }, { replaced: true })
      console.log(dataManager.getGraphNodes())
      console.log(dataManager.getGraphLinks())
      bus.emit('getNodeAndLink', { nodes: dataManager.getGraphNodes(), links: dataManager.getGraphLinks() })
      bus.emit('chooseToShowPage', 3)
    })

    return { openFiles, update, curObj, content, wordCnt, showMenu, myMin, myClose, myMax, changeTheme }
  }
}
</script>

<style scoped>

.tr1-element {
  position: fixed;
  top: 0;
  right: 75px;
}

.tr2-element {
  position: fixed;
  top: 0;
  right: 35px;
}

.tr3-element {
  position: fixed;
  top: 0;
  right: 0;
}

.theme-element {
  position: fixed;
  top: 0;
  right: 0;
}

</style>
