import {bindOpenid} from "../../service/auth";
import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast";
const {back} = require('../../utils/auth')

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 执行绑定微信
     */
    bind() {
        // 发送请求, 绑定微信
        const data = {
            type: 'bind',
            openid: wx.getStorageSync('openid')
        }
        bindOpenid(data).then(() => {
            Toast({
                type: 'success',
                message: '绑定成功',
                onClose: () => {
                    back()
                },
            });
        })
    },

    /**
     * 暂时跳过
     */
    skip() {
        back()
    }
})