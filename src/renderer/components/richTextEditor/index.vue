<template>
  <div class="relative">
    <div id="search" v-show="searchData.open" class="absolute rounded-lg floatingBar items-center py-2 px-4 flex">
      <div class="mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="20" height="20" viewBox="0 0 15 15">
          <g clip-path="url(#master_svg0_181_0090)"><g><g>
            <path d="M5.808059999999999,0.808056C5.92527,0.69085,6.08424,0.625,6.25,0.625L11.25,0.625C12.2856,0.625,13.125,1.464469,13.125,2.5L13.125,5C13.125,5.34518,12.8452,5.625,12.5,5.625C12.1548,5.625,11.875,5.34518,11.875,5L11.875,2.5C11.875,2.15482,11.59519,1.875,11.25,1.875L6.875,1.875L6.875,5C6.875,5.34518,6.59519,5.625,6.25,5.625L3.125,5.625L3.125,12.5C3.125,12.8452,3.40482,13.125,3.75,13.125L6.25,13.125C6.59519,13.125,6.875,13.4048,6.875,13.75C6.875,14.0952,6.59519,14.375,6.25,14.375L3.75,14.375C2.7144690000000002,14.375,1.875,13.5356,1.875,12.5L1.875,5C1.875,4.83424,1.94085,4.67527,2.058056,4.558059999999999L5.808059999999999,0.808056ZM4.0088799999999996,4.375L5.625,4.375L5.625,2.75888L4.0088799999999996,4.375ZM12.6073,11.7234C12.9344,11.2294,13.125,10.6369,13.125,10C13.125,8.27413,11.72587,6.875,10,6.875C8.27413,6.875,6.875,8.27413,6.875,10C6.875,11.7259,8.27413,13.125,10,13.125C10.63694,13.125,11.22937,12.9344,11.72338,12.6073L13.3081,14.1919C13.5521,14.436,13.9479,14.436,14.1919,14.1919C14.436,13.9479,14.436,13.5521,14.1919,13.3081L12.6073,11.7234ZM8.125,10C8.125,8.96444,8.96444,8.125,10,8.125C11.03556,8.125,11.875,8.96444,11.875,10C11.875,11.0356,11.03556,11.875,10,11.875C8.96444,11.875,8.125,11.0356,8.125,10Z" fill-rule="evenodd"
                  fill="#A1A1A1" fill-opacity="1"/>
          </g></g></g>
        </svg>
      </div>
      <div class="searchTab rounded-md mr-3 items-center flex">
        <input type="text" ref="searchInputBox" placeholder="查找 ..." v-model="searchData.searchText"
               class="searchTab rounded-md" style="width: 150px"
               @keyup.enter="search" @input="search"/>
        <span class="px-2"
              style="font-size: 13px; font-family: 'Noto Sans SC'; font-weight: 400; color: #a1a1a1;">
          {{ searchData.current }} / {{ searchData.total }}
        </span>
      </div>
      <div :title="'忽略大小写'" class="searchBtn p-2 rounded-md"
           @click="searchData.ignoreCase = !searchData.ignoreCase">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="18" height="18" viewBox="0 0 10 6">
          <g clip-path="url(#master_svg0_181_0097)"><g>
            <path d="M7.41445,6C6.9668,6,6.51113,5.86287,6.25469,5.43319C6.14102,5.24163,6.08476,4.99841,6.08476,4.70352C6.08476,4.01956,6.40039,3.59413,6.99609,3.403C7.17715,3.34453,7.37441,3.30775,7.58555,3.2901C7.81387,3.27097,7.99746,3.24652,8.1373,3.21952C8.27578,3.19103,8.37695,3.15148,8.43945,3.09982C8.58476,2.98033,8.54961,2.72542,8.40957,2.61741C8.23691,2.48751,7.92441,2.4958,7.7541,2.6257C7.6666,2.69225,7.61289,2.79409,7.59551,2.93143L6.24453,2.93143C6.26211,2.661,6.34082,2.41076,6.48183,2.18242C6.96621,1.39428,8.14277,1.2918,8.9039,1.53715C9.49121,1.7217,10,2.17179,10,2.88509L10,5.93069L8.62793,5.93069L8.62793,5.30562L8.59551,5.30562C8.34414,5.81843,7.93047,6,7.41445,6ZM1.59668,5.93069L0,5.93069L1.79902,0L3.82031,0L5.61797,5.93069L4.02246,5.93069L3.72754,4.796L1.89141,4.796L1.59668,5.93069ZM3.41406,3.59052L2.90527,1.63346L2.71289,1.63346L2.20449,3.59052L3.41406,3.59052ZM8.2084,4.91698C8.59551,4.71968,8.54297,4.37398,8.54297,3.98469C8.35488,4.06761,8.15781,4.11374,7.95762,4.14627C7.71973,4.18901,7.46816,4.30594,7.46816,4.60976C7.46816,5.02923,7.94043,5.05347,8.2084,4.91698Z"
                  :fill="searchData.ignoreCase ? `#3d3d3d` : `#42b983`" fill-opacity="1"/></g></g>
        </svg>
      </div>
      <div :title="'全字匹配'" class="searchBtn p-2 rounded-md"
           @click="searchData.matchWholeWord = !searchData.matchWholeWord">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="18" height="18" viewBox="0 0 10 10">
          <g style="mix-blend-mode:passthrough"><g style="mix-blend-mode:passthrough">
            <path d="M1,2L2,2L2,7L1,7L1,2ZM3.75,6.75L3.75,2.25C3.75,2.111929,3.86193,2,4,2C4.13807,2,4.25,2.111929,4.25,2.25L4.25,6.75C4.25,6.88807,4.13807,7,4,7C3.86193,7,3.75,6.88807,3.75,6.75ZM4.75,2.25C4.75,2.111929,4.86193,2,5,2C5.13807,2,5.25,2.111929,5.25,2.25L5.25,6.75C5.25,6.88807,5.13807,7,5,7C4.86193,7,4.75,6.88807,4.75,6.75L4.75,2.25ZM5.75,2.25C5.75,2.111929,5.86193,2,6,2C6.13807,2,6.25,2.111929,6.25,2.25L6.25,6.75C6.25,6.88807,6.13807,7,6,7C5.86193,7,5.75,6.88807,5.75,6.75L5.75,2.25ZM8,7L9,7L9,2L8,2L8,7ZM2.25,7L2.25,8.5L7.75,8.5L7.75,7L7.25,7L7.25,8L2.75,8L2.75,7L2.25,7Z" fill-rule="evenodd"
                  :fill="searchData.matchWholeWord ? `#42b983` : `#3d3d3d`" fill-opacity="1"/></g></g>
        </svg>
      </div>
      <!--<button @click="search" class="searchBtn p-2 rounded-md">搜索</button>-->

      <hr style="border: none; border-top: 1px solid #D8D8D8; height: 2px; width: 15px; transform: rotate(90deg);" class="ml-1 mr-2"/>

      <input type="text" ref="replaceInputBox" placeholder="替换为 ..." v-model="searchData.replaceText"
             class="searchTab rounded-md mr-3" style="width: 180px"
              @keyup.enter="replace"/>
      <button @click="replace" class="searchBtn p-2 rounded-md">替换</button>
      <button @click="replaceAll" class="searchBtn p-2 rounded-md">全部</button>

      <div :title="'上一个'" class="searchBtn p-2 rounded-md"
           @click="prev">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="18" height="18" viewBox="0 0 12 12">
          <g transform="matrix(-1,0,0,-1,24,24)" clip-path="url(#master_svg0_181_0108)"><g><g>
            <path d="M14.146445,16.146445C14.34171,15.951185,14.658290000000001,15.951185,14.853555,16.146445L18,19.2929L21.14645,16.146445C21.3417,15.951185,21.6583,15.951185,21.85355,16.146445C22.0488,16.34171,22.0488,16.65829,21.85355,16.853555L18.35355,20.35355C18.1583,20.5488,17.8417,20.5488,17.64645,20.35355L14.146445,16.853555C13.951185,16.65829,13.951185,16.34171,14.146445,16.146445Z" fill-rule="evenodd"
                  fill="#3D3D3D" fill-opacity="1"/>
          </g></g></g>
        </svg>
      </div>
      <div :title="'下一个'" class="searchBtn p-2 rounded-md"
           @click="next">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="18" height="18" viewBox="0 0 12 12">
          <defs><clipPath id="master_svg0_181_0101"><rect x="0" y="0" width="12" height="12" rx="0"/></clipPath></defs>
          <g clip-path="url(#master_svg0_181_0101)"><g><g>
            <path d="M2.146445,4.146445C2.34171,3.951185,2.65829,3.951185,2.853555,4.146445L6,7.2928999999999995L9.14645,4.146445C9.3417,3.951185,9.6583,3.951185,9.85355,4.146445C10.0488,4.34171,10.0488,4.65829,9.85355,4.853555L6.35355,8.35355C6.1583,8.5488,5.8416999999999994,8.5488,5.64645,8.35355L2.146445,4.853555C1.951185,4.65829,1.951185,4.34171,2.146445,4.146445Z" fill-rule="evenodd"
                  fill="#3D3D3D" fill-opacity="1"/>
          </g></g></g>
        </svg>
      </div>
      <div :title="'关闭'" class="searchBtn p-2 rounded-md"
           @click="closeSearch">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="18" height="18" viewBox="0 0 12 12">
          <defs><clipPath id="master_svg0_181_9511"><rect x="0" y="0" width="12" height="12" rx="0"/></clipPath></defs>
          <g style="mix-blend-mode:passthrough"><g style="mix-blend-mode:passthrough" clip-path="url(#master_svg0_181_9511)"><g style="mix-blend-mode:passthrough">
            <path d="M2.646476517578125,2.646446C2.841739517578125,2.4511845,3.158320517578125,2.4511845,3.353585517578125,2.646446C3.353585517578125,2.646446,6.000030517578125,5.2928999999999995,6.000030517578125,5.2928999999999995C6.000030517578125,5.2928999999999995,8.646480517578125,2.646446,8.646480517578125,2.646446C8.841730517578124,2.4511845,9.158330517578126,2.4511845,9.353580517578125,2.646446C9.548830517578125,2.841709,9.548830517578125,3.15829,9.353580517578125,3.353555C9.353580517578125,3.353555,6.707140517578125,6,6.707140517578125,6C6.707140517578125,6,9.353580517578125,8.64645,9.353580517578125,8.64645C9.548830517578125,8.8417,9.548830517578125,9.1583,9.353580517578125,9.35355C9.158330517578126,9.5488,8.841730517578124,9.5488,8.646480517578125,9.35355C8.646480517578125,9.35355,6.000030517578125,6.70711,6.000030517578125,6.70711C6.000030517578125,6.70711,3.353585517578125,9.35355,3.353585517578125,9.35355C3.158320517578125,9.5488,2.841739517578125,9.5488,2.646476517578125,9.35355C2.451215017578125,9.1583,2.451215017578125,8.8417,2.646476517578125,8.64645C2.646476517578125,8.64645,5.2929305175781245,6,5.2929305175781245,6C5.2929305175781245,6,2.646476517578125,3.353555,2.646476517578125,3.353555C2.451215017578125,3.15829,2.451215017578125,2.841709,2.646476517578125,2.646446C2.646476517578125,2.646446,2.646476517578125,2.646446,2.646476517578125,2.646446Z" fill-rule="evenodd"
                  fill="#3D3D3D" fill-opacity="1"/>
        </g></g></g>
        </svg>
      </div>
    </div>
    <div id="vditor" class="vditor"/>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, watch, nextTick, reactive, ref } from 'vue'
