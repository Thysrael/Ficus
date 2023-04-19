<template>
  <div id="app" :style="{ height: windowHeight }">
    <MyHeader :data="data"></MyHeader>
    <div style="display:flex;height: 100%;width:100%;position: relative">
      <SideBar :data="data"></SideBar>
      <TextArea class="myTextArea"></TextArea>
    </div>
    <div class="dialog" v-if="showDialog">
      <div style="width: 300px; height: 30px; background-color: #71717a; text-align: center"> {{ dialogName }} </div>
      <input v-model="fileName" style="width: 300px; height: 30px; background-color: #ffffff" placeholder="请输入..." @keyup.enter="handleNew"/>
      <div style="display: flex; position: relative">
        <button style="position:absolute; left: 20px;" @click="handleNew">
          确认
        </button>
        <button style="position:absolute; right: 20px;" @click="fileName = ''; showDialog = false">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { onMounted, ref } from 'vue'
import MyHeader from '@/renderer/components/header/MyHeader'
import SideBar from '@/renderer/components/sideBar/SideBar'
import TextArea from '@/renderer/components/textArea/TextArea'
import bus from 'vue3-eventbus'

export default {
  name: 'App',
  components: { SideBar, MyHeader, TextArea },
  setup () {
    // const data = ref([{
    //   name: 'app2',
    //   curChild: -1,
    //   path: 'app2',
    //   absolutePath: ['app2'],
    //   offset: -1,
    //   content: '# 1',
    //   type: 'folder',
    //   children: [{
    //     name: 'src',
    //     curChild: -1,
    //     path: 'app2\\src',
    //     absolutePath: ['app2', 'src'],
    //     offset: -1,
    //     content: '- 2',
    //     type: 'folder',
    //     children: [{
    //       name: 'components',
    //       curChild: -1,
    //       path: 'app2\\src\\components',
    //       absolutePath: ['app2', 'src', 'components'],
    //       offset: -1,
    //       content: '3',
    //       type: 'folder',
    //       children: [{
    //         name: 'FileNav.vue',
    //         curChild: -1,
    //         path: 'app2\\src\\components\\FileNav.vue',
    //         absolutePath: ['app2', 'src', 'components', 'FileNav.vue'],
    //         offset: -1,
    //         content: '4',
    //         children: [],
    //         type: 'file'
    //       }, {
    //         name: 'FileNavItem.vue',
    //         curChild: -1,
    //         path: 'app2\\src\\components\\FileNavItem.vue',
    //         absolutePath: ['app2', 'src', 'components', 'FileNavItem.vue'],
    //         offset: -1,
    //         content: '5',
    //         children: [],
    //         type: 'file'
    //       }]
    //     }, {
    //       name: 'assets',
    //       curChild: -1,
    //       path: 'app2\\src\\assets',
    //       absolutePath: ['app2', 'src', 'assets'],
    //       offset: -1,
    //       content: '6',
    //       type: 'folder',
    //       children: [{
    //         name: 'logo.png',
    //         curChild: -1,
    //         path: 'app2\\src\\assets\\logo.png',
    //         absolutePath: ['app2', 'src', 'assets', 'logo.png'],
    //         offset: -1,
    //         content: '7',
    //         children: [],
    //         type: 'file'
    //       }, {
    //         name: 'tailwind.css',
    //         curChild: -1,
    //         path: 'app2\\src\\assets\\tailwind.css',
    //         absolutePath: ['app2', 'src', 'assets', 'tailwind.css'],
    //         offset: -1,
    //         content: '8',
    //         children: [],
    //         type: 'file'
    //       }, {
    //         name: 'FileNav.vue',
    //         curChild: -1,
    //         path: 'app2\\src\\assets\\FileNav.vue',
    //         absolutePath: ['app2', 'src', 'assets', 'FileNav.vue'],
    //         offset: -1,
    //         content: '9',
    //         children: [],
    //         type: 'file'
    //       }]
    //     }, {
    //       name: 'FileNav.vue',
    //       curChild: -1,
    //       path: 'app2\\src\\FileNav.vue',
    //       absolutePath: ['app2', 'src', 'FileNav.vue'],
    //       offset: -1,
    //       content: '```vue\n' +
    //           'setup() {\n' +
    //           '\tlet name = \'xxx\',\n' +
    //           '\tlet age = 18\n' +
    //           '\t\n' +
    //           '\n' +
    //           '\treturn {\n' +
    //           '\t\tname,\n' +
    //           '\t\tage,\n' +
    //           '\t\tsayHello\n' +
    //           '\t}\t\n' +
    //           '}\n' +
    //           '```',
    //       children: [],
    //       type: 'file'
    //     }]
    //   }]
    // }])

    const data = ref([])
    const source = ref({}) // 源对象
    const windowHeight = ref(window.innerHeight + 'px')
    const showDialog = ref(false)
    const dialogName = ref('')
    const fileName = ref('')

    onMounted(() => {
      window.addEventListener('resize', () => {
        windowHeight.value = window.innerHeight + 'px'
      })
    })

    bus.on('getSource', (obj) => {
      source.value = obj
    })

    function removeFrom (obj, arr) {
      let index = -1
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].path === obj.path) {
          index = i
          break
        }
      }
      if (index !== -1) {
        arr.splice(index, 1)
      }
    }

    bus.on('toDst', (obj) => {
      if (obj.children && obj.children.length) {
        const father = findFather(source.value, data.value[0]).res
        if (father.path !== obj.path) {
          removeFrom(source.value, father.children)
          // 拖拽会改变文件的路径，删除一个文件，改变source的path
          // 后端返回新的文件对象
          obj.children.push(source.value)
        }
      }
    })

    // 返回父对象
    function findFather (file, father) {
      for (let i = 0; i < father.children.length; i++) {
        if (file.path === father.children[i].path) {
          return {
            has: true,
            res: father
          }
        }
        if (father.children[i].type === 'folder') {
          const obj = findFather(file, father.children[i])
          if (obj.has) {
            return obj
          }
        }
      }
      return {
        has: false,
        res: file
      }
    }

    bus.on('openDir', (obj) => {
      data.value = [obj]
    })

    bus.on('showDialog', (type) => {
      showDialog.value = true
      dialogName.value = (type === 'file') ? '新建文件' : '新建文件夹'
    })

    function handleNew () {
      if (fileName.value === '') {
        alert('必须输入文件名或文件夹名')
        showDialog.value = false
      } else {
        bus.emit('handleNewFromApp', {
          name: fileName.value,
          type: (dialogName.value === '新建文件') ? 'file' : 'folder'
        })
        fileName.value = ''
        showDialog.value = false
      }
    }

    return {
      data,
      windowHeight,
      showDialog,
      dialogName,
      fileName,
      handleNew
    }
  }
}
</script>

<style>
#app {
  position: relative;
  opacity: 1;
  background: #FFFFFF;
  overflow-x: hidden;
  overflow-y: hidden;
}

.myTextArea {
  position: fixed;
  top: 0;
  right: 0;
  margin-left: 200px;
  margin-top: 65px;
  width: calc(100% - 200px);
  height: 100%;
  opacity: 1;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
}
</style>
