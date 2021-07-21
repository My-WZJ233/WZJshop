const validate = require('../../utils/validate')
import { updatePassword } from "../../service/user"
// import {updateUserInfoCache} from '../../utils/auth'

Page({

    data: {
        userInfo: {},
        old_password: '',
        password: '',
        password_confirmation: '',
        error_password: '',
        error_password_confirm: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    editPassword() {
        // 表单验证
        const check = this.checkInput()
        if(!check) return

        // 收集表单数据
        const {old_password, password, password_confirmation} = this.data
        const params = {old_password, password, password_confirmation}
        console.log(params);
        updatePassword(params).then(() => {
            wx.showToast({
                title: '修改成功，请重新登陆',
                icon: 'success'
            })
        })
        wx.redirectTo({
            url: '/pages/login/login'
        })
    },

    /**
     * 表单数据验证
     * @returns {boolean}
     */
    checkInput() {
        const {password, password_confirmation} = this.data
        const checkPassword = validate.min(password, 6)
        const checkConfirm = validate.confirm(password, password_confirmation)

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
        if(checkPassword &&  checkConfirm) return true
        return false
    }
})