import {bindOpenid} from "../../service/auth";
import toast from '../../utils/toast'
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
            // 绑定成功弹窗
            toast.success('绑定成功', () => {
                back()
            })
        })
    },

    /**
     * 暂时跳过
     */
    skip() {
        back()
    }
})