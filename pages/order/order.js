import {getOrderList} from '../../service/order'
import {orderStatus} from '../../utils/data'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderStatus,
        orders: [],
        status: 1,
        page: 1,
        isLast: false,
        isLoading: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
    },

    /**
     * 查询订单列表
     */
    getData() {
        this.setData({
            isLoading: true
        })

        // 处理查询条件
        const {status, page} = this.data
        const data = {
            status,
            page
        }
        getOrderList(data).then(res => {
            this.setData({
                isLoading: false
            })

            this.setData({
                orders: [...this.data.orders, ...res.data]
            })

            // 判断是否是最后一页
            if(page == res.meta.pagination.total_pages) {
                this.setData({
                    isLast: true
                })
            }
        })
    },

    /**
     * 跳转到订单详情
     */
    toOrderInfo(event) {
        const order_id = event.target.id
        wx.navigateTo({
          url: '/pages/order_info/order_info?order_id=' + order_id,
        })
    },

    /**
     * 切换tab触发的事件
     */
    onChange(event) {
        const {index} = event.detail
        
        // 通过点击不同的tar, 设置查询条件
        this.setData({status: index + 1})

        this.setData({
            orders: [], 
            page: 1,
            isLast: false,
        })
        this.getData()
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
        this.getData()
    },
})