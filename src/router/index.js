import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'

// 统一声明所有路由
const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/index',
        component: Index
    },
    {
        path: '/login',
        component: Login
    }
]

// 创建路由实例
const router = createRouter({
    // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
    history: createWebHashHistory(),
    routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router