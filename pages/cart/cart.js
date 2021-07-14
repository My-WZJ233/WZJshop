import checkLogin from "../../utils/checkLogin";
// import {getCarsList, changeNum, changeChecked} from "../../service/cart"
import {
    getCarsList, 
    changeNum, 
    changeChecked, 
    deleteCart
} from "../../service/cart"

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
        // 计算已勾选的商品的总价
        const allPrice = this.data.goods.reduce((previousValue, currentValue) => {
            if(currentValue.is_checked) {
                return previousValue + currentValue.num * currentValue.goods.price * 100
            } else {
                return previousValue
            }
        }, 0)

        this.setData({allPrice})

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
    },

    /**
     * 点击移除购物车
     */
    onDeleteCart(event) {
        // 1. 准备请求参数
        const id = event.target.id

        // 2. 请求API, 执行移除
        deleteCart(id).then(() => {
            // 弹窗提醒
            wx.showToast({
              title: '移除成功',
              icon: "success"
            })

            // 3. 更新展示的数据
            // 方式一: 从新请求购物车列表, 不建议, 产生了额外的网络请求
            // 方式二: 直接处理数组, 从数组移除已删除的项目
            const goods = this.data.goods.filter(item => item.id != id)
            this.setData({goods})
        })
        
    },
    
    /**
     * 跳转到预览页
     */
    toPreview() {
        // 如果一个商品都没有勾选, 那么就不跳转到结算页
        const checkSelect = this.data.goods.findIndex(item => item.is_checked == 1)

        if (checkSelect === -1) {
            wx.showToast({
              title: '至少选择一个商品',
              icon: 'none'
            })
        } else {
            wx.navigateTo({
                url: '/pages/preview/preview',
            })
        }
    
    }
})