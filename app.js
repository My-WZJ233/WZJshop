import {getOpenid} from "./service/auth";

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 调用 wx.login() 获取 临时登录凭证code ，并回传到开发者服务器。
    wx.login({
      success (res) {
        if (res.code) {
          // console.log(res.code);
          // 发送code给服务端, 让服务端校验用户授权状态
          const data = {
            appid: 'wx22eed29ec2fa1122',
            secret:'fb82f44ab5749507414c9833aec1c73a',
            js_code: res.code
          }
          getOpenid(data).then(res2 => {
            // 缓存一下openid, 后续有些操作会用到
            wx.setStorageSync('openid', res2.openid)
            // 如果当前登录的微信用户已经使用openid注册过, 或者绑定过账号, 那么就能获取到用户信息
            // 缓存 token 和用户信息, 就是登录状态了
            if (res2.access_token) {
              wx.setStorageSync('access_token', res2.access_token)
              wx.setStorageSync('userInfo', res2.user)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 全局变量
  // globalData: {
  //   baseUrl: 'https://bookapi.luwnto.com'
  // }
})
