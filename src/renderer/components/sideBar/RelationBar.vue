<template>
  <div>
    <div style="font-size: 10px">
      当前文档共引用 {{ cites.length }} 个文档
    </div>
    <ul style="margin-top: 10px">
      <li v-for="(item, index) in cites"
          :key="index">
        <div style="display: flex">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
                 width="15" height="15" viewBox="0 0 15 15">
              <defs>
                <clipPath id="master_svg0_93_2618">
                  <rect x="0" y="0" width="15" height="15" rx="0"/>
                </clipPath>
              </defs>
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
          <div>
            <div style="font-size: 10px;">
              {{ item.name }}
            </div>
            <div style="font-size: 6px">
              {{ item.path }}
            </div>
          </div>
        </div>
      </li>
    </ul>
    <hr style="border: none;border-top: 2px solid #ccc;height: 1px;margin: 20px 0;">
    <div style="font-size: 10px">
      当前文档共被 {{ quoted.length }} 个文档引用
    </div>
    <ul style="margin-top: 10px">
      <li v-for="(item, index) in quoted"
          :key="index">
        <div style="display: flex">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
                 width="15" height="15" viewBox="0 0 15 15">
              <defs>
                <clipPath id="master_svg0_93_2618">
                  <rect x="0" y="0" width="15" height="15" rx="0"/>
                </clipPath>
              </defs>
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
          <div>
            <div style="font-size: 10px;">
              {{ item.name }}
            </div>
            <div style="font-size: 6px">
              {{ item.path }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

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

    return {
      cites,
      quoted
    }
  }
}
</script>

<style scoped>

</style>
