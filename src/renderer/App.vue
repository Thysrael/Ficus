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
    const dst = ref({}) // 目标对象
    const windowHeight = ref(window.innerHeight + 'px')
    const showDialog = ref(false)
    const dialogName = ref('')
    const fileName = ref('')
    const father = ref({}) // 父对象

    onMounted(() => {
      window.addEventListener('resize', () => {
        windowHeight.value = window.innerHeight + 'px'
      })
    })

    bus.on('getSource', (obj) => {
      source.value = obj
    })

    function closeTab (obj) {
      if (obj.type === 'file') {
        bus.emit('deleteTab', obj)
      } else if (obj.type === 'folder') {
        for (let i = 0; i < obj.children.length; i++) {
          closeTab(obj.children[i])
        }
      }
    }

    function removeFrom (obj, arr) {
      if (arr === undefined) {
        console.log('big bug!')
      }
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
      // 删除一个对象也需要在工作区关闭其本身和其孩子节点
      closeTab(obj)
      // 从后端删除
      if (obj.type === 'file') {
        window.electronAPI.deleteFile(obj.path)
      } else if (obj.type === 'folder') {
        window.electronAPI.deleteFolder(obj.path)
      }
    }

    bus.on('removeObjFromData', (obj) => {
      const father = findFather(obj, data.value[0]).res
      removeFrom(obj, father.children)
    })

    bus.on('getDst', (obj) => {
      dst.value = obj
      console.log('更新目的地：', dst.value)
    })

    bus.on('toDst', () => {
      console.log('dst: ', dst.value)
      if (dst.value.type === 'folder') {
        const father = findFather(source.value, data.value[0]).res
        if (father.path !== dst.value.path) {
          removeFrom(source.value, father.children)
          buildNewFileFromOld(dst.value, source.value)
          dst.value.children.push(source.value)
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

    bus.on('showDialog', (obj) => {
      showDialog.value = true
      dialogName.value = (obj.type === 'file') ? '新建文件' : '新建文件夹'
      father.value = obj.father
    })

    function buildNewFileFromOld (father, curObj) {
      if (curObj.type === 'file') {
        window.electronAPI.newFileFromSidebar(father.path, curObj.name)
      } else {
        window.electronAPI.newFolderFromSidebar(father.path, curObj.name)
      }
      const paths = []
      for (let i = 0; i < father.absolutePath.length; i++) {
        paths.push(father.absolutePath[i])
      }
      paths.push(curObj.name)
      curObj.absolutePath = paths
      curObj.path = father.path + '\\' + curObj.name
      if (curObj.type === 'file') {
        window.electronAPI.saveFile(curObj.path, curObj.content)
      } else if (curObj.type === 'folder') {
        for (let i = 0; i < curObj.children.length; i++) {
          buildNewFileFromOld(curObj, curObj.children[i])
        }
      }
    }

    function handleNew () {
      if (fileName.value === '') {
        alert('必须输入文件名或文件夹名')
        showDialog.value = false
      } else {
        if (dialogName.value === '新建文件') {
          window.electronAPI.newFileFromSidebar(father.value.path, fileName.value)
        } else {
          window.electronAPI.newFolderFromSidebar(father.value.path, fileName.value)
        }
        const paths = []
        for (let i = 0; i < father.value.absolutePath.length; i++) {
          paths.push(father.value.absolutePath[i])
        }
        paths.push(fileName.value)
        const fileType = (dialogName.value === '新建文件') ? 'file' : 'folder'
        const obj = {
          name: fileName.value,
          // bugFIX: 跨操作系统时？
          path: father.value.path + '\\' + fileName.value,
          children: [],
          curChild: -1,
          content: '',
          absolutePath: paths,
          offset: -1,
          type: fileType
        }
        father.value.children.push(obj)
        father.value.curChild = father.value.children.length - 1
        if (obj.type === 'file') {
          bus.emit('openNewTab', obj)
        }
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
