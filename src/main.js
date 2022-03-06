import { createApp } from 'vue'
import app from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import axios from "axios";
import 'element-plus/dist/index.css'

let App = createApp(app)

App.config.globalProperties.Axios = axios
App.use(store).use(ElementPlus).use(router)
App.mount('#app')
