// const request = require('../../utils/request')

import {getIndexData} from '../../service/index'
import {getUserInfo} from "../../service/user";

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
        getUserInfo()

        // 使用封装的 request
        // request.request('/api/auth/login', 'post').then(res => {
        //     console.log(res);
        // })

        // 使用封装的 get
        // request.get('/api/index').then(res => {
        //     console.log(res);
        // })

        // 统一管理api
        // getIndexData().then(res => {
        //     console.log(res);
        // })
    },

})