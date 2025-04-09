import request from '@/request'

// 学校列表
export const getSchoolList = (data) => {
    return request({
        url: '/api/school/get-school-list',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

// 更新学校状态
export const updateSchoolStatus = (data) => {
    return request({
        url: '/api/school/stop-school',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}
