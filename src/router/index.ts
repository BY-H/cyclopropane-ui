import { createRouter, createMemoryHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', icon: 'HomeFilled' }
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/order/Order.vue'),
        meta: { title: '工单', icon: 'List' }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    }
]

const router = createRouter({
    routes,
    history: createMemoryHistory()
})

export default router
