// pages/pay_success/pay_success.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order_id: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            order_id: options.order_id
        })
    },

    /**
     * 跳转到订单详情
     */
    toOrderInfo() {
        wx.redirectTo({
          url: '/pages/order_info/order_info?order_id=' + this.data.order_id,
        })
    }
})