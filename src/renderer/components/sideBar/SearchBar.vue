<template>
  <div class="searchBar content-center items-center w-full mt-2 pl-2 pr-4">
    <div class="mr-2 w-full">
      <input class="area-search-tab w-full px-2 placeholder-gray text-sm"
             style="font-family: 'Noto Sans SC'; font-weight: lighter; font-size: 12px"
             v-model="keyWord"
             placeholder="全局搜索..." type="text" @keyup.enter="handleSearch"/>
    </div>
    <button class="searchBtn" @click="handleSearch">
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
  <ul style="margin-top: 40px" class="pl-2 pr-4" v-if="searchResult.length !== 0">
  <li v-for="(path, index) in searchResult"
      :key="index"
      @click="toggle(path)"
      class="hover:bg-white hover:shadow transition-all rounded-lg p-2">
    <a href="#" style="display: flex" class="items-center content-center relBarItem">
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
      <div class="pl-2 overflow-hidden" :title="path">
        <div style="font-size: 12px; text-overflow: ellipsis; white-space: nowrap">
          {{ getName(path) }}
        </div>
        <div style="font-size: 10px; color: #666A70; text-overflow: ellipsis; white-space: nowrap">
          {{ path }}
        </div>
      </div>
    </a>
  </li>
</ul>
  <div style="font-size: 12px; font-family: 'Noto Sans SC'; margin-top: 50px" class="pl-2" v-if="searchResult.length === 0">
    没有匹配结果。
  </div>
</template>

<script>
import { ref } from 'vue'
import bus from 'vue3-eventbus'

export default {
  name: 'SearchBar',
  setup () {
    const keyWord = ref('')

    const searchResult = ref([])

    function getName (path) {
      return window.pathAPI.basename(path)
    }

    /**
     * 重新刷新
     */
    bus.on('reSearch', handleSearch)

    /**
     * 删除结果
     */
    bus.on('clearSearchResult', () => {
      keyWord.value = ''
      searchResult.value.length = 0
    })

    async function handleSearch () {
      searchResult.value = await window.electronAPI.globalSearch(keyWord.value)
    }

    function toggle (path) {
      const obj = {
        name: window.pathAPI.basename(path),
        path,
        type: 'file',
        offset: -1,
        absolutePath: path.split(window.pathAPI.sep)
      }
      bus.emit('openNewTab', obj)
    }

    return {
      keyWord,
      searchResult,
      getName,
      handleSearch,
      toggle
    }
  }
}
</script>

<style scoped>
.searchBar {
  position: absolute;
  display: flex;
  opacity: 1;
}

.searchBtn:hover path {
  fill: #42b983;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
}

.searchBtn:active path {
  fill: #19734b;
  fill-opacity: 1;
  -webkit-transition: fill .3s;
}

.relBarItem {
  font-family: "Noto Sans SC";
}

.relBarItem:hover {
  border-radius: 6px;
  -webkit-transition: .2s;
}
</style>
