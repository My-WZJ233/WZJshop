import {register} from "../../service/auth";
const {doLogin} = require('../../utils/auth')

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
        this.register()
    },

    /**
     * 执行注册
     */
    register() {
        // 表单验证
        const params = {
            name: 'aaa',
            email: 'aaa@a.com',
            password: '123123',
            password_confirmation: '123123',
        }

        // 执行注册
        register(params).then(res => {
            // 注册成功之后, 执行登录
            const data = {
                email: 'aaa@a.com',
                password: '123123',
            }
            doLogin(data)
        })
    }
})