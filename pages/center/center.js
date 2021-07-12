import checkLogin from "../../utils/checkLogin";
import {logout} from "../../service/auth";
import toast from '../../utils/toast'
import {bindOpenid} from "../../service/auth";
import {updateUserInfoCache} from '../../utils/auth'
import {updateAvatar} from "../../service/user";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 检查登录
        checkLogin()

        // 从缓存里取出用户信息
        this.setData({
            userInfo: wx.getStorageSync('userInfo')
        })
    },

    /**
     * 绑定或者解绑微信
     */
    bindOrUnbind() {
        // 1. 区分绑定还是解绑
        const {openid} = this.data.userInfo
        let type = 'bind'
        if (openid) type = 'unbind'

        // 区分提示类型
        const msg = type == 'bind' ? '绑定' : '解绑'

        // 弹窗提醒
        wx.showModal({
            title: '提示',
            content: '你确定要' + msg,
            success: res => {
                if (res.confirm) {
                    this.doBindOrUnbind(type, msg)
                }
            }
        })

    },

    /**
     * 发送请求, 执行绑定或者解绑
     */
    doBindOrUnbind(type, msg) {
        // 请求参数
        const data = {
            type,
            openid: wx.getStorageSync('openid')
            /*
               必须用自己的openid, 不要用userInfo里面的openid, 因为如果你登录了别人的微信,
               那么你传的就是别人的 openid, 这样就会出现把别人账号解绑的情况
            */
        }

        // 2. 请求api, 执行绑定或者解绑
        bindOpenid(data).then(() => {
            // 3. 更新用户信息
            updateUserInfoCache(res => {
                this.setData({
                    userInfo: res
                })

                toast.success(msg + '成功')
            })
        })
    },

    /**
     * 退出登录
     */
    logout() {
        // 1. 发送请求,让服务端token失效
        logout().then(() => {
            // 2. 清除本地缓存
            wx.removeStorageSync('access_token')
            wx.removeStorageSync('userInfo')

            // 3. 弹窗提醒
            toast.success('退出成功', () => {
                // 4. 跳转到首页
                wx.reLaunch({url: '/pages/index/index'})
            })

        })
    },

    /**
     * 获取上传后的文件的key, 同时自动更新头像
     */
    getFileKey(e) {
        // 发送请求更新头像
        updateAvatar({avatar: e.detail}).then(() => {
            // 更新用户缓存
            updateUserInfoCache(res => {
                this.setData({
                    userInfo: res
                })
                // 绑定成功弹窗提醒
                toast.success('更新成功')
            })
        })
    }
})