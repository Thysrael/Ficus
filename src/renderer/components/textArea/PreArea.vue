<template>
  <div ref="pageContent" style="user-select: none; background: right bottom;" class="px-24 bg-scroll bg-cover"
       :style="bgURL">
    <div v-show="preMode === 0" class="preferences">
      <div class="title-font my-6" style="font-size: 40px" >通用</div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">保存</div>
        <label>自动保存间隔（s）：</label>
        <input type="number" v-model="common.saveTime" class="numberInput rounded-md" min="0" max="100"> s<br/>
        <label>自动保存：</label>
        <input type="checkbox" v-model="common.autoSave" class="checkboxInput">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">全屏</div>
        <label>启动时自动全屏：</label>
        <input type="checkbox" v-model="common.autoFullScreen" class="checkboxInput">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">更新</div>
        <label>启动时自动更新：</label>
        <input type="checkbox" v-model="common.autoUpdate" class="checkboxInput">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">侧边栏</div>
        <label>启动时侧边宽度：</label>
        <input type="number" v-model="common.sideBarInitWidth" class="numberInput rounded-md" min="280" max="400"> px
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">忽略文件/文件夹（请用换行符分隔）</div>
        <textarea class="numberInput rounded-md p-2 text-gray-700 w-full" style="height: 100px" v-model="ficus.graphSetting.ficusIgnore"/>
      </div>

    </div>
    <div v-show="preMode === 1" class="preferences">
      <div class="title-font my-6" style="font-size: 40px">编辑器</div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">行号</div>
        <label>显示代码块行号：</label>
        <input type="checkbox" v-model="editor.showLineNumber" class="checkboxInput">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">图片保存路径</div>
        <div class="rounded-md p-2 border-2 align-middle flex relative" style="color: #565656"
             @click="showImgSelection = !showImgSelection">
          {{ imgOption[imgPath] }}
          <div class="absolute align-middle py-1" style="right: 10px">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#565656"></path> </g></svg>
          </div>
        </div>
        <ul v-if="showImgSelection" class="p-2 border-2 rounded-md shadow-md">
          <li v-for="(option, index) in imgOption" :key="option"
              @click="imgPath = index; editor.imgPath = imgPath; showImgSelection = !showImgSelection"
              class="m-2 px-2 py-1 rounded-md imgSelectionItem">
            {{ option }}
          </li>
        </ul>
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">悬浮栏选项</div>
        <label>加粗：</label>
        <input type="checkbox" v-model="editor.toolBar.bold" class="checkboxInput"><br/>
        <label>斜体：</label>
        <input type="checkbox" v-model="editor.toolBar.italic" class="checkboxInput"><br/>
        <label>高亮：</label>
        <input type="checkbox" v-model="editor.toolBar.strike" class="checkboxInput"><br/>
        <label>行内代码：</label>
        <input type="checkbox" v-model="editor.toolBar.inlineCode" class="checkboxInput"><br/>
        <label>行内公式：</label>
        <input type="checkbox" v-model="editor.toolBar.inlineMath" class="checkboxInput"><br/>
        <label>清除样式：</label>
        <input type="checkbox" v-model="editor.toolBar.clear" class="checkboxInput">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">公式</div>
        <div class="rounded-md p-2 border-2 align-middle flex relative" style="color: #565656"
             @click="showLatexSelection = !showLatexSelection">
          {{ latexOption[latexPath] }}
          <div class="absolute align-middle py-1" style="right: 10px">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#565656"></path> </g></svg>
          </div>
        </div>
        <ul v-if="showLatexSelection" class="p-2 border-2 rounded-md shadow-md">
          <li v-for="(option, index) in latexOption" :key="option"
              @click="latexPath = index; editor.latexEngine = latexOption[latexPath]; showLatexSelection = !showLatexSelection"
              class="m-2 px-2 py-1 rounded-md imgSelectionItem">
            {{ option }}
          </li>
        </ul>
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">代码主题</div>
        <div class="rounded-md p-2 border-2 align-middle flex relative" style="color: #565656"
             @click="showCodeSelection = !showCodeSelection">
          {{ codeOption[codePath] }}
          <div class="absolute align-middle py-1" style="right: 10px">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#565656"></path> </g></svg>
          </div>
        </div>
        <ul v-if="showCodeSelection" class="p-2 border-2 rounded-md shadow-md">
          <li v-for="(option, index) in codeOption" :key="option"
              @click="codePath = index; editor.codeTheme = codeOption[codePath]; showCodeSelection = !showCodeSelection"
              class="m-2 px-2 py-1 rounded-md imgSelectionItem">
            {{ option }}
          </li>
        </ul>
      </div>

      <div class="preference-item">
        <div class="font-bold" style="font-size: 20px">其他</div>
        <label>渲染区域自动加空格：</label>
        <input type="checkbox" v-model="editor.autoSpace" class="checkboxInput"><br>
        <label>自动矫正术语：</label>
        <input type="checkbox" v-model="editor.autoFixTermTypo" class="checkboxInput">
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">源码</div>
        <label>预览渲染结果：</label>
        <input type="checkbox" v-model="editor.svPreview" class="checkboxInput">
      </div>
    </div>

    <div v-show="preMode === 2" class="preferences">
      <div class="title-font my-6" style="font-size: 40px">快捷键</div>
      <ul>
        <li v-for="(value, key) in shortcuts" :key="key" class="preference-item">
          <label>{{ getKeyName(key) }}：</label>
          <input @keydown="captureShortcut(key, $event)" ref="shortcutInput" :value="value"
                 class="numberInput rounded-md p-2 text-gray-700"
                 @blur="setKeyBind(key)"><br/>
        </li>
      </ul>
      <button class="optionBtn py-1 flex align-middle justify-center content-center" style="text-align: center" @click="clearUserKeyBinding">
        恢复默认设置
      </button>
    </div>

    <div v-show="preMode === 3" class="preferences">
      <div class="title-font my-6" style="font-size: 40px">榕功能</div>
      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">榕树默认展开级数</div>
        <div class="rounded-md p-2 border-2 align-middle flex relative" style="color: #565656"
               @click="showTreeLevelSelection = !showTreeLevelSelection">
            {{ treeLevelOption[treeLevelPath] }}
            <div class="absolute align-middle py-1" style="right: 10px">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#565656"></path> </g></svg>
            </div>
          </div>
        <ul v-if="showTreeLevelSelection" class="p-2 border-2 rounded-md shadow-md">
          <li v-for="(option, index) in treeLevelOption" :key="option"
              @click="treeLevelPath = index; ficus.treeSetting.defaultLevel = treeLevelPath - 1; showTreeLevelSelection = !showTreeLevelSelection"
              class="m-2 px-2 py-1 rounded-md imgSelectionItem">
            {{ option }}
          </li>
        </ul>
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">榕树默认显示结构</div>
        <div class="rounded-md p-2 border-2 align-middle flex relative" style="color: #565656"
             @click="showTreeStructSelection = !showTreeStructSelection">
          {{ treeStructOption[treeStructPath] }}
          <div class="absolute align-middle py-1" style="right: 10px">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#565656"></path> </g></svg>
          </div>
        </div>
        <ul v-if="showTreeStructSelection" class="p-2 border-2 rounded-md shadow-md">
          <li v-for="(option, index) in treeStructOption" :key="option"
              @click="treeStructPath = index; ficus.treeSetting.defaultStruct = treeStructPath; showTreeStructSelection = !showTreeStructSelection"
              class="m-2 px-2 py-1 rounded-md imgSelectionItem">
            {{ option }}
          </li>
        </ul>
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">榕树主题</div>
        <div class="rounded-md p-2 border-2 align-middle flex relative" style="color: #565656"
             @click="showTreeThemeSelection = !showTreeThemeSelection">
          {{ treeThemeOption[treeThemePath] }}
          <div class="absolute align-middle py-1" style="right: 10px">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#565656"></path> </g></svg>
          </div>
        </div>
        <ul v-if="showTreeThemeSelection" class="p-2 border-2 rounded-md shadow-md">
          <li v-for="(option, index) in treeThemeOption" :key="option"
              @click="treeThemePath = index; ficus.treeSetting.theme = treeThemePath; showTreeThemeSelection = !showTreeThemeSelection"
              class="m-2 px-2 py-1 rounded-md imgSelectionItem">
            {{ option }}
            <div class="p-1 mt-2">
              <img class="rounded-md" v-if="index === 0" alt="theme0" src="../../assets/FicTree0.png">
              <img class="rounded-md" v-else-if="index === 1" alt="theme1" src="../../assets/FicTree1.png">
              <img class="rounded-md" v-if="index === 2" alt="theme2" src="../../assets/FicTree2.png">
            </div>
          </li>
        </ul>
      </div>

      <div class="preference-item">
        <div class="font-bold my-4" style="font-size: 20px">榕图主题</div>
        <div class="rounded-md p-2 border-2 align-middle flex relative" style="color: #565656"
             @click="showGraphThemeSelection = !showGraphThemeSelection">
          {{ graphThemeOption[graphThemePath] }}
          <div class="absolute align-middle py-1" style="right: 10px">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#565656"></path> </g></svg>
          </div>
        </div>
        <ul v-if="showGraphThemeSelection" class="p-2 border-2 rounded-md shadow-md">
          <li v-for="(option, index) in graphThemeOption" :key="option"
              @click="graphThemePath = index; ficus.graphSetting.theme = graphThemePath; showGraphThemeSelection = !showGraphThemeSelection"
              class="m-2 px-2 py-1 rounded-md imgSelectionItem">
            {{ option }}
            <div class="p-1 mt-2">
              <img class="rounded-md shadow-md" v-if="index === 0" alt="theme0" src="../../assets/FicGraph0.png">
              <img class="rounded-md shadow-md" v-else-if="index === 1" alt="theme1" src="../../assets/FicGraph1.png">
              <img class="rounded-md shadow-md" v-if="index === 2" alt="theme2" src="../../assets/FicGraph2.png">
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import bus from 'vue3-eventbus'
import store from '@/renderer/store'
import { modifiableKeybindingsMap } from '@/common/keybindings'

