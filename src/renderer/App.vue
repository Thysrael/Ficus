<template>
  <div id="app" :style="{ height: windowHeight }">
    <MyHeader :data="data" style="width: 100%"></MyHeader>
    <div style="display: flex; height: 100%; width: 100%; position: relative">
      <SideBar :data="data" style="height: 100%"></SideBar>
      <TextArea class="myTextArea pl-24 pr-36" ></TextArea>
    </div>
    <div class="dialog text-white px-6 py-4 border-0 rounded bg-pink-500 z-50" v-if="myAlert">
      <span class="text-xl inline-block mr-5 align-middle">
        <div class="mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="20" height="20" viewBox="0 0 20 20"><defs><clipPath id="master_svg0_152_478"><rect x="0" y="0" width="20" height="20" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_152_478)"><g><path d="M8.811093015441894,16.63613587646484Q8.951363015441895,16.916635876464845,10.000003015441894,16.916635876464845Q11.048633015441894,16.916635876464845,11.188903015441895,16.63613587646484Q11.232953015441895,16.548035876464844,11.293333015441895,16.470235876464844Q11.353723015441895,16.392435876464845,11.428133015441894,16.327835876464846Q11.502533015441895,16.263335876464843,11.588103015441895,16.214535876464844Q11.673663015441894,16.165835876464843,11.767103015441895,16.13463587646484Q11.860543015441895,16.103535876464846,11.958263015441895,16.091235876464843Q12.055983015441894,16.078835876464844,12.154233015441894,16.08583587646484Q12.252433015441895,16.092835876464843,12.347433015441894,16.118835876464843Q12.442433015441894,16.144835876464846,12.530533015441895,16.188935876464846Q12.618633015441894,16.232935876464843,12.696433015441894,16.293335876464845Q12.774233015441894,16.353735876464846,12.838833015441894,16.428135876464843Q12.903333015441895,16.502535876464844,12.952133015441895,16.588135876464843Q13.000833015441895,16.673635876464843,13.032033015441895,16.76713587646484Q13.063133015441894,16.860535876464844,13.075433015441895,16.958235876464844Q13.087833015441895,17.055935876464844,13.080833015441895,17.154235876464845Q13.073833015441895,17.252435876464844,13.047833015441894,17.347435876464843Q13.021833015441894,17.44243587646484,12.977733015441894,17.530535876464846Q12.284733015441894,18.916635876464845,10.000003015441894,18.916635876464845Q7.7153030154418945,18.916635876464845,7.022243015441894,17.530535876464846Q6.978193015441895,17.44243587646484,6.952173015441894,17.347435876464843Q6.926163015441895,17.252435876464844,6.919183015441894,17.154235876464845Q6.912203015441895,17.055935876464844,6.924513015441894,16.958235876464844Q6.936833015441895,16.860535876464844,6.967983015441894,16.76713587646484Q6.9991330154418945,16.673635876464843,7.047903015441895,16.588135876464843Q7.0966830154418945,16.502535876464844,7.161213015441895,16.428135876464843Q7.2257430154418945,16.353735876464846,7.303553015441895,16.293335876464845Q7.381363015441894,16.232935876464843,7.4694530154418946,16.188935876464846Q7.557543015441895,16.144835876464846,7.6525430154418945,16.118835876464843Q7.747533015441895,16.092835876464843,7.845773015441894,16.08583587646484Q7.9440230154418945,16.078835876464844,8.041733015441896,16.091235876464843Q8.139453015441894,16.103535876464846,8.232893015441896,16.13463587646484Q8.326333015441895,16.165835876464843,8.411893015441894,16.214535876464844Q8.497463015441895,16.263335876464843,8.571863015441895,16.327835876464846Q8.646273015441896,16.392435876464845,8.706663015441894,16.470235876464844Q8.767043015441894,16.548035876464844,8.811093015441894,16.63613587646484ZM14.750033015441895,12.583335876464844L14.750033015441895,9.333335876464844Q14.750033015441895,6.056745876464843,13.529033015441895,4.517225876464844Q12.391733015441895,3.0833358764648438,10.000003015441894,3.0833358764648438Q7.608223015441895,3.0833358764648438,6.470993015441895,4.517225876464844Q5.250003015441894,6.056745876464843,5.250003015441894,9.333335876464844L5.250003015441894,12.583335876464844Q5.250003015441894,12.792635876464844,5.166043015441895,12.984435876464843Q5.082093015441894,13.176135876464844,4.928283015441894,13.318135876464844L2.7616130154418945,15.318135876464844L2.0833330154418945,14.583335876464844L2.0833330154418945,13.583335876464844L17.916633015441896,13.583335876464844L17.916633015441896,14.583335876464844L17.238433015441892,15.318135876464844L15.071733015441895,13.318135876464844Q14.917933015441895,13.176135876464844,14.833933015441895,12.984435876464843Q14.750033015441895,12.792635876464844,14.750033015441895,12.583335876464844ZM16.750033015441893,12.583335876464844L15.750033015441895,12.583335876464844L16.428233015441897,11.848535876464844L18.594933015441896,13.848535876464844Q18.748733015441896,13.990535876464843,18.832733015441896,14.182235876464844Q18.916633015441896,14.374035876464843,18.916633015441896,14.583335876464844Q18.916633015441896,14.681835876464843,18.897433015441894,14.778435876464844Q18.878233015441893,14.875035876464844,18.840533015441896,14.966035876464844Q18.802833015441895,15.057035876464843,18.748133015441894,15.138935876464844Q18.693433015441894,15.220835876464843,18.623733015441896,15.290435876464844Q18.554133015441895,15.360035876464844,18.472233015441894,15.414835876464844Q18.390333015441893,15.469535876464844,18.299333015441896,15.507235876464843Q18.208333015441895,15.544935876464844,18.111733015441896,15.564135876464844Q18.015133015441897,15.583335876464844,17.916633015441896,15.583335876464844L2.0833330154418945,15.583335876464844Q1.8740090154418945,15.583335876464844,1.6822600154418945,15.499335876464844Q1.4905100154418944,15.415435876464844,1.3485300154418947,15.261635876464844Q1.2817250154418947,15.189235876464844,1.2303230154418945,15.105235876464844Q1.1789210154418945,15.021235876464845,1.1448970154418945,14.928835876464843Q1.1108730154418947,14.836335876464844,1.0955340154418947,14.739035876464843Q1.0801930154418946,14.641735876464844,1.0841320154418945,14.543335876464845Q1.0880690154418944,14.444935876464843,1.1111290154418945,14.349235876464844Q1.1341890154418945,14.253435876464843,1.1754870154418944,14.164035876464844Q1.2167850154418947,14.074635876464844,1.2747330154418945,13.994935876464844Q1.3326810154418944,13.915335876464844,1.4050530154418945,13.848535876464844L3.5717230154418944,11.848535876464844L4.250003015441894,12.583335876464844L3.2500030154418944,12.583335876464844L3.2500030154418944,9.333335876464844Q3.2500030154418944,5.359925876464844,4.904003015441894,3.274445876464844Q6.641773015441895,1.0833358764648438,10.000003015441894,1.0833358764648438Q13.358233015441895,1.0833358764648438,15.096033015441895,3.274445876464844Q16.750033015441893,5.359915876464844,16.750033015441893,9.333335876464844L16.750033015441893,12.583335876464844Z" fill="#FFFFFF" fill-opacity="1"/></g></g>
          </svg>
        </div>
      </span>
      <span class="inline-block align-middle mr-8">
        <b class="capitalize mr-3">警告!</b>
        {{ message }}
      </span>
      <button class="absolute bg-transparent text-2xl opacity-80 font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none hover:opacity-100"
              v-on:click="myAlert = false">
        <span>×</span>
      </button>
    </div>
    <div id="modal" class="modal" v-show="showDialog">
      <div class="modal-content shadow-2xl" id="modalContent">
        <div class="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t items-center content-center">
          <h3 class="text-h4 font-semibold">
            {{ dialogName }}
          </h3>
          <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  @click="showDialog = false">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
          </button>
        </div>

        <div class="relative p-3 flex-auto">
          <input class="my-4 text-blueGray-500 text-lg leading-relaxed rounded-md w-full"
                 v-model="fileName" type="text" placeholder="名称" ref="inputBox" @keyup.enter="handle">
        </div>

        <div class="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
          <button class="text-red-500 hover:text-blueGray-400 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button" @click="showDialog = false">
            Close
          </button>
        </div>
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
    let pathSeq = ''
    const data = ref([])
    const source = ref({}) // 源对象
    const dst = ref({}) // 目标对象
    const windowHeight = ref(window.innerHeight + 'px')
    const windowWidth = ref(window.innerWidth + 'px')
    const showDialog = ref(false)
    const dialogName = ref('')
    const fileName = ref('')
    const father = ref({}) // 父对象
    let mode = 0 // 0：新建 / 1：重命名
    // eslint-disable-next-line no-unused-vars
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx
    const myAlert = ref(false)
    const message = ref('')

    onMounted(async () => {
      window.electronAPI.updateTree((sender, newChildren) => {
        data.value[0] = {
          name: data.value[0].name,
          path: data.value[0],
          children: newChildren,
          curChild: -1,
          absolutePath: data.value[0].absolutePath,
          offset: -1,
          type: 'folder'
        }
        console.log('APP：粘贴之后刷新了文件夹')
        bus.emit('updateOpenFiles', data.value[0])
      })
      pathSeq = await window.electronAPI.getPathSep()
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

    /*
    与删除相关的函数
     */
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
        console.log('bug: 尝试从undefined中删除')
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

    // 打开文件夹
    bus.on('openDir', (obj) => {
      data.value = [obj]
      console.log('APP：打开了文件夹')
      bus.emit('updateOpenFiles', obj)
    })

    // 关闭文件夹
    bus.on('closeDir', () => {
      data.value.length = 0
    })

    // 新建文件/文件夹
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
          path: father.value.path + pathSeq + fileName.value,
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

    // 重命名文件
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
        obj.path = father.path + pathSeq + fileName.value
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
      obj.path = father.path + pathSeq + obj.name
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

    // 名称分发
    function handle () {
      if (mode === 0) {
        handleNew()
      } else if (mode === 1) {
        renameFile()
      }
    }

    // 复制相对路径
    bus.on('CopyPartPath', (obj) => {
      let i = 0
      for (; i < obj.absolutePath.length; i++) {
        if (obj.absolutePath[i] === data.value[0].name) {
          break
        }
      }
      let s = data.value[0].name
      i++
      for (; i < obj.absolutePath.length; i++) {
        s = s + pathSeq + obj.absolutePath[i]
      }
      navigator.clipboard.writeText(s)
    })

    bus.on('showMyAlert', (obj) => {
      console.log('警告空内容：', obj.message)
      message.value = obj.message
      myAlert.value = true
    })

    /*
    与拖拽相关的函数
     */
    bus.on('getSource', (obj) => {
      source.value = obj
    })

    bus.on('getDst', (obj) => {
      dst.value = obj
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
      curObj.path = father.path + pathSeq + curObj.name
      if (curObj.type === 'file') {
        window.electronAPI.saveFile(curObj.path, curObj.content)
      } else if (curObj.type === 'folder') {
        for (let i = 0; i < curObj.children.length; i++) {
          buildNewFileFromOld(curObj, curObj.children[i])
        }
      }
    }

    return {
      data,
      windowHeight,
      windowWidth,
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
  margin-left: 230px;
  padding-top: 65px;
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
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
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
