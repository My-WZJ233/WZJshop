import {orderInfo} from '../../service/order'
import {orderStatus} from '../../utils/data'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderStatus,
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

    /**
     * 立即支付
     */
    payOrder() {
        // 调用 子组件 支付方法, 弹出支付二维码
        // 通过 selectComponent 获取子组件实例对象
        const payDialog = this.selectComponent('#pay-dialog');
        // 调用子组件实例对象的 getPayConfig() 方法, 弹出支付二维码
        payDialog.getPayConfig() // 此方法在 子组件实例对象的原型链上
    }

})