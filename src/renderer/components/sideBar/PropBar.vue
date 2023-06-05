<template>
  <div class="pl-2 pr-4" v-if="all === 1">
    <div style="font-size: 12px">
      当前文档下共有 {{ tags.length }} 个标签
    </div>
    <div class="items-center w-full content-center my-2">
      <!-- 在具体实现方面，可以通过一个 v-for 维护 -->
      <!-- 点击删除标签按钮时需要将其从标签组中删去，注意绑定事件 -->
      <div style="max-width: 250px">
        <ul class="my-4 space-y-3">
          <li v-for="(tag, index) in tags"
              class="flex-auto"
              :key="index"
              :title="tag">
            <a href="#" class="flex tag items-center p-3 text-base font-bold text-gray-900 rounded-lg hover:bg-white hover:shadow transition-all border-gray-200 border-b-2">
              <svg aria-hidden="true" class="w-3 h-4 inline" fill="#5e5e5e" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M416 127.1h-58.23l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L292.9 127.1H197.8l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L132.9 127.1H64c-17.67 0-32 14.33-32 32C32 177.7 46.33 191.1 64 191.1h58.23l-21.33 128H32c-17.67 0-32 14.33-32 32c0 17.67 14.33 31.1 32 31.1h58.23l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C108.5 479.9 110.3 480 112 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27h95.12l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C268.5 479.9 270.3 480 272 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27H384c17.67 0 32-14.33 32-31.1c0-17.67-14.33-32-32-32h-58.23l21.33-128H416c17.67 0 32-14.32 32-31.1C448 142.3 433.7 127.1 416 127.1zM260.9 319.1H165.8L187.1 191.1h95.12L260.9 319.1z"/>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">{{ tag.length > 7 ? tag.slice(0, 7) + '...' : tag }}</span>
              <button class="inline-flex transition items-center p-1 ml-2 text-sm text-gray-300 bg-transparent rounded-md hover:bg-gray-200 hover:text-white"
                      aria-label="Remove"
                      @click="removeTag(tag, index)">
                <svg aria-hidden="true" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                              clip-rule="evenodd"></path>
                </svg>
              </button>
            </a>
          </li>
        </ul>
      </div>
      <!-- 点击叶子按钮时需要将输入框内容添加到标签组中，注意绑定事件 -->
      <div class="items-center flex flex-wrap w-full">
          <input
              v-model="keyWord"
              type="text"
              class="block text-gray-700 text-xs font-normal mr-2 my-2 px-3 py-1 inline-flex items-center hover:shadow-sm transition duration placeholder-gray focus:ring-0 rounded-md"
              id="newTag"
              style="width: 80%;"
              placeholder="输入新标签..."
              @keyup.enter="handleAddTag(keyWord)"
          />
        <div class="flex" style="position: absolute; right: 0">
          <button type="button"
                  class="transition pr-4 items-center text-sm text-blueGray-300 bg-transparent rounded-md hover:text-blueGray-800"
                  aria-label="Remove"
                  @mouseenter="handleSearch">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"> <g> <path fill="none" d="M0 0H24V24H0z"/> <path
                d="M21 3v2c0 9.627-5.373 14-12 14H7.098c.212-3.012 1.15-4.835 3.598-7.001 1.204-1.065 1.102-1.68.509-1.327-4.084 2.43-6.112 5.714-6.202 10.958L5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0z"/> </g> </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-bind:class="{'hidden': !showM, 'block': showM}"
         @mouseleave="handleSearch"
         class="items-center content-center overflow-y-auto transition-all ease-linear bg-white border-0 shadow-md mr-3 py-2 block font-normal text-base text-left no-underline break-words rounded-lg opacity-90"
         style="position: relative; font-family: 'Noto Sans SC'; max-height: 300px; width: 80%">
      <div v-for="(item, index) in resTags"
           class="px-3 py-1 option w-full"
          :key="index"
          @click="handleAddTag(item)">
        {{ item }}
      </div>
    </div>
  </div>
  <div class="pl-2 pr-4" v-if="all === 2">
    <div style="font-size: 12px">
      当前工作区共有 {{ allTag.length }} 个标签
    </div>
    <div class="items-center content-center my-2">
      <div style="max-width: 250px">
        <ul class="my-4 space-y-3">
          <li v-for="(tag, index) in allTag"
              class="deco"
              @click="getFileByTag(tag)"
              :key="index"
              :title="tag">
            <a href="#" class="flex tag items-center p-3 text-base font-bold text-gray-900 rounded-lg hover:bg-white hover:shadow transition-all border-gray-200 border-b-2">
              <div>
                <svg aria-hidden="true" class="w-3 h-4 inline" fill="#5e5e5e" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M416 127.1h-58.23l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L292.9 127.1H197.8l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L132.9 127.1H64c-17.67 0-32 14.33-32 32C32 177.7 46.33 191.1 64 191.1h58.23l-21.33 128H32c-17.67 0-32 14.33-32 32c0 17.67 14.33 31.1 32 31.1h58.23l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C108.5 479.9 110.3 480 112 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27h95.12l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C268.5 479.9 270.3 480 272 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27H384c17.67 0 32-14.33 32-31.1c0-17.67-14.33-32-32-32h-58.23l21.33-128H416c17.67 0 32-14.32 32-31.1C448 142.3 433.7 127.1 416 127.1zM260.9 319.1H165.8L187.1 191.1h95.12L260.9 319.1z"/>
                </svg>
              </div>
              <span class="flex-1 ml-3 whitespace-nowrap">{{ tag.length > 7 ? tag.slice(0, 7) + '...' : tag }}</span>
              <span id="decoration" class="inline-flex items-center justify-center p-1 text-xs text-gray-500 bg-gray-200 rounded overflow-x-hidden flex-none"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <hr style="border: none;border-top: 2px solid #ccc;height: 1px;margin: 20px 0;">
    <div style="font-size: 12px">
      当前标签关联 {{ tagged.length }} 个文档
    </div>
    <ul style="margin-top: 15px">
      <li v-for="(path, index) in tagged"
          :key="index"
          @click="toggle(path)" class="my-2 hover:bg-white hover:shadow transition-all rounded-lg p-2">
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
  </div>
