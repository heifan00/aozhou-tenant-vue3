import request from '@/request'

// 获取系统信息
export const getSystemInfo = () => {
  return request({
    url: '/system/info',
    method: 'get'
  })
}

// 获取系统配置
export const getSystemConfig = () => {
  return request({
    url: '/system/config',
    method: 'get'
  })
}

// 更新系统配置
export const updateSystemConfig = (data) => {
  return request({
    url: '/system/config',
    method: 'put',
    data
  })
}

// 获取系统日志
export const getSystemLogs = (params) => {
  return request({
    url: '/system/logs',
    method: 'get',
    params
  })
}