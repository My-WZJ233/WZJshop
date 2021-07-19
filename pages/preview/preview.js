import {orderPreview, commitOrder} from '../../service/order'
import {getPayConfig, getOrderStatus} from '../../service/pay'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: null,
        carts: [],
        allPrice: 0,
        showPay: false,
        qr_code_url: '',
        order_id: null,
        timer: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    onShow() {
        // 请求API, 获取页面数据
        orderPreview().then(res => {
            // 判断缓存中是否有选择的地址, 如有有, 就用选择的地址
            const address_id = wx.getStorageSync('select_address')
            let address = null
            if (address_id) {
                address = res.address.filter(item => item.id == address_id).pop()
            } else {
                address = res.address.filter(item => item.is_default).pop()
            }

            this.setData({
                ...res,
                address,
                allPrice: res.carts.reduce((pre, cur) => {
                    return pre + cur.num * cur.goods.price * 100
                }, 0)
            })
        })
    },

    /**
     * 提交订单并支付
     */
    onCommitOrder() {
        // 没有地址, 不让提交
        if(!this.data.address) {
            wx.showToast({
              title: '请选择收货地址',
              icon: 'none'
            })
            return
        }

        // 准备提交的数据
        const data = {
            address_id: this.data.address.id
        }

        // 发起请求, 提交订单
        commitOrder(data).then(order => {
            // 设置订单id
            this.setData({
                order_id: order.id
            })
            // 发起请求, 获取支付信息
            const payDialog = this.selectComponent('#pay-dialog');
            // 调用子组件实例对象的 getPayConfig() 方法, 弹出支付二维码
            payDialog.getPayConfig() // 此方法在 子组件实例对象的原型链上
        })

    },

})