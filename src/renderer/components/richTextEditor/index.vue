<template>
  <div>
    <div id="search" v-show="searchData.open">
      <input type="text" placeholder="搜索" v-model="searchData.searchText" />
      <button @click="search" class="pl-3">搜索</button>
      <button @click="closeSearch" class="pl-3">关闭</button>
      <button @click="prev" class="pl-3">上一个</button>
      <button @click="next" class="pl-3">下一个</button>
      <input type="checkbox" id="ignoreCase" v-model="searchData.ignoreCase" class="pl-3"/>
      <label for="ignoreCase">忽略大小写</label>
      <input type="checkbox" id="matchWholeWord" v-model="searchData.matchWholeWord" class="pl-3"/>
      <label for="matchWholeWord">全字匹配</label>
      <input type="text" placeholder="替换" v-model="searchData.replaceText" class="pl-3"/>
      <button @click="replace" class="pl-3">替换</button>
      <button @click="replaceAll" class="pl-3">全部替换</button>
      <span class="pl-3">{{ searchData.current }}/{{ searchData.total }}</span>
    </div>
    <div id="vditor" class="vditor"/>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, watch, nextTick, reactive } from 'vue'
import Vditor from 'ficus-editor'
import 'ficus-editor/dist/index.css'
import defineRAPI from './defineRAPI.js'
import bus from 'vue3-eventbus'

export default {
  name: 'TextUI',
  setup () {
    let vditor
    const searchData = reactive({
      open: false,
      searchText: '',
      replaceText: '',
      current: 0,
      total: 0,
      ignoreCase: true,
      matchWholeWord: false
    })

    // 搜索
    const search = () => {
      console.log(searchData.searchText)
      vditor.vditor.search.run(vditor.vditor, searchData.searchText, true)
      const res = vditor.vditor.search.getSearchCounter()
      searchData.current = res.current
      searchData.total = res.total
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

    // 设置是否忽略大小写
    const setIgnoreCase = () => {
      vditor.vditor.search.setIgnoreCase(searchData.ignoreCase)
    }

    // 设置是否全字匹配
    const setMatchWholeWord = () => {
      vditor.vditor.search.setMatchWholeWord(searchData.matchWholeWord)
    }

    // 替换
    const replace = () => {
      vditor.vditor.search.replace(vditor.vditor, searchData.replaceText, true)
      const res = vditor.vditor.search.getSearchCounter()
      searchData.current = res.current
      searchData.total = res.total
    }

    // 全部替换
    const replaceAll = () => {
      vditor.vditor.search.replaceAll(vditor.vditor, searchData.replaceText)
      const res = vditor.vditor.search.getSearchCounter()
      searchData.current = res.current
      searchData.total = res.total
    }

    // 初始化
    const initVditor = () => {
      // options
      const options =
      {
        // 设置cdn
        cdn: '/ficus-editor',
        hint: {
          emojiPath: '/ficus-editor'
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
        // 预览模式选项
        preview: {
          // 设置预览最大宽度
          maxWidth: 896,
          // 预览时间间隔(毫秒)
          delay: 100,
          // 设备适配选项（暂时为空）
          actions: [],
          // 数学公式渲染选项
          math: {
            engine: 'KaTeX'
          },
          // 设置默认主题
          theme: {
            current: 'classic',
            path: '/ficus-editor/dist/css/content-theme'
          },
          // 设置markdown渲染选项
          markdown: {
            mark: true,
            linkBase: 'ficus://'
          }
        },
        // 设置tab键渲染
        tab: '\t',
        // 打字机模式（类似与typora）
        typewriterMode: false,
        // 内容为空时的提示
        placeholder: '请输入...',
        // 绑定快捷键
        ficusHotkey: [
          {
            hotkey: '⌘Z',
            action: () => {
              bus.emit('undoCurTab')
            }
          },
          {
            hotkey: '⇧⌘Z',
            action: () => {
              bus.emit('redoCurTab')
            }
          },
          {
            hotkey: '⌘F',
            action: () => {
              searchData.open = true
            }
          }
        ],
        // 创建实例后，将props中传入的内容展示出来, 并隐藏工具栏
        after: () => {
          vditor.hideToorBar()
        },
        // 用户输入回调函数，将最新的md字符串返回
        input: (content) => {
          bus.emit('saveChange', {
            content: content,
            wordCnt: content.length,
            lineCnt: content.split('\n').length - 1
          })
          // 如果用户正在搜索，则实时返回最新的搜索结果
          if (vditor.vditor.search.isSearching) {
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
        setIgnoreCase(value)
      }
    )

    // 监听searchData.matchWholeWord
    watch(
      () => searchData.matchWholeWord,
      (value) => {
        setMatchWholeWord(value)
      }
    )

    // 初始化编辑器
    onMounted(() => {
      nextTick(() => {
        // 初始化vditor
        initVditor()
        // 定义和vditor相关的API, 使用全局事件总线实现
        defineRAPI(vditor, searchData)
      })
    })

    // 销毁
    onBeforeUnmount(() => {
      vditor.destroy()
      vditor = null
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
      replaceAll
    }
  }
}
</script>

<style scoped>

</style>
