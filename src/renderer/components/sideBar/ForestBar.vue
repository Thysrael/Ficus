<template>
  <div class="pl-2 content-center items-center w-full mt-2">
    <div style="display: flex">
      <input class="area-search-tab w-full px-2 placeholder-gray text-sm"
             style="font-family: 'Noto Sans SC'; font-weight: lighter"
             type="text"
             placeholder="搜索文件"/>
      <button class="searchBtn ml-3">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
             width="15" height="15" viewBox="0 0 10 10">
          <g style="mix-blend-mode:passthrough" clip-path="url(#master_svg0_71_1377)">
            <g style="mix-blend-mode:passthrough">
              <path
                  d="M4.583335876464844,1.6666631544189454C2.9725058764648438,1.6666631544189454,1.6666688764648439,2.9725001544189453,1.6666688764648439,4.583330154418945C1.6666688764648439,6.194160154418945,2.9725058764648438,7.500000154418945,4.583335876464844,7.500000154418945C5.369125876464844,7.500000154418945,6.082375876464844,7.1892501544189455,6.606835876464844,6.683910154418945C6.617795876464844,6.6696601544189456,6.6297958764648435,6.655910154418946,6.642875876464844,6.6428701544189455C6.655915876464844,6.629790154418945,6.669665876464844,6.6177901544189455,6.683915876464844,6.606830154418946C7.189255876464844,6.082370154418945,7.500005876464844,5.369120154418946,7.500005876464844,4.583330154418945C7.500005876464844,2.9725001544189453,6.194165876464844,1.6666631544189454,4.583335876464844,1.6666631544189454C4.583335876464844,1.6666631544189454,4.583335876464844,1.6666631544189454,4.583335876464844,1.6666631544189454ZM7.513295876464844,6.924040154418945C8.026455876464844,6.282500154418945,8.333335876464844,5.468750154418945,8.333335876464844,4.583330154418945C8.333335876464844,2.5122601544189456,6.654415876464844,0.8333301544189453,4.583335876464844,0.8333301544189453C2.512265876464844,0.8333301544189453,0.8333358764648438,2.5122601544189456,0.8333358764648438,4.583330154418945C0.8333358764648438,6.654410154418946,2.512265876464844,8.333330154418945,4.583335876464844,8.333330154418945C5.468755876464844,8.333330154418945,6.282505876464843,8.026460154418945,6.924045876464843,7.513290154418946C6.924045876464843,7.513290154418946,8.455375876464844,9.044620154418945,8.455375876464844,9.044620154418945C8.618085876464843,9.207330154418946,8.881915876464843,9.207330154418946,9.044625876464844,9.044620154418945C9.207335876464844,8.881910154418945,9.207335876464844,8.618080154418944,9.044625876464844,8.455370154418945C9.044625876464844,8.455370154418945,7.513295876464844,6.924040154418945,7.513295876464844,6.924040154418945C7.513295876464844,6.924040154418945,7.513295876464844,6.924040154418945,7.513295876464844,6.924040154418945Z"
                  fill-rule="evenodd" fill="#767676" fill-opacity="1"/>
            </g>
          </g>
        </svg>
      </button>
    </div>
    <div style="display: flex; position: relative" class="mt-6 items-center content-center">
      <div
          style="font-size: 12px">
        共 {{ files.length }} 条搜索结果。
      </div>
      <button style="position: absolute; right: 0">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
             width="13" height="13" viewBox="0 0 10 10">
          <defs>
            <clipPath id="master_svg0_93_0213">
              <rect x="0" y="0" width="10" height="10" rx="0"/>
            </clipPath>
          </defs>
          <g clip-path="url(#master_svg0_93_0213)">
            <g></g>
            <g></g>
            <g>
              <g>
                <g>
                  <g>
                    <g></g>
                    <g>
                      <path
                          d="M1.0892566235351562,2.260821C1.1859981235351562,2.027275,1.4138941235351563,1.875,1.666682123535156,1.875L5.833334123535156,1.875C7.559244123535156,1.875,8.958334123535156,3.2741100000000003,8.958334123535156,5C8.958334123535156,6.72587,7.559244123535156,8.125,5.833334123535156,8.125L2.083344123535156,8.125C1.7381731235351563,8.125,1.4583481235351563,7.84517,1.4583481235351563,7.5C1.4583481235351563,7.15483,1.7381731235351563,6.875,2.083344123535156,6.875L5.833334123535156,6.875C6.868874123535156,6.875,7.708334123535156,6.03554,7.708334123535156,5C7.708334123535156,3.96447,6.868874123535156,3.125,5.833334123535156,3.125L3.1755641235351564,3.125L3.5669541235351563,3.51639C3.811034123535156,3.7604699999999998,3.811034123535156,4.1562,3.5669541235351563,4.40029C3.322884123535156,4.64433,2.927154123535156,4.64433,2.6830741235351563,4.40029L1.2247401235351563,2.9419399999999998C1.0459942035351562,2.763192,0.9925192235351562,2.494371,1.0892566235351562,2.260821Z"
                          fill-rule="evenodd" fill="#000000" fill-opacity="1"/>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
    </div>
    <ul style="margin-top: 15px">
      <li v-for="(item, index) in files"
          :key="index">
        <div style="display: flex" class="items-center content-center relBarItem p-1 my-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="20" height="20" viewBox="0 0 15 15"><defs><clipPath id="master_svg0_93_2922"><rect x="0" y="0" width="15" height="15" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_93_2922)"><g></g><g></g><g><g><path d="M13.04039189376831,10.861825785446166L8.35336189376831,0.5489007854461669C8.20148189376831,0.21468178544616698,7.868201893768311,-0.0004742145538330078,7.49976189376831,-0.0004742145538330078C7.13180189376831,-0.0004742145538330078,6.79851189376831,0.21468178544616698,6.6464118937683105,0.5489007854461669L1.9589075937683105,10.861625785446167C1.8271888937683105,11.151825785446167,1.8517982937683106,11.489725785446167,2.0238298937683106,11.756925785446168C2.1970328937683106,12.025525785446167,2.4937518937683105,12.187525785446168,2.8122678937683103,12.187525785446168L6.562271893768311,12.187525785446168L6.562271893768311,14.062525785446168C6.562271893768311,14.580725785446168,6.98156189376831,15.000025785446168,7.499771893768311,15.000025785446168C8.01820189376831,15.000025785446168,8.43750189376831,14.580725785446168,8.43750189376831,14.062525785446168L8.43750189376831,12.187525785446168L12.18699189376831,12.187525785446168C12.50559189376831,12.187525785446168,12.802291893768311,12.025525785446167,12.976191893768311,11.757225785446167C13.148391893768311,11.489725785446167,13.172091893768311,11.152025785446167,13.04039189376831,10.861825785446166Z" fill="#89D3B1" fill-opacity="1"/></g></g></g></svg>
          </div>
          <div class="pl-2 overflow-auto" id="btnRef"
               @mouseenter="togglePopover()"
               @mouseleave="togglePopover()">
            <div style="font-size: 12px;">
              {{ item.name }}
            </div>
            <div style="font-size: 10px">
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
  </div>
</template>

<script>
import { ref } from 'vue'
import { createPopper } from '@popperjs/core'

export default {
  name: 'ForestBar',
  setup () {
    const files = [{
      name: 'FileNav.vue',
      curChild: -1,
      path: 'app2\\src\\components\\FileNav.vue',
      absolutePath: ['app2', 'src', 'components', 'FileNav.vue'],
      offset: -1,
      content: '4',
      children: [],
      type: 'file'
    }]
    const popoverShow = ref(false)

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

    return {
      files,
      popoverShow,
      togglePopover
    }
  }
}
</script>

<style scoped>
.searchBtn:hover path {
  fill: #42b983;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
  -webkit-transition:left .3s, fill .3s;
}

.searchBtn:active path {
  fill: #19734b;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
  -webkit-transition:left .3s, fill .3s;
}

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