export default {
  name: 'PreArea',
  setup () {
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance()
    const _this = proxy
    const common = store.getters.getCommon
    const preMode = ref(0) // 0-通用，1-编辑器，2-快捷键，3-榕功能
    const imgPath = ref(0) // 0-无特殊操作, 1-复制图片到当前文件夹, 2-复制图片到./${filename}.assets文件夹, 3-上传图片, 4-复制到指定路径
    const showImgSelection = ref(false)
    /* eslint-disable no-template-curly-in-string */
    const imgOption = ['无特殊操作', '复制图片到当前文件夹']
    const editor = store.getters.getEditor
    const shortcuts = store.getters.getShortCuts
    const ficus = store.getters.getFicus
    const latexPath = ref(0) // 0-无特殊操作, 1-复制图片到当前文件夹
    const showLatexSelection = ref(false)
    /* eslint-disable no-template-curly-in-string */
    const latexOption = ['KaTex', 'MathJax']

    const codePath = ref(0) // 0-github, 1-github-dark, 2-stackoverflow-dark, 3-stackoverflow-light
    const showCodeSelection = ref(false)
    /* eslint-disable no-template-curly-in-string */
    const codeOption = ['github', 'github-dark', 'stackoverflow-dark', 'stackoverflow-light']

    const treeLevelPath = ref(0) // -1, 0, 1 ~ 6 分别对应上述的选项，默认值为 -1
    const showTreeLevelSelection = ref(false)
    /* eslint-disable no-template-curly-in-string */
    const treeLevelOption = ['折叠全部', '展开全部', '展开到第 1 级', '展开到第 2 级', '展开到第 3 级', '展开到第 4 级', '展开到第 5 级', '展开到第 6 级']

    const treeStructPath = ref(0) // 0, 1, 2, 3, 4 分别对应上述的选项，默认值为 0
    const showTreeStructSelection = ref(false)
    /* eslint-disable no-template-curly-in-string */
    const treeStructOption = ['逻辑结构图', '思维导图', '目录组织图', '时间轴', '鱼骨图']

    const treeThemePath = ref(0) // // 0, 1, 2 分别对应上述的 3 个主题，默认值为 0
    const showTreeThemeSelection = ref(false)
    /* eslint-disable no-template-curly-in-string */
    const treeThemeOption = ['山亭夏日', '露花倒影', '落虹灼春']

    const graphThemePath = ref(0) // // 0, 1, 2 分别对应上述的 3 个主题，默认值为 0
    const showGraphThemeSelection = ref(false)
    /* eslint-disable no-template-curly-in-string */
    const graphThemeOption = ['山亭夏日', '露花倒影', '落虹灼春']

    bus.on('initPreOpt', () => {
      imgPath.value = editor.imgPath
      latexPath.value = latexOption.indexOf(editor.latexEngine)
      codePath.value = codeOption.indexOf(editor.codeTheme)
      treeLevelPath.value = ficus.treeSetting.defaultLevel + 1
      treeStructPath.value = ficus.treeSetting.defaultStruct
      treeThemePath.value = ficus.treeSetting.theme
      graphThemePath.value = ficus.graphSetting.theme
    })

    /**
     * 对用户的修改进行监听，触发相应的事件
     */
    onMounted(() => {
      // setPopoverToolbar
      watch(() => {
        return store.getters.getEditor.toolBar.bold
      }, (newValue, oldValue) => {
        bus.emit('setPopoverToolbar', store.getters.getEditor.toolBar)
      })
      watch(() => {
        return store.getters.getEditor.toolBar.inlineMath
      }, (newValue, oldValue) => {
        bus.emit('setPopoverToolbar', store.getters.getEditor.toolBar)
      })
      watch(() => {
        return store.getters.getEditor.toolBar.inlineCode
      }, (newValue, oldValue) => {
        bus.emit('setPopoverToolbar', store.getters.getEditor.toolBar)
      })
      watch(() => {
        return store.getters.getEditor.toolBar.italic
      }, (newValue, oldValue) => {
        bus.emit('setPopoverToolbar', store.getters.getEditor.toolBar)
      })
      watch(() => {
        return store.getters.getEditor.toolBar.clear
      }, (newValue, oldValue) => {
        bus.emit('setPopoverToolbar', store.getters.getEditor.toolBar)
      })
      watch(() => {
        return store.getters.getEditor.toolBar.strike
      }, (newValue, oldValue) => {
        bus.emit('setPopoverToolbar', store.getters.getEditor.toolBar)
      })

      // setCodeTheme
      watch(() => {
        return store.getters.getEditor.codeTheme
      }, (newValue, oldValue) => {
        bus.emit('setCodeTheme', { codeTheme: newValue })
      })

      // setLatexEngine
      watch(() => {
        return store.getters.getEditor.latexEngine
      }, (newValue, oldValue) => {
        bus.emit('setLatexEngine', { engine: newValue })
      })

      // setCodeBlockLineNumber
      watch(() => {
        return store.getters.getEditor.showLineNumber
      }, (newValue, oldValue) => {
        bus.emit('setCodeBlockLineNumber', { enable: newValue })
      })

      // setAutoSpace
      watch(() => {
        return store.getters.getEditor.autoSpace
      }, (newValue, oldValue) => {
        bus.emit('setAutoSpace', { enable: newValue })
      })

      // setAutoFixTermTypo
      watch(() => {
        return store.getters.getEditor.autoFixTermTypo
      }, (newValue, oldValue) => {
        bus.emit('setAutoFixTermTypo', { enable: newValue })
      })

      // setSVPreview
      watch(() => {
        return store.getters.getEditor.svPreview
      }, (newValue, oldValue) => {
        bus.emit('setSVPreview', { enable: newValue })
      })

      // setTreeLevel
      watch(() => {
        return store.getters.getFicus.treeSetting.defaultLevel
      }, (newValue, oldValue) => {
        bus.emit('setTreeStyle', store.getters.getFicus.treeSetting)
      })

      // setTreeStruct
      watch(() => {
        return store.getters.getFicus.treeSetting.defaultStruct
      }, (newValue, oldValue) => {
        bus.emit('setTreeStyle', store.getters.getFicus.treeSetting)
      })

      // setTreeTheme
      watch(() => {
        return store.getters.getFicus.treeSetting.theme
      }, (newValue, oldValue) => {
        bus.emit('setTreeStyle', store.getters.getFicus.treeSetting)
      })

      // setFicusIgnore
      watch(() => {
        return store.getters.getFicus.graphSetting.ficusIgnore
      }, (newValue, oldValue) => {
        bus.emit('setGraphStyle', store.getters.getFicus.graphSetting)
      })

      // setGraphTheme
      watch(() => {
        return store.getters.getFicus.graphSetting.theme
      }, (newValue, oldValue) => {
        bus.emit('setGraphStyle', store.getters.getFicus.graphSetting)
      })
    })

    bus.on('changePreMode', (value) => {
      preMode.value = value
    })

    function getKeyCombination (event) {
      const keyCombination = []

      if (event.ctrlKey) {
        if (window.electronAPI.isOSx()) {
          keyCombination.push('Control')
        } else {
          keyCombination.push('Ctrl')
        }
      }

      if (event.shiftKey) {
        keyCombination.push('Shift')
      }

      if (event.altKey) {
        if (window.electronAPI.isOSx()) {
          keyCombination.push('Option')
        } else {
          keyCombination.push('Alt')
        }
      }

      if (event.metaKey) {
        keyCombination.push('Command')
      }

      if (event.key !== 'Control' &&
          event.key !== 'Shift' &&
          event.key !== 'Alt' &&
          event.key !== 'Meta') {
        keyCombination.push(event.key.toUpperCase())
      }

      return event.key === 'Backspace' ? '' : keyCombination.join('+')
    }

    function captureShortcut (key, event) {
      event.preventDefault() // 阻止输入框默认的按键行为
      // 捕获用户按下的键位，并将其保存到对应的快捷键对象中
      shortcuts[key] = getKeyCombination(event)
    }

    function setKeyBind (key) {
      // 写回 shortcuts[key]
      window.electronAPI.setKeybindingItem({
        id: key,
        accelerator: shortcuts[key]
      })
    }

    const searchKeyword = ref('')
    const searchResults = ref([])

    bus.on('searchByKeyWord', (obj) => {
      searchKeyword.value = obj.keyWord
      search()
    })

    function search () {
      searchResults.value = [] // 清空搜索结果

      const keyword = searchKeyword.value
      const textNodes = getTextNodes(_this.$refs.pageContent)

      textNodes.forEach(textNode => {
        if (keyword === '') {
          textNode.parentNode.style.backgroundColor = '#ffffff'
        } else {
          const text = textNode.textContent
          if (text.includes(keyword)) {
            textNode.parentNode.style.backgroundColor = '#d8b56d'
          } else {
            textNode.parentNode.style.backgroundColor = '#ffffff'
          }
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

    function getKeyName (key) {
      return modifiableKeybindingsMap.get(key)
    }

    function clearUserKeyBinding () {
      window.electronAPI.clearUserKeybindings()
    }

    return {
      searchKeyword,
      searchResults,
      common,
      editor,
      shortcuts,
      ficus,
      preMode,
      clearUserKeyBinding,
      captureShortcut,
      search,
      getTextNodes,
      getKeyName,
      setKeyBind,
      showImgSelection,
      imgPath,
      imgOption,
      latexPath,
      showLatexSelection,
      latexOption,
      codePath,
      showCodeSelection,
      codeOption,
      treeLevelPath,
      showTreeLevelSelection,
      treeLevelOption,
      treeStructPath,
      showTreeStructSelection,
      treeStructOption,
      treeThemePath,
      showTreeThemeSelection,
      treeThemeOption,
      graphThemePath,
      showGraphThemeSelection,
      graphThemeOption,
      bgURL: {
        backgroundImage: 'url("' + require('../../assets/ficus_logo3.png') + '")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '40%'
      }
    }
  }
}
</script>

<style scoped>
.preferences {
  max-width: 600px;
  /*margin: auto;*/
  margin-left: 40px;
  padding: 20px;
  opacity: 1;
}

.preference-item {
  margin-top: 25px;
  margin-bottom: 20px;
}

label {
  width: 180px;
  display: inline-block;
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
