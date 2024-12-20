import 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

declare module 'vue-router' {
    interface RouteMeta {
        title?: string // 路由标题
        icon?: keyof typeof ElementPlusIconsVue
    }
}
