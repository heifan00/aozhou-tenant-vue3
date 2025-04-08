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
