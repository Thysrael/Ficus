<template>
  <div id="app" :style="{ height: windowHeight }">
    <MyHeader :data="data"></MyHeader>
    <div style="display:flex;height: 100%;width:100%;position: relative">
      <SideBar :data="data"></SideBar>
      <TextArea class="myTextArea"></TextArea>
    </div>
    <div class="dialog" v-if="myAlert">
      <div style="display: flex; position: relative; z-index: 1000">
        {{ message }}
        <button style="margin-left: 20px" @click="myAlert = false">
          确认
        </button>
      </div>
    </div>
    <div id="modal" class="modal" v-show="showDialog">
      <div class="modal-content" id="modalContent">
        <span class="close" @click="showDialog = false">&times;</span>
        <h2>{{ dialogName }}</h2>
        <input v-model="fileName" type="text" placeholder="名称" ref="inputBox" @keyup.enter="handle">
      </div>
    </div>
  </div>
</template>

<script>

import { getCurrentInstance, onMounted, ref } from 'vue'
import MyHeader from '@/renderer/components/header/MyHeader'
import SideBar from '@/renderer/components/sideBar/SideBar'
import TextArea from '@/renderer/components/textArea/TextArea'
import bus from 'vue3-eventbus'

export default {
  name: 'App',
  components: { SideBar, MyHeader, TextArea },
  setup () {
    const data = ref([])
    const source = ref({}) // 源对象
    const dst = ref({}) // 目标对象
    const windowHeight = ref(window.innerHeight + 'px')
    const showDialog = ref(false)
    const dialogName = ref('')
    const fileName = ref('')
    const father = ref({}) // 父对象
    let mode = 0 // 0：新建 / 1：重命名
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx
    const myAlert = ref(false)
    const message = ref('')

    console.log(proxy, _this)

    onMounted(() => {
      window.addEventListener('resize', () => {
        windowHeight.value = window.innerHeight + 'px'
      })
      // 获取对话框、关闭按钮、输入框、取消按钮和确定按钮
      const modal = document.getElementById('modal')
      const modalContent = document.getElementById('modalContent')

      // 当用户单击模态框外部时，关闭模态框
      window.addEventListener('click', function (event) {
        if (event.target === modal) {
          closeModal()
        }
      })

      // 当用户按下鼠标左键时，记录鼠标位置和对话框位置，并绑定鼠标移动和释放事件
      let x0, y0, x1, y1
      modal.addEventListener('mousedown', function (event) {
        x0 = event.clientX
        y0 = event.clientY
        x1 = modal.offsetLeft
        y1 = modal.offsetTop
        document.addEventListener('mousemove', moveModal)
        document.addEventListener('mouseup', stopMoveModal)
      })

      // 当鼠标移动时，更新对话框位置
      function moveModal (event) {
        const x = event.clientX - x0 + x1
        const y = event.clientY - y0 + y1
        modal.style.left = x + 'px'
        modal.style.top = y + 'px'
      }

      // 当鼠标释放时，停止更新对话框位置
      function stopMoveModal (event) {
        document.removeEventListener('mousemove', moveModal)
        document.removeEventListener('mouseup', stopMoveModal)
      }

      // 显示模态框
      function openModal () {
        showDialog.value = true
        modal.style.top = '0'
        modal.style.left = '0'
        modalContent.style.top = '50%'
        modalContent.style.left = '50%'
        modalContent.style.transform = 'translate(-50%, -50%)'
        if (_this.$refs.inputBox !== null) {
          _this.$refs.inputBox.focus()
        }
      }

      // 关闭模态框
      function closeModal () {
        showDialog.value = false
      }

      bus.on('showDialogForNewFile', (obj) => {
        dialogName.value = (obj.type === 'file') ? '新建文件' : '新建文件夹'
        father.value = obj.father
        mode = 0
        openModal()
      })

      bus.on('showDialogForRenameFile', (obj) => {
        dialogName.value = '重命名'
        father.value = obj
        mode = 1
        openModal()
      })
    })

    bus.on('getSource', (obj) => {
      console.log('getSource ', obj)
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
      const info = '确定将' + source.value.name + '移动到' + dst.value.name + '？'
      alert(info)
      if (dst.value.path === source.value.path) {
        return
      }
      if (dst.value.type === 'folder') {
        const father = findFather(source.value, data.value[0]).res
        // 会有一套完整的安全管理流程，例如控制改变之后同目录下的文件不应该重名
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

    bus.on('closeDir', () => {
      data.value.length = 0
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
      // curObj.path = path.join(father.path, curObj.name)
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
        message.value = '必须输入文件名或文件夹名'
        myAlert.value = true
        fileName.value = ''
      } else {
        for (let i = 0; i < father.value.children.length; i++) {
          if (father.value.children[i].name === fileName.value) {
            message.value = '输入的名称已存在'
            myAlert.value = true
            fileName.value = ''
            return
          }
        }
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
          // path: path.join(father.value.path, fileName.value),
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

    function renameFile () {
      const obj = father.value
      if (fileName.value === '') {
        message.value = '文件名或文件夹名不能为空'
        myAlert.value = true
        fileName.value = ''
      } else {
        const father = findFather(obj, data.value[0]).res
        for (let i = 0; i < father.children.length; i++) {
          if (father.children[i].name === fileName.value) {
            message.value = '输入的名称已存在'
            myAlert.value = true
            fileName.value = ''
            return
          }
        }
        const oldPath = obj.path
        obj.name = fileName.value
        obj.absolutePath.pop()
        obj.absolutePath.push(fileName.value)
        // obj.path = path.join(father.path, fileName.value)
        obj.path = father.path + '\\' + fileName.value
        const newPath = obj.path
        window.electronAPI.renameFileOrFolder(newPath, oldPath)
        if (obj.type === 'folder') {
          // 需要递归地修改孩子节点的path和absolutePath
          console.log('修改：', obj.children)
          for (let i = 0; i < obj.children.length; i++) {
            changePathAfterFatherRename(obj.children[i], obj)
          }
        }
        bus.emit('updateTabName')
        fileName.value = ''
        showDialog.value = false
      }
    }

    function changePathAfterFatherRename (obj, father) {
      // obj.path = path.join(father.path, obj.name)
      obj.path = father.path + '\\' + obj.name
      const last = obj.absolutePath.pop()
      obj.absolutePath.pop()
      obj.absolutePath.push(father.name)
      obj.absolutePath.push(last)
      if (obj.type === 'folder') {
        for (let i = 0; i < obj.children.length; i++) {
          changePathAfterFatherRename(obj.children[i], obj)
        }
      }
    }

    function handle () {
      if (mode === 0) {
        handleNew()
      } else if (mode === 1) {
        renameFile()
      }
    }

    return {
      data,
      windowHeight,
      showDialog,
      dialogName,
      fileName,
      myAlert,
      message,
      handle
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
  z-index: 20;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2563eb;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  /*background-color: rgba(0,0,0,0.4);*/
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
