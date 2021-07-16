import {orderInfo} from '../../service/order'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderStatus: {
            1: {
                text: "未支付",
                color: 'danger'
            },
            2: {
                text: "已支付",
                color: 'success'
            },
            3: {
                text: '已发货',
                color: 'success'
            },
            4: {
                text: '已收货',
                color: 'success'
            },
            5: {
                text: '已过期',
                color: 'danger'
            },
        },
        order: {},
        orderDetails: [],
        address: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        orderInfo(options.order_id).then(order => {
            this.setData({
                order: order,
                orderDetails: order.orderDetails.data,
                address: order.address
            })
        })
    },

})