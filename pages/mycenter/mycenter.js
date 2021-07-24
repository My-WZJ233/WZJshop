import { updateName } from "../../service/user"
import {updateUserInfoCache} from '../../utils/auth'
// pages/mycenter/mycenter.js
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
        this.setData({
            userInfo: wx.getStorageSync('userInfo')
        })
    },

    getName() {
        const data = {
            name: this.data.name
        }
    },

    edieNmae(e) {
        console.log(this.data.name);
        updateName({name: this.data.name}).then(() => {
            updateUserInfoCache(res => {
                this.setData({
                    userInfo: res
                })
                wx.showToast({
                    title: '修改成功',
                    icon: 'success'
                })
                wx.reLaunch({
                  url: '/pages/center/center',
                })
            })
        })
    }
})