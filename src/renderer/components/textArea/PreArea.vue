<template>
  <div ref="pageContent">
    <div v-show="preMode === 0" class="preferences">
      <div class="title-font" style="font-size: 33px">通用</div>

      <div class="preference-item">
        <div class="font-bold" style="font-size: 20px">保存：</div>
        <label>自动保存时间（s）：</label>
        <input type="number" v-model="saveTime"><br/>
        <label>自动保存：</label>
        <input type="checkbox" v-model="autoSave">
      </div>

      <div class="preference-item">
        <div class="font-bold" style="font-size: 20px">全屏：</div>
        <label>启动时自动全屏：</label>
        <input type="checkbox" v-model="autoFullScreen">
      </div>

      <div class="preference-item">
        <div class="font-bold" style="font-size: 20px">更新：</div>
        <label>启动时自动更新：</label>
        <input type="checkbox" v-model="autoUpdate">
      </div>

      <div class="preference-item">
        <button @click="savePreferences">保存</button>
      </div>
    </div>
    <div v-show="preMode === 1" class="preferences">
      <div class="title-font" style="font-size: 33px">编辑器</div>

      <div class="preference-item">
        <div class="font-bold" style="font-size: 20px">字体：</div>
        <label>字体大小:</label>
        <input type="number" v-model="fontSize">
      </div>

      <div class="preference-item">
        <div class="font-bold" style="font-size: 20px">行号：</div>
        <label>显示代码块行号：</label>
        <input type="checkbox" v-model="showLineNumbers">
      </div>

      <div class="preference-item">
        <div class="font-bold" style="font-size: 20px">图片：</div>
        <select v-model="imgPath">
          <option value=0>复制到指定路径</option>
          <option value=1>复制图片到当前文件夹</option>
          <option value=2>复制图片到./${filename}.assets文件夹</option>
          <option value=3>上传图片</option>
          <option value=4>复制到指定路径</option>
        </select>
      </div>

      <div class="preference-item">
        <div class="font-bold" style="font-size: 20px">源码：</div>
        <label>预览渲染结果：</label>
        <input type="checkbox" v-model="showRender">
      </div>

      <div class="preference-item">
        <button @click="savePreferences">保存</button>
      </div>
    </div>
    <div v-show="preMode === 2" class="preferences">
      <div class="title-font" style="font-size: 33px">快捷键</div>
      <ul>
        <li v-for="(shortcut, index) in shortcuts" :key="index" class="preference-item">
          <label>{{ shortcut.name }}：</label>
          <input @keydown="captureShortcut(index, $event)" ref="shortcutInput" :value="shortcut.key"><br/>
        </li>
      </ul>
      <div class="preference-item">
        <button @click="savePreferences">保存</button>
      </div>
    </div>
    <div v-show="preMode === 3" class="preferences">
      <div class="title-font" style="font-size: 33px">榕功能</div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
import bus from 'vue3-eventbus'

export default {
  name: 'PreArea',
  setup () {
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance()
    const _this = proxy
    const preMode = ref(0) // 0-通用，1-编辑器，2-快捷键，3-榕功能
    const fontSize = ref(14)
    const showLineNumbers = ref(true)
    const saveTime = ref(30)
    const autoSave = ref(true)
    const autoFullScreen = ref(true)
    const autoUpdate = ref(true)
    const imgPath = ref(0) // 0-无特殊操作, 1-复制图片到当前文件夹, 2-复制图片到./${filename}.assets文件夹, 3-上传图片, 4-复制到指定路径
    const showRender = ref(true)
    const shortcuts = ref([{
      name: '打开文件',
      key: 'ctrl + o'
    }, {
      name: '打开文件夹',
      key: 'ctrl + shift + o'
    }])

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
      getTextNodes
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
  margin-top: 10px;
  margin-bottom: 10px;
}

select {
  border: 1px solid #aaaaaa;
  width: 100%;
  height: 40px;
  font-size: 15px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>
