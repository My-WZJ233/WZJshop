import {register} from "../../service/auth";
const {doLogin} = require('../../utils/auth')
const validate = require('../../utils/validate')
import {baseUrl} from "../../utils/config";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_name: '',
        error_email: '',
        error_password: '',
        error_password_confirm: '',

        avatar: baseUrl + '/imgs/avatar.png'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.register()
    },

    // 获取微信用户信息
    getWxUserInfo() {
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                this.setData({
                    avatar: res.userInfo.avatarUrl,
                    name: res.userInfo.nickName
                })
            }
        })
    },

    /**
     * 执行注册
     */
    register() {
        // 表单验证
        const check = this.checkInput()
        if(!check) return

        // 收集表单数据
        const {name, email, password, password_confirmation, avatar} = this.data
        const openid = wx.getStorageSync('openid')
        const params = {name, email, password, password_confirmation, avatar, openid}

        // 执行注册
        register(params).then(res => {
            // 注册成功之后, 执行登录
            //     email: 'aaa@a.com',
            //     password: '123123',
            const data = {email, password}
            doLogin(data, 'register')
        })
    },

    /**
     * 表单数据验证
     * @returns {boolean}
     */
    checkInput() {
        const {name, email, password, password_confirmation} = this.data
        // 对邮箱进行验证
        const checkName = validate.min(name, 2)
        const checkEmail = validate.email(email)
        const checkPassword = validate.min(password, 6)
        const checkConfirm = validate.confirm(password, password_confirmation)

        if(!checkName) {
            this.setData({error_name: '昵称最少两个字符'})

        } else {
            this.setData({error_name: ''})
        }

        if(!checkEmail) {
            this.setData({error_email: '邮箱格式不正确'})
        } else {
            this.setData({error_email: ''})
        }

        // 对密码进行验证
        if (!checkPassword) {
            this.setData({ error_password: '密码最少6位'})
        } else {
            this.setData({error_password: ''})
        }

        // 对确认密码验证
        if (!checkConfirm) {
            this.setData({ error_password_confirm: '两次密码不一致'})
        } else {
            this.setData({error_password_confirm: ''})
        }

        // 全部验证通过才返回 true
        if(checkName && checkEmail && checkPassword &&  checkConfirm) return true
        return false
    }
})