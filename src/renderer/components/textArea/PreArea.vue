<template>
  <div ref="pageContent" style="user-select: none;">
    <div v-show="preMode === 0" class="preferences">
      <div class="title-font my-6" style="font-size: 33px">通用</div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">保存</div>
        <label>自动保存时间（s）：</label>
        <input type="number" v-model="saveTime" class="numberInput rounded-md"><br/>
        <label>自动保存：</label>
        <input type="checkbox" v-model="autoSave" class="checkboxInput">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">全屏</div>
        <label>启动时自动全屏：</label>
        <input type="checkbox" v-model="autoFullScreen" class="checkboxInput">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">更新</div>
        <label>启动时自动更新：</label>
        <input type="checkbox" v-model="autoUpdate" class="checkboxInput">
      </div>

      <div class="preference-item">
        <button @click="savePreferences" class="optionBtn">保存</button>
      </div>
    </div>
    <div v-show="preMode === 1" class="preferences">
      <div class="title-font my-6" style="font-size: 33px">编辑器</div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">字体</div>
        <label>字体大小（px）：</label>
        <input type="number" v-model="fontSize" class="numberInput rounded-md">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">行号</div>
        <label>显示代码块行号：</label>
        <input type="checkbox" v-model="showLineNumbers" class="checkboxInput">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">图片</div>
        <div class="rounded-md p-2 border-2 align-middle flex relative" style="color: #565656"
             @click="showImgSelection = !showImgSelection">
          {{ imgOption[imgPath] }}
          <div class="absolute align-middle py-1" style="right: 10px">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#565656"></path> </g></svg>
          </div>
        </div>
        <ul v-if="showImgSelection" class="p-2 border-2 rounded-md shadow-md">
          <li v-for="(option, index) in imgOption" :key="option"
              @click="imgPath = index; showImgSelection = !showImgSelection"
              class="m-2 px-2 py-1 rounded-md imgSelectionItem">
            {{ option }}
          </li>
        </ul>
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">源码</div>
        <label>预览渲染结果：</label>
        <input type="checkbox" v-model="showRender" class="checkboxInput">
      </div>

      <div class="preference-item">
        <button @click="savePreferences" class="optionBtn">保存</button>
      </div>
    </div>
    <div v-show="preMode === 2" class="preferences">
      <div class="title-font my-6" style="font-size: 33px">快捷键</div>
      <ul>
        <li v-for="(shortcut, index) in shortcuts" :key="index" class="preference-item">
          <label>{{ shortcut.name }}：</label>
          <input @keydown="captureShortcut(index, $event)" ref="shortcutInput" :value="shortcut.key"
                 class="numberInput rounded-md p-2 text-gray-700"><br/>
        </li>
      </ul>
      <div class="preference-item">
        <button @click="savePreferences" class="optionBtn">保存</button>
      </div>
    </div>
    <div v-show="preMode === 3" class="preferences">
      <div class="title-font my-6" style="font-size: 33px">榕功能</div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
import bus from 'vue3-eventbus'
import store from '@/renderer/store'

export default {
  name: 'PreArea',
  setup () {
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance()
    const _this = proxy
    const common = store.getters.getCommon
    console.log(common)
    const preMode = ref(0) // 0-通用，1-编辑器，2-快捷键，3-榕功能
    const fontSize = ref(14)
    const showLineNumbers = ref(true)
    const saveTime = ref(30)
    const autoSave = ref(true)
    const autoFullScreen = ref(true)
    const autoUpdate = ref(true)
    const imgPath = ref(0) // 0-无特殊操作, 1-复制图片到当前文件夹, 2-复制图片到./${filename}.assets文件夹, 3-上传图片, 4-复制到指定路径
    const showRender = ref(true)
    const showImgSelection = ref(false)
    const shortcuts = ref([{
      name: '打开文件',
      key: 'ctrl + o'
    }, {
      name: '打开文件夹',
      key: 'ctrl + shift + o'
    }])
    /* eslint-disable no-template-curly-in-string */
    const imgOption = ['复制到指定路径', '复制图片到当前文件夹', '复制图片到./${filename}.assets文件夹', '上传图片', '复制到指定路径']

    bus.on('changePreMode', (value) => {
      preMode.value = value
    })

    function savePreferences () {
      console.log(fontSize.value)
      console.log(typeof imgPath.value)
      console.log(shortcuts.value)
    }

    function getKeyCombination (event) {
      let keyCombination = ''

      if (event.ctrlKey) {
        keyCombination += 'Ctrl+'
      }

      if (event.shiftKey) {
        keyCombination += 'Shift+'
      }

      if (event.altKey) {
        keyCombination += 'Alt+'
      }

      if (event.key !== 'Control' && event.key !== 'Shift' && event.key !== 'Alt') {
        keyCombination += event.key
      }

      return keyCombination
    }

    function captureShortcut (index, event) {
      event.preventDefault() // 阻止输入框默认的按键行为
      // 捕获用户按下的键位，并将其保存到对应的快捷键对象中
      shortcuts.value[index].key = getKeyCombination(event)
    }

    const searchKeyword = ref('')
    const searchResults = ref([])

    function search () {
      searchResults.value = [] // 清空搜索结果

      const keyword = searchKeyword.value
      const textNodes = getTextNodes(_this.$refs.pageContent)

      textNodes.forEach(textNode => {
        const text = textNode.textContent
        if (text.includes(keyword)) {
          textNode.parentNode.style.backgroundColor = '#d8b56d'
        }
      })
    }

    function getTextNodes (element) {
      const textNodes = []
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false)

      let node
      while ((node = walker.nextNode())) {
        textNodes.push(node)
      }

      return textNodes
    }

    return {
      searchKeyword,
      searchResults,
      preMode,
      fontSize,
      showLineNumbers,
      saveTime,
      autoSave,
      autoFullScreen,
      autoUpdate,
      imgPath,
      showRender,
      shortcuts,
      savePreferences,
      captureShortcut,
      search,
      getTextNodes,
      showImgSelection,
      imgOption
    }
  }
}
</script>

<style scoped>
.preferences {
  max-width: 400px;
  /*margin: auto;*/
  margin-left: 40px;
  padding: 20px;
}

.preference-item {
  margin-top: 25px;
  margin-bottom: 20px;
}

select {
  border: 1px solid #aaaaaa;
  width: 100%;
  height: 40px;
  font-size: 15px;
}

button {
  padding: 5px 10px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

label {
  font-size: 16px;
  margin-top: 10px;
}

li {
  padding-right: 3px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 14px;
}

.checkboxInput {
  color: #42b983;
  -webkit-transition: .2s;
  border-radius: 4px;
}

.numberInput {
  height: 35px;
  border-width: 2px;
  border-style: solid;
  font-size: 14px;
  color: #565656;
  outline: none;
}

.optionBtn {
  border-radius: 3px;
  opacity: 1;
  background-color: #42b983;
  font-family: "Noto Sans SC";
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

.imgSelectionItem {
  padding-right: 3px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 14px;
}

.imgSelectionItem:hover {
  background-color: #efefef;
  -webkit-transition: .2s;
  font-weight: 900;
}

</style>
