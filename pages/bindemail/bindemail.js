const validate = require('../../utils/validate')
import {updateUserInfoCache} from '../../utils/auth'
import { emailCode, updateEmail } from "../../service/user"
var interval = null

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        email: '',
        sms: '',
        error_email: '',
        error_sms: '',
        // disabled: false,
        timer: null,
        time: '发送验证码', 
        currentTime: 30,
        iscodeTime: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    getEmail() {
        const data = {
            email: this.data.email
        }
    },

    // 验证码倒计时
    getCode: function (options){
        var that = this;
        var currentTime = that.data.currentTime
        interval = setInterval(function () {
            currentTime--;
            that.setData({
                time: currentTime+'秒'
            })
            if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                    time: '重新发送',
                    currentTime: 30,
                    disabled: false   
                })
            }
        }, 1000)  
    },
    

    // 发送验证码
    sendcode() {
        emailCode({email: this.data.email}).then(() => {
            // console.log();
            this.getCode();
            var that = this
            that.setData({
                disabled:true
            })
        })
        
    },
    
    bindEmail(e) {
        
        console.log(this.data.email);
        const check = this.checkInput()
        if(!check) return

        const { email, sms } = this.data
        const params = { email, sms }
        if(!check) return
        console.log(params);
        updateEmail(params).then(() => {
            updateUserInfoCache(res => {
                this.setData({
                    userInfo: res
                })
                wx.showToast({
                    title: '修改成功',
                    icon: 'success'
                })
            })
        })
    },

    checkInput() {
        const { email, sms } = this.data
        const checkEmail = validate.email(email)
        const checksms = validate.max(sms, 4)

        if(!checkEmail) {
            this.setData({error_email: '邮箱格式不正确'})
        } else {
            this.setData({error_email: ''})
        }

        if(!checksms) {
            this.setData({error_sms: '请输入4位数字验证码'})
        } else {
            this.setData({error_sms: ''})
        }

        if (checkEmail &&  checksms) return true
        return false
    }
})