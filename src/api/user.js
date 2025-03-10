import request from '@/request'

// 用户注册
export const register = (data) => {
  return request({
    url: '/api/user/register',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return request({
    url: '/user/info',
    method: 'put',
    data
  })
}

// 修改密码
export const changePassword = (data) => {
  return request({
    url: '/user/password',
    method: 'put',
    data
  })
}