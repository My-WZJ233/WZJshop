import {login} from "../service/auth";
import {getUserInfo} from "../service/user";
// import Toast from "../miniprogram_npm/@vant/weapp/toast/toast";
import toast from './toast'

/**
 * 跳转回来源页的方法
 */
const back = () => {
    const path = wx.getStorageSync('login_back_url')
    wx.reLaunch({
        url: path
    })
}
// 登录
const doLogin = (data, type = 'login') => {
    // 发送请求执行登录
    login(data).then(res => {
        // 缓存token
        wx.setStorageSync('access_token', res.access_token)

        // 获取当前登录用户信息
        getUserInfo().then(res2 => {
            // 缓存用户信息
            wx.setStorageSync('userInfo', res2)

            const message = type == 'login' ? '登录成功' : '注册成功'
            toast.success(message, () => {
                // 登录之后, 如果用户信息中没有openid, 跳转到绑定微信的页面
                if (type == 'login' && res2.openid == '') {
                    wx.redirectTo({
                        url: '/pages/bind/bind'
                    })
                } else {
                    back()
                }
            })
        })
    })
}

// 更新缓存中的用户信息
const updateUserInfoCache = (callback = () => {}) => {
   // 获取当前登录用户信息
   getUserInfo().then(res => {
       // 缓存用户信息
       wx.setStorageSync('userInfo', res)
       // 执行回调
       callback(res)
   })
}

module.exports = {
    doLogin,
    back,
    updateUserInfoCache
}