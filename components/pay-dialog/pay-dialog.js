import {getPayConfig, getOrderStatus} from '../../service/pay'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        order_id: {
            type: Number,
            value: 0,
        },
        from: {
            type: String,
            value: 'preview'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        showPay: false,
        qr_code_url: '',
        timer: null,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 稍后支付
         */
        toOrderInfo() {
            // 清除定时器
            clearInterval(this.data.timer)

            // 如果是订单详情发起的支付,就不要跳转了
            if(this.data.from == 'info') {
                this.setData({
                    showPay: false
                })
            } else {
                // 跳转到订单详情
                wx.redirectTo({
                    url: '/pages/order_info/order_info?order_id=' + this.data.order_id,
                })
            }
           
        },
        /**
         * 获取支付信息
         */
        getPayConfig() {
            const data = {
                type: 'aliyun' // 使用支付宝支付, 微信支付不支持沙箱测试
            }
            const order_id = this.data.order_id
            getPayConfig(order_id, data).then(payConfig => {
                // 小程序支付可以直接使用小程序提供的API进行支付
                // 从后台获取支付的配置, 配置正确, 会自动弹出输入支付密码的界面
                // 因为微信不提供沙箱测试, 所以暂时无法测试
                
                // wx.requestPayment({
                //     timeStamp: payConfig.payConfig,
                //     nonceStr: payConfig.nonceStr,
                //     package: payConfig.package,
                //     signType: 'MD5',
                //     package: payConfig.package,
                //     success (res) { 
                //         // 接口调用成功, 也就是弹出微信支付输入密码界面
                //         //  轮询查询订单状态, 如果订单状态是 2 就是支付成功了, 那就跳转
                //         // ...
                //     },
                //     fail (res) { }
                //   })


                // 因为没有企业资质,所以没有企业微信支付商户号, 无法生成小城支付需要的相关配置, 为了项目流程能进行下去, 暂时使用支付宝二维码支付
                // 真实项目中, 应该使用微信小程序API支付
                // 弹窗显示支付二维码
                this.setData({
                    showPay: true,
                    qr_code_url: payConfig.qr_code_url
                })
                
                // 扫码支付
                // 支付成功, 跳转到支付成功页面
                // 轮询查询订单状态, 如果订单状态是 2 就是支付成功了, 那就跳转
                const timer = setInterval(() => {
                    getOrderStatus(order_id).then(status => {
                        if (status == 2) {
                            clearInterval(timer)
                            wx.redirectTo({
                              url: '/pages/pay_success/pay_success?order_id=' + order_id,
                            })
                        }
                    })
                }, 2000)

                // 将定时器的索引设置到data中, 其他地方可以使用
                this.setData({timer})

            })
        }
    }
})
