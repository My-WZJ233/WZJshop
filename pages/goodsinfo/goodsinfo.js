import {getGoodsInfo, collectGoods} from "../../service/goods";
import {addCart, getCarsList} from "../../service/cart"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsId: '',
        likeGoods: [],
        goodsInfo: {},
        comments: [],
        isCollect: 0,
        cartsList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            goodsId: options.id
        })

        // 请求数据
        getGoodsInfo(options.id).then(res => {
            // 动态设置导航栏标题
            wx.setNavigationBarTitle({
                title: res.goods.title
              })
            this.setData({
                likeGoods: res.like_goods,
                goodsInfo: res.goods,
                comments: res.goods.comments,
                isCollect: res.goods.is_collect,
            })
        })

        // 请求购物车数据
        this.getCarts()
    },

    /**
     * 收藏商品
     */
    onCollect() {
        // 0. 判断是收藏还是取消收藏
        const {isCollect} = this.data

        // 1. 请求api, 收藏商品
        collectGoods(this.data.goodsId).then(() => {
            // 2. 修改页面显示状态
            this.setData({
                isCollect: isCollect ? 0 : 1
            })
            // 3. 弹窗提醒
            wx.showToast({
                title: isCollect ? '已取消收藏' : '收藏成功',
                icon: 'success'
            })
        })

    },

    /**
     * 加入购物车
     */
    onAddCart() {
        // 1. 处理提交的数据
        const data = {
            goods_id: this.data.goodsId
        }
        // 2. 请求api, 添加到购物车
        addCart(data).then(() => {
            // 3. 弹窗提醒
            wx.showToast({
                title: '加入成功',
                icon: 'success'
            })
            // 延迟请求, 不然会覆盖成功的提醒
            setTimeout(() => {
                // 请求购物车数据
                this.getCarts()
            }, 1000)
        })
    },

    /**
     * 获取购物车列表
     */
    getCarts() {
        // 发送请求, 获取列表
        getCarsList().then(res => {
            // 筛选当前商品在购物车中的已添加数量
            // const cart = res.data.find(item => item.goods_id == this.data.goodsId)
            // console.log(cart.num)

            this.setData({
                cartsList: res.data
            })
        })
    }
})