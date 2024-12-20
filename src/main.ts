import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { setupGlobalErrorHandler } from '@/utils/error-handler'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

setupGlobalErrorHandler()

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus, {
    locale: zhCn
})
app.use(router)

app.mount('#app')
