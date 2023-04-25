<template>
  <div class="pl-2">
    <div style="font-size: 12px">
      当前文档下共有 {{ tags.length }} 个标签
    </div>
    <div class="items-center content-center my-2">
      <!-- 在具体实现方面，可以通过一个 v-for 维护 -->
      <!-- 点击删除标签按钮时需要将其从标签组中删去，注意绑定事件 -->
      <span
          v-for="(tag, index) in tags"
          :key="index"
          class="tag text-gray-700 text-xs font-normal mr-2 my-1 px-3 py-1 rounded-full inline-flex items-center">
            <svg class="w-3 h-3 mr-1" fill="#5e5e5e" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path
                d="M416 127.1h-58.23l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L292.9 127.1H197.8l9.789-58.74c2.906-17.44-8.875-33.92-26.3-36.83c-17.53-2.875-33.92 8.891-36.83 26.3L132.9 127.1H64c-17.67 0-32 14.33-32 32C32 177.7 46.33 191.1 64 191.1h58.23l-21.33 128H32c-17.67 0-32 14.33-32 32c0 17.67 14.33 31.1 32 31.1h58.23l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C108.5 479.9 110.3 480 112 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27h95.12l-9.789 58.74c-2.906 17.44 8.875 33.92 26.3 36.83C268.5 479.9 270.3 480 272 480c15.36 0 28.92-11.09 31.53-26.73l11.54-69.27H384c17.67 0 32-14.33 32-31.1c0-17.67-14.33-32-32-32h-58.23l21.33-128H416c17.67 0 32-14.32 32-31.1C448 142.3 433.7 127.1 416 127.1zM260.9 319.1H165.8L187.1 191.1h95.12L260.9 319.1z"/></svg>
            {{ tag }}
            <button type="button"
                    class="inline-flex transition items-center p-1 ml-2 text-sm bg-transparent rounded-md hover:bg-gray-400 hover:text-white"
                    aria-label="Remove"
            @click="removeTag(tag, index)">
              <svg aria-hidden="true" class="w-2 h-2" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"></path></svg>
            </button>
      </span>

      <!-- 点击叶子按钮时需要将输入框内容添加到标签组中，注意绑定事件 -->
      <span class="items-center inline-flex">
          <input
              v-model="keyWord"
              type="text"
              class="block text-gray-700 text-xs font-normal mr-2 my-2 px-3 py-1 inline-flex items-center hover:shadow-sm transition duration placeholder-gray focus:ring-0 rounded-md"
              id="newTag"
              placeholder="输入新标签..."
              style="width: 100px"
          />
          <button type="button"
                  class="inline-flex transition items-center text-sm text-blueGray-300 bg-transparent rounded-md hover:text-blueGray-800"
                  aria-label="Remove"
                  @click="handleSearch">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"> <g> <path fill="none" d="M0 0H24V24H0z"/> <path
                d="M21 3v2c0 9.627-5.373 14-12 14H7.098c.212-3.012 1.15-4.835 3.598-7.001 1.204-1.065 1.102-1.68.509-1.327-4.084 2.43-6.112 5.714-6.202 10.958L5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0z"/> </g> </svg>
          </button>
      </span>
    </div>
    <ul style="margin-top: 10px" v-if="showM">
      <li v-for="(item, index) in resTags"
          :key="index"
          @click="handleAddTag(index)">
        {{ item }}
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

    bus.on('editTags', (obj) => {
      tags.value.length = 0
      tags.value.push(...obj.res)
    })

    async function handleSearch () {
      showM.value = true
      resTags.value = await window.electronAPI.getTags(keyWord.value)
      resTags.value = resTags.value.filter((tagName) => {
        return tags.value.indexOf(tagName) === -1
      })
      console.log('过滤之后：', resTags.value)
    }

    function handleAddTag (index) {
      const selected = resTags.value[index]
      for (let i = 0; i < tags.value.length; i++) {
        if (selected === tags.value[i]) {
          return
        }
      }
      bus.emit('addTags', selected)
      tags.value.push(selected)
    }

    function removeTag (tagName, index) {
      bus.emit('removeTags', tagName)
      tags.value.splice(index, 1)
    }

    return {
      tags,
      resTags,
      keyWord,
      showM,
      handleSearch,
      handleAddTag,
      removeTag
    }
  }
}
</script>

<style scoped>
.tag {
  background-color: #d3dcd9;
}

.tag:hover {
  background-color: #d6ece3;
  -webkit-transition: .3s;
}
</style>
