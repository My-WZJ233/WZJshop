const validate = require('../../utils/validate')
const {doLogin} = require('../../utils/auth')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        email: '',
        password: '',
        error_email: '',
        error_password: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 执行登录
     */
    login() {
        const check = this.checkInput()
        if (!check) return

        const data = {
            email: this.data.email,
            password: this.data.password
        }

        doLogin(data)
    },

    /**
     * 表单数据验证
     * @returns {boolean}
     */
    checkInput() {
        // 对邮箱进行验证
        const checkEmail = validate.email(this.data.email)
        const checkPassword = validate.min(this.data.password, 6)

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

        // 全部验证通过才返回 true
        if(checkEmail && checkPassword) return true
        return false
    }
})