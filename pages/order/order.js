import {getOrderList} from '../../service/order'
import {orderStatus} from '../../utils/data'
import {Confirm} from '../../service/order'
import {Comment} from '../../service/order'

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
        nowCommentOrder: {},
        show: false,
        content: '',
        commentOrder_id: null,
        // popupShow: false,
        starValue:3,
        rateValue: '1',
        comment: {}
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
        const order_id = event.currentTarget.id
        wx.navigateTo({
          url: '/pages/order_info/order_info?order_id=' + order_id,
        })
        console.log(order_id);
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

    /**
     * 确认收货
     */
    confirmGoods(event) {
        // 1. 获取订单id
        const order_id = event.target.id
        const order_no = event.currentTarget.dataset.order_no
        
        // 3. 确认收货之后, 弹窗提醒, 移出数据
        // 弹窗提醒
        wx.showModal({
            title: '你确定要收货吗',
            content: '收获前请检查包裹是否破损，如有破损请联系卖家',
            success: res => {
                if (res.confirm) {
                    console.log('收货成功');
                    // 2. 发送请求, 执行确认收货
                    Confirm(order_id, order_no).then(() => {
                        this.setData({
                            status: 4
                        })

                        wx.showToast({
                            title: '收货成功',
                            icon: 'success'
                          })
                    })
                    
                }
            }
        })
        
    },

    onClose() {
        this.setData({ show: false });
    },
    /**
     * 打开评论商品
     */
    openCommentGoods(event) {
        // console.log(event);
        //1. 获取订单id
        const order = event.currentTarget.dataset.order
        console.log(order);
        this.setData({
            show: true
        })
        console.log(this.data.show);
        // 2. 通过订单id, 从 this.data.orders 筛选出对应的订单数据, 缓存到 data 中, 后面会用到
        this.setData({
            commentOrder_id : event.target.id,
            nowCommentOrder : order.orderDetails.data
        })
        console.log(this.data.nowCommentOrder);
    },

    //  监听评论更改
    onPopupTextChange(event) {
        // event.detail 为当前输入的值
        this.setData({
            content: event.detail
        })
    },

    /**
     * 执行评论商品
     */
    doCommentGoods() {
        // console.log(this.data.nowCommentOrder[0].goods_id);
        if(!this.data.content.trim()){
            wx.showToast({
                title: '请输入评论内容'
              })
        }else{
            // 4. 订单有多个商品, 所以 循环 this.data.nowCommentOrder.orderDetails.data
            for(var i=0;i<this.data.nowCommentOrder.length;i++){
                let data = {
                    goods_id: this.data.nowCommentOrder[i].goods_id,
                    content: this.data.content,
                    // rate: this.data.rateValue,
                    // star: this.data.starValue
                }
                // console.log(this.data.commentOrder_id,data);
                // 5. 在循环的过程中, 请求API, 执行商品评论 
                // console.log(comment);
                Comment(this.data.commentOrder_id,data).then(() => {
                    // 6. 提示评论完成, 关闭弹窗
                    wx.showToast({
                      title: '评价完成'
                    })
                    
                })
            }
            this.setData({
                show: false,
                // rateValue: '1',
                // starValue: 3,
            })
            this.getData()
        }
    }
})