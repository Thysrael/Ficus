<template>
  <div class="pl-2">
    <div style="font-size: 12px">
      当前文档共引用 {{ cites.length }} 个文档
    </div>
    <ul style="margin-top: 15px">
      <li v-for="(item, index) in cites"
          :key="index">
        <div style="display: flex" class="items-center content-center relBarItem p-1 my-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
                 width="20" height="20" viewBox="0 0 15 15">
              <g clip-path="url(#master_svg0_93_2618)">
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <g>
                            <path
                                d="M13,12.500020848083496Q13,13.224920848083496,12.48744,13.737420848083497Q11.97487,14.250020848083496,11.25,14.250020848083496L3.75,14.250020848083496Q3.025126,14.250020848083496,2.5125632,13.737420848083497Q2,13.224920848083496,2,12.500020848083496L2,2.500000848083496Q2,1.7751248480834962,2.5125632,1.262561748083496Q3.025126,0.749998848083496,3.75,0.749998848083496L8.1875,0.749998848083496L8.1875,1.2499986880834961L8.16988,0.7503098480834961Q8.94202,0.7230758480834961,9.48238,1.275309348083496L12.5514,4.532100848083497Q12.5569,4.5379008480834955,12.5621,4.543870848083496Q13.0261,5.068800848083496,12.9996,5.7688708480834965L12.5,5.750000848083496L13,5.750000848083496L13,12.500020848083496ZM12,12.500020848083496L12,5.750000848083496Q12,5.740560848083496,12.00036,5.7311208480834965Q12.01169,5.431090848083496,11.81286,5.206120848083496L12.1875,4.875000848083496L11.82361,5.217900848083496L8.76762,1.9746878480834962Q8.53604,1.7380158480834962,8.20512,1.749687848083496Q8.19631,1.749998848083496,8.1875,1.749998848083496L3.75,1.749998848083496Q3.43934,1.749998848083496,3.21967,1.969668848083496Q3,2.189338848083496,3,2.500000848083496L3,12.500020848083496Q3,12.810620848083497,3.21967,13.030320848083496Q3.43934,13.250020848083496,3.75,13.250020848083496L11.25,13.250020848083496Q11.56066,13.250020848083496,11.78033,13.030320848083496Q12,12.810620848083497,12,12.500020848083496Z"
                                fill="#000000" fill-opacity="1"/>
                          </g>
                          <g>
                            <line x1="4.9375" y1="11.062499046325684" x2="10.0625" y2="11.062499046325684"
                                  fill-opacity="0" stroke-opacity="1" stroke="#000000" fill="none" stroke-width="1"
                                  stroke-linecap="ROUND" stroke-linejoin="round"/>
                          </g>
                          <g>
                            <line x1="4.9375" y1="8.562499046325684" x2="10.0625" y2="8.562499046325684"
                                  fill-opacity="0" stroke-opacity="1" stroke="#000000" fill="none" stroke-width="1"
                                  stroke-linecap="ROUND" stroke-linejoin="round"/>
                          </g>
                          <g>
                            <line x1="5" y1="6.062499046325684" x2="8.125" y2="6.062499046325684" fill-opacity="0"
                                  stroke-opacity="1" stroke="#000000" fill="none" stroke-width="1"
                                  stroke-linecap="ROUND" stroke-linejoin="round"/>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="pl-2 overflow-auto" id="btnRef"
               @mouseenter="togglePopover()"
               @mouseleave="togglePopover()">
            <div style="font-size: 12px">
              {{ item.name }}
            </div>
            <div style="font-size: 10px; color: #666A70">
              {{ item.path }}
            </div>
          </div>

          <div id="popoverRef" v-bind:class="{'hidden': !popoverShow, 'block': popoverShow}"
               class="items-center content-center transition-all ease-linear bg-white border-0 shadow-md mr-3 block z-50 font-normal text-sm text-left no-underline break-words rounded-lg opacity-90"
               style="position: relative; font-family: 'Noto Sans SC'; left: 30px; font-size: 12px">
            <div class="px-3 py-2">
              {{item.name}}
              <hr style="border: none;border-top: 2px solid #ccc;height: 1px;">
              {{item.path}}
            </div>
          </div>

        </div>
      </li>
    </ul>
    <hr style="border: none;border-top: 2px solid #ccc;height: 1px;margin: 20px 0;">
    <div style="font-size: 12px">
      当前文档共被 {{ quoted.length }} 个文档引用
    </div>
    <ul style="margin-top: 15px">
      <li v-for="(item, index) in quoted"
          :key="index">
        <div style="display: flex" class="items-center content-center relBarItem">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
                 width="20" height="20" viewBox="0 0 15 15">
              <g clip-path="url(#master_svg0_93_2618)">
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <g>
                            <path
                                d="M13,12.500020848083496Q13,13.224920848083496,12.48744,13.737420848083497Q11.97487,14.250020848083496,11.25,14.250020848083496L3.75,14.250020848083496Q3.025126,14.250020848083496,2.5125632,13.737420848083497Q2,13.224920848083496,2,12.500020848083496L2,2.500000848083496Q2,1.7751248480834962,2.5125632,1.262561748083496Q3.025126,0.749998848083496,3.75,0.749998848083496L8.1875,0.749998848083496L8.1875,1.2499986880834961L8.16988,0.7503098480834961Q8.94202,0.7230758480834961,9.48238,1.275309348083496L12.5514,4.532100848083497Q12.5569,4.5379008480834955,12.5621,4.543870848083496Q13.0261,5.068800848083496,12.9996,5.7688708480834965L12.5,5.750000848083496L13,5.750000848083496L13,12.500020848083496ZM12,12.500020848083496L12,5.750000848083496Q12,5.740560848083496,12.00036,5.7311208480834965Q12.01169,5.431090848083496,11.81286,5.206120848083496L12.1875,4.875000848083496L11.82361,5.217900848083496L8.76762,1.9746878480834962Q8.53604,1.7380158480834962,8.20512,1.749687848083496Q8.19631,1.749998848083496,8.1875,1.749998848083496L3.75,1.749998848083496Q3.43934,1.749998848083496,3.21967,1.969668848083496Q3,2.189338848083496,3,2.500000848083496L3,12.500020848083496Q3,12.810620848083497,3.21967,13.030320848083496Q3.43934,13.250020848083496,3.75,13.250020848083496L11.25,13.250020848083496Q11.56066,13.250020848083496,11.78033,13.030320848083496Q12,12.810620848083497,12,12.500020848083496Z"
                                fill="#000000" fill-opacity="1"/>
                          </g>
                          <g>
                            <line x1="4.9375" y1="11.062499046325684" x2="10.0625" y2="11.062499046325684"
                                  fill-opacity="0" stroke-opacity="1" stroke="#000000" fill="none" stroke-width="1"
                                  stroke-linecap="ROUND" stroke-linejoin="round"/>
                          </g>
                          <g>
                            <line x1="4.9375" y1="8.562499046325684" x2="10.0625" y2="8.562499046325684"
                                  fill-opacity="0" stroke-opacity="1" stroke="#000000" fill="none" stroke-width="1"
                                  stroke-linecap="ROUND" stroke-linejoin="round"/>
                          </g>
                          <g>
                            <line x1="5" y1="6.062499046325684" x2="8.125" y2="6.062499046325684" fill-opacity="0"
                                  stroke-opacity="1" stroke="#000000" fill="none" stroke-width="1"
                                  stroke-linecap="ROUND" stroke-linejoin="round"/>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="pl-2 overflow-auto" id="btnRef1"
               @mouseenter="togglePopover1()"
               @mouseleave="togglePopover1()">
            <div style="font-size: 12px;">
              {{ item.name }}
            </div>
            <div style="font-size: 10px; color: #666A70">
              {{ item.path }}
            </div>
          </div>

          <div id="popoverRef1" v-bind:class="{'hidden': !popoverShow1, 'block': popoverShow1}"
               class="items-center content-center transition-all ease-linear bg-white border-0 shadow-md mr-3 block z-50 font-normal text-sm text-left no-underline break-words rounded-lg opacity-90"
               style="position: relative; font-family: 'Noto Sans SC'; left: 30px; font-size: 12px">
            <div class="px-3 py-2">
              {{item.name}}
              <hr style="border: none;border-top: 2px solid #ccc;height: 1px;">
              {{item.path}}
            </div>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import bus from 'vue3-eventbus'
