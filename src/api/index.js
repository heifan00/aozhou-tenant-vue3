import request from '@/request'

// 用户相关接口
export const login = (data) => {
  return request({
    url: '/api/user/doLogin',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

// 表单提交示例
export const submitForm = (data) => {
  return request({
    url: '/form/submit',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}