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
    url: '/api/user/getUserInfo',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
