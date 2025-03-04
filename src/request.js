import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VITE_APP_BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
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
    if (res.code !== 200) {
      // 处理错误
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error)
  }
)

export default service