import {
    getCollects,
    collectGoods
} from "../../service/goods";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        goodsId: '',
        collectsList: [],
        isLast: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
    },



    /**
     * 取消收藏
     */
    cancelCollection(event) {
        console.log(event);
        this.setData({
            goodsId: event.target.id
        })
        collectGoods(this.data.goodsId).then(() => {
            // 弹窗提醒
            wx.showToast({
                title: '已取消收藏',
                icon: 'success'
            })
        })
        this.setData({
            collectsList: [],
            page: 1,
            isLast: false
        }) // 状态重置
        this.getData()
    },
    /**
     * 获取数据
     */
    getData() {
        const page = this.data.page
        getCollects(page).then(res => {
            const {per_page} = res.meta.pagination
            console.log(res);
            console.log(per_page);
            this.setData({
                collectsList: [...this.data.collectsList, ...res.data]
            })
            console.log(this.data.collectsList);
            // 如果返回的商品数据, 小于每页的数据, 那么是最后一页了
            if (res.data.length < per_page) {
                this.setData({
                    isLast: true
                })
            }

        })
    },

    /**
     * 页面触底事件
     */
    onReachBottom() {
        if (this.data.isLast) return
        // 带着分页信息重新请求数据
        this.setData({
            page: this.data.page + 1
        })
        console.log(this.data.page);
        this.getData()
    },

})