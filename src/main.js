import { createApp } from 'vue'
import { compileTemplate } from 'vue/compiler-sfc'
import router from './routes'
import App from './App.vue'
import store from './store/index'
import './assets/style.css'


createApp(App)
.use(router)
.use(store)
.mount('#app')
