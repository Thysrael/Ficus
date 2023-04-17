import { createApp } from 'vue'
import App from './renderer/App.vue'
import './renderer/assets/tailwind.css'
import contextmenu from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'
import store from './renderer/store'

createApp(App).use(contextmenu).use(store).mount('#app')
