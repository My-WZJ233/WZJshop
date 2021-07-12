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

    },

    /**
     * 获取上传后的文件的key
     */
    getFileKey(e) {
        console.log(e.detail);
    }

})