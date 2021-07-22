import {getGoodsList} from "../../service/goods";

Page({
    data: {
        value: '',
        switchTitle1: '包邮',
        switchTitle2: '团购',
        itemTitle: '分类',
        option1: [{
            text: '全部商品',
            value: 0
        },
        {
            text: '新款商品',
            value: 1
        },
        {
            text: '活动商品',
            value: 2
        },
        ],
        value1: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getGoodsList().then(res => {
            console.log(res);
            this.setData({
                goodsList: res.goods.data
            })
            console.log(this.data.goodsList);
        })
    },
  
    onChange(e) {
        this.setData({
            value: e.detail,
        });
    },
    onSearch() {
        Toast('搜索' + this.data.value);
    },
    onClick() {
        Toast('搜索' + this.data.value);
    },
});