import { createPopper } from '@popperjs/core'

export default {
  name: 'RelationBar',
  setup () {
    const cites = ref([{
      name: 'FileNav.vue',
      curChild: -1,
      path: 'app2\\src\\components\\FileNav.vue',
      absolutePath: ['app2', 'src', 'components', 'FileNav.vue'],
      offset: -1,
      content: '4',
      children: [],
      type: 'file'
    }])
    const quoted = ref([{
      name: 'FileNavItem.vue',
      curChild: -1,
      path: 'app2\\src\\components\\FileNav.vue',
      absolutePath: ['app2', 'src', 'components', 'FileNav.vue'],
      offset: -1,
      content: '4',
      children: [],
      type: 'file'
    }])
    const popoverShow = ref(false) // 显示完整文件名的弹窗
    const popoverShow1 = ref(false) // 显示完整文件名的弹窗

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

    function togglePopover1 () {
      const btnRef = document.querySelector('#btnRef1')
      const popoverRef = document.querySelector('#popoverRef1')
      if (this.popoverShow1) {
        this.popoverShow1 = false
      } else {
        this.popoverShow1 = true
        createPopper(btnRef, popoverRef, {
          placement: 'right',
          element: 'arrow'
        })
      }
    }

    bus.on('editCites', (obj) => {
      quoted.value = obj.cited
      cites.value = obj.citing
    })

    return {
      cites,
      quoted,
      popoverShow,
      togglePopover,
      popoverShow1,
      togglePopover1
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  /* 隐藏滚动条 */
  display: none;
}

.relBarItem {
  font-family: "Noto Sans SC";
}

.relBarItem:hover {
  background-color: #e3e3e3;
  border-radius: 6px;
  -webkit-transition: .2s;
}
</style>