</template>

<script>
import { ref } from 'vue'
import bus from 'vue3-eventbus'

export default {
  name: 'PropBar',
  setup () {
    const tags = ref(['BUAA', 'SCSE', 'SE'])
    const resTags = ref(['a', 'b', 'c'])
    const keyWord = ref('')
    const showM = ref(false)
    const all = ref(0)
    const allTag = ref([{ name: 'ba', num: 0 }, { name: 'bb', num: 0 }])
    const tagged = ref([])

    /**
     *
     * @param {int} value: 0-nothing, 1-curTag, 2-allTag
     */
    bus.on('showAllTag', async (value) => {
      all.value = value
      if (value === 2) {
        allTag.value = await window.electronAPI.getTags()
      }
    })

    bus.on('editTags', ({ tags: tagsArray }) => {
      tags.value.length = 0
      tags.value.push(...tagsArray)
    })

    async function handleSearch () {
      if (showM.value === false) {
        showM.value = true
        resTags.value = await window.electronAPI.getTags(keyWord.value)
        resTags.value = resTags.value.filter((tagName) => {
          return tags.value.indexOf(tagName) === -1
        })
      } else {
        showM.value = false
      }
    }

    function handleAddTag (value) {
      showM.value = false
      const selected = value
      for (let i = 0; i < tags.value.length; i++) {
        if (selected === tags.value[i]) {
          return
        }
      }
      bus.emit('addTags', selected)
    }

    function removeTag (tagName, index) {
      bus.emit('removeTags', tagName)
      tags.value.splice(index, 1)
    }

    async function getFileByTag (tag) {
      tagged.value = await window.electronAPI.getFilesByTag(tag)
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

    function getName (path) {
      return window.pathAPI.basename(path)
    }

    return {
      tags,
      resTags,
      keyWord,
      showM,
      all,
      tagged,
      allTag,
      handleSearch,
      handleAddTag,
      removeTag,
      toggle,
      getFileByTag,
      getName
    }
  }
}
</script>

<style scoped>
.tag {
  font-family: "Noto Serif SC";
  font-weight: 500;
}

.tag:hover {
  font-weight: 900;
}

.option:hover {
  background-color: #e5e5e5;
  font-weight: 900;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}

.option:active {
  background-color: #c9c9c9;
  -webkit-transition: background-color .3s;
  -webkit-transition:left .3s, background-color .3s;
}

.relBarItem {
  font-family: "Noto Sans SC";
}

.relBarItem:hover {
  font-weight: 900;
  border-radius: 6px;
  -webkit-transition: .2s;
}

.deco:hover #decoration {
  background-color: #42b983;
}
</style>
