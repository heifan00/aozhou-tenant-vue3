import axios from 'axios'
import qs from 'qs'
import router from "@/router/index.js";

// 创建axios实例
const service = axios.create({
    baseURL: '', // 不需要设置baseURL，因为vite代理已经处理了路径
    timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        const token = localStorage.getItem('token')
        console.log(token)

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        // 打印请求地址
        console.log(config.url)
        // 处理不同的Content-Type
        if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data)
        }

        return config
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        // 对响应数据做些什么
        if (res.code === 40100) { // 新增40100判断
            router.push('/login'); // 跳转登录页
            return Promise.reject(new Error('Token已失效'));
        } else if (res.code === 0) {
            return res
        } else {
            // 处理错误
            return Promise.reject(new Error(res.message || 'Error'))
        }
    },
    error => {
        // 对响应错误做些什么
        return Promise.reject(error)
    }
)

export default service