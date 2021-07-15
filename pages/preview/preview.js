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
    }
})