import Vditor from 'ficus-editor'
import 'ficus-editor/dist/index.css'
import defineRAPI from './defineRAPI.js'
import bus from 'vue3-eventbus'
import { viditorFormatAccelerator } from '@/common/keybindings'

export default {
  name: 'TextUI',
  setup () {
    let vditor
    const searchData = reactive({
      open: false,
      searchText: '',
      prevSearchText: '',
      replaceText: '',
      current: 0,
      total: 0,
      ignoreCase: true,
      matchWholeWord: false
    })

    const searchInputBox = ref(null)
    const replaceInputBox = ref(null)

    // 搜索
    const search = (force = false) => {
      if (searchData.searchText !== searchData.prevSearchText || force) {
        vditor.vditor.search.run(vditor.vditor, searchData.searchText, true)
        const res = vditor.vditor.search.getSearchCounter()
        searchData.current = res.current
        searchData.total = res.total
        searchData.prevSearchText = searchData.searchText
      } else {
        next()
      }
      nextTick(() => {
        searchInputBox.value.focus()
      })
    }

    // 关闭搜索栏
    const closeSearch = () => {
      vditor.vditor.search.close(vditor.vditor)
      searchData.current = 0
      searchData.total = 0
      searchData.open = false
    }

    // 上一个
    const prev = () => {
      vditor.vditor.search.prev(vditor.vditor)
      const res = vditor.vditor.search.getSearchCounter()
      searchData.current = res.current
      searchData.total = res.total
    }

    // 下一个
    const next = () => {
      vditor.vditor.search.next(vditor.vditor)
      const res = vditor.vditor.search.getSearchCounter()
      searchData.current = res.current
      searchData.total = res.total
    }

    // 设置是否忽略大小写, 并重新搜索
    const setIgnoreCase = () => {
      vditor.vditor.search.setIgnoreCase(searchData.ignoreCase)
      search(true)
    }

    // 设置是否全字匹配, 并重新搜索
    const setMatchWholeWord = () => {
      vditor.vditor.search.setMatchWholeWord(searchData.matchWholeWord)
      search(true)
    }

    // 替换
    const replace = () => {
      vditor.vditor.search.replace(vditor.vditor, searchData.replaceText, true)
      const res = vditor.vditor.search.getSearchCounter()
      searchData.current = res.current
      searchData.total = res.total
      nextTick(() => {
        replaceInputBox.value.focus()
      })
    }

    // 全部替换
    const replaceAll = () => {
      vditor.vditor.search.replaceAll(vditor.vditor, searchData.replaceText)
      const res = vditor.vditor.search.getSearchCounter()
      searchData.current = res.current
      searchData.total = res.total
    }

    // 初始化
    const initVditor = (keybindings = []) => {
      // options
      const options =
      {
        // 设置cdn
        cdn: '/ficus-editor',
        hint: {
          emojiPath: '/ficus-editor',
          // 根据用户输入的“链接url“或“图片url”生成提示列表
          genLinkHint: async (input) => {
            // ...
            return window.electronAPI.autoPathCompletion(input)
          }
        },
        // 编辑器高度
        height: '100%',
        // 初始模式（所见即所得）
        mode: 'wysiwyg',
        // 缓存设置
        cache: {
          enable: false
        },
        // 设置回调延迟
        undoDelay: 50,
        upload: {
          url: 'http://ficus.world/local_api/upload'
        },
        // 预览模式选项
        preview: {
          // 设置预览最大宽度
          maxWidth: 1088,
          // 预览时间间隔(毫秒)
          delay: 100,
          // 设备适配选项（暂时为空）
          actions: [],
          // 数学公式渲染选项
          math: {
            engine: 'KaTeX',
            inlineDigit: true
          },
          // 设置默认主题
          theme: {
            current: 'classic',
            path: '/ficus-editor/dist/css/content-theme'
          },
          // 设置markdown渲染选项
          markdown: {
            toc: true,
            mark: true,
            linkBase: 'ficus://'
          }
        },
        // 设置tab键渲染
        tab: '  ',
        // 打字机模式（类似与typora）
        typewriterMode: false,
        // 内容为空时的提示
        placeholder: '请输入...',
        // 绑定快捷键
        ficusHotkey: [
          ...keybindings
        ],
        // 创建实例后，将props中传入的内容展示出来, 并隐藏工具栏
        after: () => {
          vditor.hideToorBar()
        },
        // 用户输入回调函数，将最新的md字符串返回
        input: (content) => {
          bus.emit('saveChange', {
            content,
            wordCnt: content.length,
            lineCnt: content.split('\n').length - 1
          })
          // 如果用户正在搜索，则实时返回最新的搜索结果
          if (vditor?.vditor.search.isSearching) {
            const res = vditor.vditor.search.getSearchCounter()
            searchData.current = res.current
            searchData.total = res.total
          }
        },
        // 针对文件链接的回调函数
        link: {
          click: (aElement) => {
            if (aElement.getAttribute('class') === 'ficus-filelink') {
              const name = aElement.innerText
              let path = aElement.getAttribute('href')
              if (path.startsWith('ficus://')) {
                path = path.slice(8)
              }
              bus.emit('openRefFile', { name, path })
            } else {
              window.open(event.target.getAttribute('href'))
            }
          }
        }
      }
      // 根据options和默认设置创建vditor实例
      vditor = new Vditor('vditor', options)
    }

    // 监听searchData.ignoreCase
    watch(
      () => searchData.ignoreCase,
      (value) => {
        setIgnoreCase()
      }
    )

    // 监听searchData.matchWholeWord
    watch(
      () => searchData.matchWholeWord,
      (value) => {
        setMatchWholeWord()
      }
    )

    // 监听searchDate.open
    watch(
      () => searchData.open,
      (newValue, oldValue) => {
        if (newValue && !oldValue) {
          nextTick(() => {
            searchInputBox.value.focus()
          })
        }
      }
    )

    const makeKeybingdingMap = (keybindingMap) => {
      const newKeybinding = []
      for (const [id, accelerator] of keybindingMap) {
        if (accelerator) {
          if (window.electronAPI.isOSx()) {
            newKeybinding.push({
              hotkey: viditorFormatAccelerator(accelerator),
              action: () => {
                bus.emit('cmd::execute', { id })
              }
            })
          } else {
            newKeybinding.push({
              hotkey: viditorFormatAccelerator(accelerator),
              action: () => {}
            })
          }
        }
      }
      return newKeybinding
    }

    // 初始化编辑器
    onMounted(() => {
      nextTick(async () => {
        let keybindings = []
        // macOs快捷键通过menu实现，其他系统通过LocalShortcut实现
        keybindings = makeKeybingdingMap((await window.electronAPI.getKeybindingsMap()))
        // 初始化vditor
        initVditor(keybindings)
        // 定义和vditor相关的API, 使用全局事件总线实现
        defineRAPI(vditor, searchData)
      })
    })

    // 销毁
    onBeforeUnmount(() => {
      vditor.destroy()
      vditor = null
    })

    bus.on('openSearchEngine', () => {
      console.log('emit')
      searchData.open = true
    })

    return {
      searchData,
      search,
      closeSearch,
      prev,
      next,
      setIgnoreCase,
      setMatchWholeWord,
      replace,
      replaceAll,
      searchInputBox,
      replaceInputBox
    }
  }
}
</script>

<style scoped>
.vditor {
  padding-top: 18px;
}

.floatingBar {
  top: 20px;
  right: 50px;
  z-index: 9999;
  opacity: 1;
  background: #FFFFFF;
  box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  font-family: "Noto Sans SC";
  font-weight: 400;
}

.searchTab {
  border: none;
  outline: none;
  height: 30px;
  background-color: #f4f4f3;
}

.searchTab::placeholder {
  font-size: 13px;
  font-family: "Noto Sans SC";
  font-weight: 400;
  color: #a1a1a1;
}

.searchTab:focus {
  font-size: 13px;
  font-family: "Noto Sans SC";
  font-weight: 400;
  color: #3d3d3d;
}

.searchTab:valid {
  font-size: 13px;
  font-family: "Noto Sans SC";
  font-weight: 400;
  color: #3d3d3d;
}

.searchBtn:hover {
  background-color: #f4f4f3;
  -webkit-transition: left .3s, background-color .3s;
}

.searchBtn:active {
  background-color: #e0e0e0;
  -webkit-transition: left .3s, background-color .3s;
}</style>
