import checkLogin from "../../utils/checkLogin";
import {getCarsList, changeNum, changeChecked} from "../../service/cart"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkedAll: false,
        allPrice: 0,
        goods: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        checkLogin()
    },

    onShow() {
        // 获取购物车列表
        const params = {
            include: 'goods'
        }
        getCarsList(params).then(res => {
            this.countPrice(res.data)
        })
    },

    /**
     * 选中商品
     */
    oneSelect(event) {
        const id = event.target.id
        const isChecked = event.detail

        // 让当前点击的商品, 选中或者不选中
        const goods = this.data.goods.map(item => {
            if(item.id == id) item.is_checked = isChecked  ? 1 : 0
            return item
        })

        // 重新计算价格
        this.countPrice(goods)

        // 请求API, 设置选中
        this.changeChecked()
    },

    /**
     * 数量改变
     */
    numChange(event) {
        const id = event.target.id
        const num = event.detail

        // 调用API, 修改购物车数量
        changeNum(id, {num}).then(() => {
            // 重新获取购物车列表, 重新计算价格 -- 会额外发送请求, 为了考虑性能, 暂不使用
            // getCarsList(params).then(res => {
            //     this.countPrice(res.data)
            // })

            // 修改指定商品的数量
            const goods = this.data.goods.map(item => {
                if(item.id == id) item.num = num
                return item
            })

            // 重新计算价格
            this.countPrice(goods)
        })

    },

    /**
     * 全选
     */
    allSelect(event) {
        const isChecked = event.detail

        // 让所有的商品都选中
        const goods = this.data.goods.map(item => {
            item.is_checked = isChecked ? 1 : 0
            return item
        })
        
        this.setData({
            checkedAll: isChecked, // 设置全选选中
        })
        
        // 重新计算价格
        this.countPrice(goods)

        // 请求API, 设置选中
        this.changeChecked()
    },

    /**
     * 计算总价格
     */
    countPrice(goods) {
        this.setData({
            goods,
            allPrice: 0
        })
        // 遍历所有商品
        this.data.goods.forEach(item => {
            // 如果是选中的情况下, 累加价格
            if(item.is_checked) {
                this.setData({
                    allPrice: this.data.allPrice + item.goods.price * item.num * 100
                })
            }
        })

        // 如果商品全部选中, 那么设置全选为 true 
        const checkAll = this.data.goods.findIndex(item => item.is_checked == 0)
        this.setData({
            checkedAll: checkAll == -1 ? true : false
        })
    },

    /**
     * 改变购物车的选中
     */
    changeChecked() {
        // 处理数据, 获取所有选中的商品
        const data = []
        this.data.goods.forEach(item => {
            if(item.is_checked) data.push(item.id)
        })

        // 请求API, 将所有选中的商品, 提交给API
        changeChecked({cart_ids: data})
    }
})