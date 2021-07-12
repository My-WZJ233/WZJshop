import checkLogin from "../../utils/checkLogin";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkedAll: false,
        allPrice: 0,
        goods: [
            {
                id: 1,
                price: 90,
                num: 1,
                checked: false,
            },
            {
                id: 2,
                price: 190,
                num: 1,
                checked: false,
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        checkLogin()
    },

    /**
     * 选中商品
     */
    oneSelect(event) {
        const id = event.target.id
        const isChecked = event.detail

        // 但凡有一个没选中, 就让全选设置为false
        if(!isChecked) {
            this.setData({
                checkedAll: false
            })
        }

        // 让当前点击的商品, 选中或者不选中
        const goods = this.data.goods.map(item => {
            if(item.id == id) {
                item.checked = isChecked
                // 判断, 如果是选中, 就增加总价格, 如果是不选中, 就减少总价格
                if(isChecked) {
                    this.setData({
                        allPrice: this.data.allPrice + item.price * item.num * 100
                    })
                } else {
                    this.setData({
                        allPrice: this.data.allPrice - item.price * item.num * 100
                    })
                }
            }
            return item
        })


        this.setData({
            goods
        })

        // 如果商品全部选中, 那么设置全选为 true 
        const checkAll = this.data.goods.findIndex(item => item.checked == false)
        if (checkAll == -1) {
            this.setData({
                checkedAll: true
            })
        }
    },

    /**
     * 数量改变
     */
    numChange(event) {
        const id = event.target.id
        const num = event.detail

        // 修改指定商品的数量
        const goods = this.data.goods.map(item => {
            if(item.id == id) {
                // 如果当前商品是选中的, 重新计算价格
                if (item.checked) {
                    this.setData({
                        allPrice: this.data.allPrice + (num - item.num) * item.price * 100
                    })
                }
                item.num = num
            }
            return item
        })


        this.setData({
            goods
        })
    },

    /**
     * 全选
     */
    allSelect(event) {
        const isChecked = event.detail

        this.setData({
            allPrice: 0
        })

        // 让所有的商品都选中
        const goods = this.data.goods.map(item => {
            item.checked = isChecked

            // 当全部选中的情况下, 重新计算价格
            if(isChecked) {
                this.setData({
                    allPrice: this.data.allPrice + item.price * item.num * 100
                })
            }

            return item
        })
        
        this.setData({
            checkedAll: isChecked, // 设置全选选中
            goods
        })
        
    }
})