import {getIndexData} from "../../service/index";

Page({
    data: {
        slides: [],
        goods: [],
        page: 1,
        isLoading: false,
        search: {},
        isLast: false,
        isFirst: true
    },

    onLoad() {
        // console.log(getCurrentPages());
        this.getData()
    },
    onChange(event) {
        const {index} = event.detail
        if (index == 0) this.setData({search: {sales: 1}})
        if (index == 1) this.setData({search: {recommend: 1}})
        if (index == 2) this.setData({search: {new: 1}})
        this.setData({goods: [], page: 1})
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

    getData() {
        this.setData({isLoading: true})

        const data = {
            page: this.data.page,
            ...this.data.search
        }

        // 请求API获取数据
        getIndexData(data).then(res => {
            this.setData({isLoading: false})
            const {per_page, data} = res.goods

            // 是否是第一次加载, 第一次加载设置轮播图
            if (this.data.isFirst) {
                this.setData({
                    slides: res.slides,
                    isFirst: false
                })
            }

            // 获取到数据之后, 对data里定义的数据进行更新
            this.setData({
                goods: [...this.data.goods, ...data]
            })

            // 如果返回的商品数据, 小于每页的数据, 那么是最后一页了
            if (data.length < per_page) {
                this.setData({
                    isLast: true
                })
            }
        })

    }
})
