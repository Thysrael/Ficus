<template>
  <li
      @contextmenu.stop.prevent="handleRightClick($event)"
      v-contextmenu:contextmenu
      @dragenter.stop="dragenter($event)"
      @dragover.stop="dragover($event)"
      @dragstart.stop="dragstart()"
      @dragend.stop="dragend($event)"
      draggable="false"
      class="my-1 w-full items-center content-center"
  >
    <div
        style="display: flex"
        class="px-3 items-center content-center"
        :class="isSelected ? `selectedElement` : `nonSelectedElement`"
        @click="toggle(1)"
    >
      <div>
        <svg v-if="item.type === 'folder'" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" width="15px" height="15px">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M6.5,8.5l6,7l6-7H6.5z" fill="#474747" fill-opacity="1"></path> <rect class="st0" width="24" height="24"></rect> <rect class="st0" width="24" height="24"></rect>
          </g>
        </svg>
      </div>

      <div class="pl-2">
        <svg v-if="item.type === 'folder'" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="15" height="15"
             viewBox="0 0 10 10">
          <g style="mix-blend-mode:passthrough" clip-path="url(#master_svg0_10_103)">
            <g style="mix-blend-mode:passthrough">
              <path
                  d="M1.6666641235351562,1.6666650617675782C1.5561541235351561,1.6666650617675782,1.4501741235351562,1.710565061767578,1.3720351235351562,1.788703061767578C1.2938971235351562,1.866842061767578,1.2499971235351564,1.972822061767578,1.2499971235351564,2.083332061767578C1.2499971235351564,2.083332061767578,1.2499971235351564,7.916662061767578,1.2499971235351564,7.916662061767578C1.2499971235351564,8.027162061767578,1.2938971235351562,8.133162061767578,1.3720351235351562,8.211292061767578C1.4501741235351562,8.289412061767578,1.5561541235351561,8.333332061767578,1.6666641235351562,8.333332061767578C1.6666641235351562,8.333332061767578,8.333334123535156,8.333332061767578,8.333334123535156,8.333332061767578C8.443834123535156,8.333332061767578,8.549834123535156,8.289412061767578,8.627954123535156,8.211292061767578C8.706084123535156,8.133162061767578,8.749994123535156,8.027162061767578,8.749994123535156,7.916662061767578C8.749994123535156,7.916662061767578,8.749994123535156,3.333332061767578,8.749994123535156,3.333332061767578C8.749994123535156,3.222822061767578,8.706084123535156,3.1168420617675783,8.627954123535156,3.038702061767578C8.549834123535156,2.960562061767578,8.443834123535156,2.9166620617675783,8.333334123535156,2.9166620617675783C8.333334123535156,2.9166620617675783,4.583334123535156,2.9166620617675783,4.583334123535156,2.9166620617675783C4.4440141235351565,2.9166620617675783,4.313924123535156,2.8470420617675782,4.236644123535156,2.731122061767578C4.236644123535156,2.731122061767578,3.527004123535156,1.6666650617675782,3.527004123535156,1.6666650617675782C3.527004123535156,1.6666650617675782,1.6666641235351562,1.6666650617675782,1.6666641235351562,1.6666650617675782C1.6666641235351562,1.6666650617675782,1.6666641235351562,1.6666650617675782,1.6666641235351562,1.6666650617675782ZM0.7827811235351563,1.1994490617675782C1.0172021235351563,0.9650280617675782,1.3351431235351563,0.8333320617675781,1.6666641235351562,0.8333320617675781C1.6666641235351562,0.8333320617675781,3.7499941235351564,0.8333320617675781,3.7499941235351564,0.8333320617675781C3.889314123535156,0.8333320617675781,4.019404123535156,0.9029574617675782,4.096684123535156,1.0188740617675782C4.096684123535156,1.0188740617675782,4.806334123535156,2.083332061767578,4.806334123535156,2.083332061767578C4.806334123535156,2.083332061767578,8.333334123535156,2.083332061767578,8.333334123535156,2.083332061767578C8.664874123535157,2.083332061767578,8.982794123535156,2.215032061767578,9.217204123535156,2.449452061767578C9.451624123535156,2.683872061767578,9.583334123535156,3.0018120617675783,9.583334123535156,3.333332061767578C9.583334123535156,3.333332061767578,9.583334123535156,7.916662061767578,9.583334123535156,7.916662061767578C9.583334123535156,8.248212061767578,9.451624123535156,8.566122061767578,9.217204123535156,8.800542061767578C8.982794123535156,9.034962061767578,8.664874123535157,9.166662061767578,8.333334123535156,9.166662061767578C8.333334123535156,9.166662061767578,1.6666641235351562,9.166662061767578,1.6666641235351562,9.166662061767578C1.3351431235351563,9.166662061767578,1.0172021235351563,9.034962061767578,0.7827811235351563,8.800542061767578C0.5483601235351563,8.566122061767578,0.41666412353515625,8.248212061767578,0.41666412353515625,7.916662061767578C0.41666412353515625,7.916662061767578,0.41666412353515625,2.083332061767578,0.41666412353515625,2.083332061767578C0.41666412353515625,1.7518110617675782,0.5483601235351563,1.4338700617675781,0.7827811235351563,1.1994490617675782C0.7827811235351563,1.1994490617675782,0.7827811235351563,1.1994490617675782,0.7827811235351563,1.1994490617675782Z"
                  fill-rule="evenodd" fill="#474747" fill-opacity="1"/>
            </g>
          </g>
        </svg>
      </div>

      <div class="pl-2">
        <svg v-if="item.type === 'file' && item.name.endsWith('md')" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="20" height="20" viewBox="0 0 20 20">
          <g clip-path="url(#master_svg0_152_447)">
            <g>
              <g>
                <path d="M0,6.666665876464844C0,4.825715876464844,1.49238,3.3333358764648438,3.33333,3.3333358764648438L16.6667,3.3333358764648438C18.5076,3.3333358764648438,20,4.825715876464844,20,6.666665876464844L20,13.333335876464844C20,15.174235876464843,18.5076,16.666635876464845,16.6667,16.666635876464845L3.33333,16.666635876464845C1.49238,16.666635876464845,0,15.174235876464843,0,13.333335876464844L0,6.666665876464844ZM3.33333,5.000005876464844C2.41286,5.000005876464844,1.66667,5.746195876464844,1.66667,6.666665876464844L1.66667,13.333335876464844C1.66667,14.253835876464844,2.41286,15.000035876464844,3.33333,15.000035876464844L16.6667,15.000035876464844C17.5872,15.000035876464844,18.3333,14.253835876464844,18.3333,13.333335876464844L18.3333,6.666665876464844C18.3333,5.746195876464844,17.5872,5.000005876464844,16.6667,5.000005876464844L3.33333,5.000005876464844ZM4.73647,6.709435876464844C5.07676,6.596005876464844,5.45145,6.713055876464844,5.66667,7.000005876464844L7.5,9.444415876464845L9.33333,7.000005876464844C9.54858,6.713055876464844,9.92325,6.596005876464844,10.2635,6.709435876464844C10.6038,6.822865876464844,10.8333,7.141305876464844,10.8333,7.500005876464844L10.8333,12.500005876464844C10.8333,12.960255876464844,10.4602,13.333335876464844,10,13.333335876464844C9.53975,13.333335876464844,9.16667,12.960255876464844,9.16667,12.500005876464844L9.16667,10.000005876464844L8.16667,11.333335876464844C8.00929,11.543165876464844,7.7623,11.666665876464844,7.5,11.666665876464844C7.2377,11.666665876464844,6.99071,11.543165876464844,6.83333,11.333335876464844L5.83333,10.000005876464844L5.83333,12.500005876464844C5.83333,12.960255876464844,5.46023,13.333335876464844,5,13.333335876464844C4.53977,13.333335876464844,4.16667,12.960255876464844,4.16667,12.500005876464844L4.16667,7.500005876464844C4.16667,7.141305876464844,4.39619,6.822865876464844,4.73647,6.709435876464844ZM15,7.500005876464844C15,7.039765876464844,14.6269,6.666665876464844,14.1667,6.666665876464844C13.7064,6.666665876464844,13.3333,7.039765876464844,13.3333,7.500005876464844L13.3333,10.488165876464844L13.0892,10.244085876464844C12.7638,9.918665876464843,12.2362,9.918665876464843,11.9107,10.244085876464844C11.5853,10.569505876464845,11.5853,11.097165876464842,11.9107,11.422585876464844L13.5774,13.089255876464843C13.9028,13.414635876464844,14.4305,13.414635876464844,14.7559,13.089255876464843L16.4226,11.422585876464844C16.748,11.097165876464842,16.748,10.569505876464845,16.4226,10.244085876464844C16.0972,9.918665876464843,15.5695,9.918665876464843,15.2441,10.244085876464844L15,10.488165876464844L15,7.500005876464844Z"
                      fill-rule="evenodd" fill="#474747" fill-opacity="1"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div class="pl-2 fileTreeElementText"
           id="btnRef"
           @mouseenter="togglePopover()"
           @mouseleave="togglePopover()">
        {{ item.name }}
      </div>
    </div>
    <div id="popoverRef" v-bind:class="{'hidden': !popoverShow, 'block': popoverShow}"
         class="items-center content-center transition-all ease-linear bg-white border-0 shadow-md mr-3 block z-50 font-normal text-sm text-left no-underline break-words rounded-lg opacity-90"
         style="position: absolute; font-family: 'Noto Sans SC'; left: 30px">
      <div class="px-3 py-2">
        {{item.name}}
      </div>
    </div>
    <div>
      <v-contextmenu ref="contextmenu" >
        <div v-if="item.type === 'folder'">
          <v-contextmenu-item @click="handleNew('file')" class="hover:bg-gray-200 text-gray-700">新建文件</v-contextmenu-item>
          <v-contextmenu-item @click="handleNew('folder')" class="hover:bg-gray-200 text-gray-700">新建文件夹</v-contextmenu-item>
          <v-contextmenu-item class="hover:bg-gray-200 text-gray-700">粘贴</v-contextmenu-item>
        </div>
        <v-contextmenu-item class="hover:bg-gray-200 text-gray-700">剪切</v-contextmenu-item>
        <v-contextmenu-item class="hover:bg-gray-200 text-gray-700" @click="handleCopyFileOrFolder">复制</v-contextmenu-item>
        <v-contextmenu-item class="hover:bg-gray-200 text-gray-700" @click="handleDelete">删除</v-contextmenu-item>
        <v-contextmenu-item class="hover:bg-gray-200 text-gray-700" @click="handleRename">重命名</v-contextmenu-item>
        <v-contextmenu-item class="hover:bg-gray-200 text-gray-700" v-if="item.type ==='file'" @click="handleCopyAbsolutePath">复制路径</v-contextmenu-item>
        <v-contextmenu-item class="hover:bg-gray-200 text-gray-700" v-if="item.type==='file'" @click="handleCopyPartPath">复制相对路径</v-contextmenu-item>
      </v-contextmenu>
    </div>
    <ul v-if="hasChildren && expanded" class="pl-4">
      <FileNavItem
          :selected="selected"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          @click="getCurChild(item, index)"
      />
    </ul>
  </li>
