import {login} from "../service/auth";
import {getUserInfo} from "../service/user";
import Toast from "../miniprogram_npm/@vant/weapp/toast/toast";

/**
 * 跳转回来源页的方法
 */
const back = () => {
    const path = wx.getStorageSync('login_back_url')
    wx.reLaunch({
        url: path
    })
}

const doLogin = (data, type = 'login') => {
    // 发送请求执行登录
    login(data).then(res => {
        // 缓存token
        wx.setStorageSync('access_token', res.access_token)

        // 获取当前登录用户信息
        getUserInfo().then(res => {
            // 缓存用户信息
            wx.setStorageSync('userInfo', res)

            // 登录之后, 回到来源页
            Toast({
                type: 'success',
                message: type == 'login' ? '登录成功' : '注册成功',
                onClose: () => {
                    if (type == 'login') {
                        // 如果是登录, 跳转到绑定微信的页面
                        wx.redirectTo({
                            url: '/pages/bind/bind'
                        })
                    } else {
                        back()
                    }
                },
            });

        })
    })
}

module.exports = {
    doLogin,
    back
}