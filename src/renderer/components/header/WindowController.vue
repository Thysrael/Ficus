<template>
  <button @click="minimizeWindow" style="-webkit-app-region: no-drag" class="tr1-element">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
          width="40" height="40" viewBox="0 0 40 40">
      <g style="mix-blend-mode:passthrough">
        <rect x="0" y="0" width="40" height="40" rx="0"/>
        <g clip-path="url(#master_svg0_71_2542)">
          <path :d="minimizePath" fill="#F4F4F3" fill-opacity="1"/>
        </g>
      </g>
    </svg>
  </button>
  <button @click="maximizeWindow" style="-webkit-app-region: no-drag" class="tr2-element">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1"
          width="40" height="40" viewBox="0 0 40 40">
      <g style="mix-blend-mode:passthrough">
        <rect x="0" y="0" width="40" height="40" rx="0"/>
        <g clip-path="url(#master_svg0_71_507)">
          <path :d="maximizePath" fill="#F4F4F3" fill-opacity="1"/>
        </g>
      </g>
    </svg>
  </button>
  <button @click="closeWindow" style="-webkit-app-region: no-drag" class="tr3-element">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="40" height="40" viewBox="0 0 40 40">
      <defs>
        <clipPath id="master_svg0_71_2735"><rect x="15" y="15" width="10" height="10.000000953674316" rx="0" /></clipPath>
      </defs>
      <rect x="0" y="0" width="40" height="40" rx="0" fill="#B13333" fill-opacity="1"/>
      <g clip-path="url(#master_svg0_71_2735)">
        <path :d="closePath" fill="#F4F4F3" fill-opacity="1"/>
      </g>
    </svg>
  </button>
</template>

<script>
import { minimizePath, maximizePath, closePath } from '../../assets/window-control'
export default {
  name: 'WindowController',
  setup () {
    function minimizeWindow () {
      window.electronAPI.minWindow()
    }

    function maximizeWindow () {
      window.electronAPI.maxWindow()
    }

    function closeWindow () {
      window.electronAPI.closeWindow()
    }

    return {
      minimizeWindow,
      maximizeWindow,
      closeWindow,
      minimizePath,
      maximizePath,
      closePath
    }
  }
}
</script>

<style scoped>

.tr1-element {
  position: fixed;
  top: 0;
  right: 75px;
}

.tr2-element {
  position: fixed;
  top: 0;
  right: 35px;
}

.tr3-element {
  position: fixed;
  top: 0;
  right: 0;
}

.tr1-element rect {
  fill: none;
}

.tr1-element:hover rect {
  fill: #666A70;
  fill-opacity: 1;
}

.tr1-element:active rect {
  fill: #3D3D3D;
  fill-opacity: 1;
}

.tr2-element rect {
  fill: none;
}

.tr2-element:hover rect {
  fill: #666A70;
  fill-opacity: 1;
}

.tr2-element:active rect {
  fill: #3D3D3D;
  fill-opacity: 1;
}

.tr3-element rect {
  fill: none;
}

.tr3-element:hover rect {
  fill: #B13333;
  fill-opacity: 1;
}

.tr3-element:active rect {
  fill: #6e1919;
  fill-opacity: 1;
}
</style>
