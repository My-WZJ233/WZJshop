import {getGoodsInfo} from "../../service/goods";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsId: '',
        likeGoods: [],
        goodsInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 请求数据
        getGoodsInfo(options.id).then(res => {
            console.log(res);
            this.setData({
                goodsId: options.id,
                likeGoods: res.like_goods,
                goodsInfo: res.goods
            })
        })
    },
})