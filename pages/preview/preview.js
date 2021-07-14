import {orderPreview} from '../../service/order'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: null,
        carts: [],
        allPrice: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        // 请求API, 获取页面数据
        orderPreview().then(res => {
            this.setData({
                ...res,
                address: res.address.filter(item => item.is_default).pop(),
                allPrice: res.carts.reduce((pre, cur) => {
                    return pre + cur.num * cur.goods.price * 100
                }, 0)
            })
            // 计算总价
        })
    },
})