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
            const data2 = {
                type: 'aliyun' // 使用支付宝支付, 微信支付不支持沙箱测试
            }
            // 发起请求, 获取支付信息
            getPayConfig(order.id, data2).then(payConfig => {
                // 弹窗显示支付二维码
                this.setData({
                    showPay: true,
                    qr_code_url: payConfig.qr_code_url
                })
                
                // 扫码支付
                // 支付成功, 跳转到支付成功页面
                // 轮询查询订单状态, 如果订单状态是 2 就是支付成功了, 那就跳转
                const timer = setInterval(() => {
                    getOrderStatus(order.id).then(status => {
                        if (status == 2) {
                            clearInterval(timer)
                            wx.redirectTo({
                              url: '/pages/pay_success/pay_success?order_id=' + order.id,
                            })
                        }
                    })
                }, 2000)

            })
            
        })

    },

    /**
     * 稍后支付
     */
    toOrderInfo() {
        // 跳转到订单详情
        wx.redirectTo({
          url: '/pages/order_info/order_info?order_id=' + this.data.order_id,
        })
    }
})