</template>

<script>
import { computed, getCurrentInstance, ref, watch } from 'vue'
import bus from 'vue3-eventbus'
import { directive, Contextmenu, ContextmenuItem } from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'
import { useStore } from 'vuex'
import { createPopper } from '@popperjs/core'

export default {
  name: 'FileNavItem',
  directives: {
    contextmenu: directive
  },
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem
  },
  props: {
    selected: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const expanded = ref(false) // 控制是否显示孩子节点
    const curItem = ref(props.item)
    const selectedList = ref(props.selected)
    const store = useStore()
    const TabXY = ref({ x: -1, y: -1 })
    const { proxy, ctx } = getCurrentInstance()
    const _this = ctx
    const popoverShow = ref(false) // 显示完整文件名的弹窗

    console.log(proxy, _this)

    watch(() => store.state.xy, (newValue, oldValue) => {
      const temp = TabXY.value.x + '+' + TabXY.value.y
      if (store.getters.getXY !== temp) {
        if (_this.$refs.contextmenu !== null && _this.$refs.contextmenu !== undefined) {
          _this.$refs.contextmenu.hide()
        }
      }
    })

    // 创建一个计算属性，用于判断当前项是否有子节点
    const hasChildren = computed(() => {
      return props.item.children && props.item.children.length
    })

    // 考虑将isSelected加入data字段中提升计算效率
    const isSelected = computed(() => {
      // console.log('selected is ', selectedList.value)
      for (let i = 0; i < selectedList.value.length; i++) {
        if (props.item.path === selectedList.value[i].path) {
          return true
        }
      }
      return false
    })

    // 创建一个方法，用于切换节点的展开状态
    function toggle (index) {
      if (index === 1) {
        curItem.value.curChild = -1
        if (hasChildren.value) {
          expanded.value = !expanded.value
        }
        if (props.item.type === 'file') {
          bus.emit('openNewTab', props.item)
        }
        // 单击会新建一个列表
        bus.emit('newSelected', props.item)
      } else if (index === 2) {
        // isFocused.value = !isFocused.value
        // ctrl + 单击 不会新建列表，会往里添加，如果里面已经有则是删除
        let index = -1
        for (let i = 0; i < selectedList.value.length; i++) {
          if (props.item.path === selectedList.value[i].path) {
            index = i
            break
          }
        }
        if (index !== -1) {
          selectedList.value.splice(index, 1)
        } else {
          selectedList.value.push(props.item)
        }
      }
    }

    function getCurChild (item, index) {
      item.curChild = index
    }

    function dragstart () {
      // 源对象
      bus.emit('getSource', props.item)
    }

    function dragenter (e) {
      e.preventDefault()
      // 避免源对象触发自身的dragenter事件
    }

    function dragover (e) {
      e.preventDefault()
      bus.emit('getDst', props.item)
    }

    function dragend (e) {
      e.preventDefault()
      bus.emit('toDst')
    }

    function handleRightClick (e) {
      TabXY.value = { x: e.clientX, y: e.clientY }
      store.dispatch('updateXY', TabXY.value)
    }

    function handleNew (type) {
      bus.emit('showDialogForNewFile', { type, father: props.item })
    }

    function togglePopover () {
      const btnRef = document.querySelector('#btnRef')
      const popoverRef = document.querySelector('#popoverRef')
      if (this.popoverShow) {
        this.popoverShow = false
      } else {
        this.popoverShow = true
        createPopper(btnRef, popoverRef, {
          placement: 'right',
          element: 'arrow'
        })
      }
    }

    function handleDelete () {
      bus.emit('removeObjFromData', props.item)
    }

    function handleCopyAbsolutePath () {
      navigator.clipboard.writeText(props.item.path)
    }

    function handleCopyPartPath () {
      bus.emit('CopyPartPath', props.item)
    }

    function handleCopyFileOrFolder () {
      bus.emit('copyFileOrFolder', props.item)
    }

    function handleRename () {
      bus.emit('showDialogForRenameFile', props.item)
    }

    return {
      expanded,
      hasChildren,
      isSelected,
      curItem,
      dragstart,
      dragenter,
      dragover,
      dragend,
      toggle,
      getCurChild,
      handleRightClick,
      handleNew,
      handleDelete,
      popoverShow,
      togglePopover,
      handleRename,
      handleCopyAbsolutePath,
      handleCopyPartPath,
      handleCopyFileOrFolder
    }
  }
}
</script>

<style scoped>
.selectedElement {
  background-color: #e3e3e3;
  border-radius: 6px;
  font-weight: 600;
  -webkit-transition: background-color .2s;
  -webkit-transition:left .3s, background-color .2s;
}

.nonSelectedElement:hover {
  color: #a8a8a8;
  background-color: #efefef;
  border-radius: 6px;
  -webkit-transition: background-color .2s;
  -webkit-transition:left .3s, background-color .2s;
}

.nonSelectedElement:hover path {
  fill: #a8a8a8;
  fill-opacity: 1;
  -webkit-transition: fill .2s;
  -webkit-transition:left .3s, fill .2s;
}

.fileTreeElementText {
  max-width: 100px;
  white-space: nowrap;
  overflow-x: auto;
  text-overflow: ellipsis;
}

::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}

</style>
