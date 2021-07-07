import {login} from "../service/auth";
import {getUserInfo} from "../service/user";
import Toast from "../miniprogram_npm/@vant/weapp/toast/toast";

const doLogin = data => {
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
                message: '登录成功',
                onClose: () => {
                    // 缓存里面记录的来源页
                    const path = wx.getStorageSync('login_back_url')
                    wx.reLaunch({
                        url: path
                    })
                },
            });

        })
    })
}

module.exports = {
    doLogin
}