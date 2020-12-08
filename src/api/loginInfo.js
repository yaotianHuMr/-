// 导入封装的axios文件
import request from '@/utils/request'

// 用户登录
export function userLogin(mobile, password) {
    return request({
        url: '/adminUser/login',
        method: 'POST',
        data: {
            mobile, password
        }
    })
}

// 获取用户信息接口
export function userInfo(data = {}) {
    return request({
        url: '/menu/info',
        method: 'POST',
        data
    })
}

// 退出登录接口

// export function userLogout(mobile, password) {
//     return request({
//         url: '/adminUser/login',
//         method: 'POST',
//         data: {
//             mobile, password
//         }
//     })
// }