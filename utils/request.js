import checkLogin from "./checkLogin";
import {baseUrl} from "./config";

const toast = (title, reject) => {
    wx.showToast({
        title,
        icon: 'none'
    })
    reject(title)
}

const request = (url, method = "GET", data = {}) => {
    return new Promise((resolve, reject) => {
        wx.showLoading({title: '加载中..'})
        wx.request({
            url: baseUrl + url,
            method,
            data,
            header: {
                Authorization: 'Bearer ' + wx.getStorageSync('access_token') || ''
            },
            success(res) {
                let msg = ''
                const {statusCode} = res
                // 400以下都是成功返回了
                if (statusCode < 400) {
                    resolve(res.data)
                } else if (statusCode === 400) {  // 请求错误, 服务器返回了错误信息
                    msg = res.data.message
                } else if (statusCode === 401) { // 未认证(未登录), token过期等
                    // 用户账号密码错误
                    if (res.data.message == 'Unauthorized') {
                        msg = '账号密码错误'
                    } else {
                        // 用户没有token, 或者token无效, 重定向登录页面
                        // 清空原来缓存的登录信息
                        wx.removeStorageSync('access_token')
                        wx.removeStorageSync('userInfo')
                        // 缓存来源地址, 并跳转到登录
                        checkLogin()
                    }
                } else if (statusCode === 403) { // 没有权限
                    msg = '没有权限'
                } else if (statusCode === 404) { // 资源不存在
                    msg = '未找到资源'
                } else if (statusCode === 422) { // 表单验证未通过
                    const {errors} = res.data
                    msg = errors[Object.keys(errors)[0]][0]
                } else if (statusCode === 429) { // 请求频率过快
                    msg = '请稍后再试'
                } else {
                    msg = '请求异常'
                }

                // 统一提示
                if(msg) toast(msg, reject)
            },
            fail(e) {
                toast('服务器异常')
                reject(e)
            },
            complete() {
                wx.hideLoading()
            }
        })
    })
}

const e = {
    request,
    get: (url, data = {}) => request(url, 'GET', data),
    post: (url, data = {}) => request(url, 'POST', data),
    patch: (url, data = {}) => {
        // 微信小程序不支持patch请求, 所以要处理一下
        data = {
            ...data,
            _method: 'PATCH'
        }
        // 使用post请求, 请求参数中的 _method 可以模拟要请求的方法, put patch delete 等
        return request(url, 'POST', data)
    },
    put: (url, data = {}) => request(url, 'put', data),
    delete: (url, data = {}) => request(url, 'DELETE', data),
}

module.exports = e