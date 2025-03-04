import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/pages/index.vue'

// 统一声明所有路由
const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/index',
        component: Index
    }
]

// 创建路由实例
const router = createRouter({
    // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
    history: createWebHashHistory(),
    routes
})

// 添加路由守卫
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token')
//   if (to.name !== 'Login' && !isAuthenticated) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

export default router