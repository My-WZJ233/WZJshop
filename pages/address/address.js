const { getAddress, deleteAddress } = require("../../service/address")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    onShow() {
        // 请求API, 获取数据
        getAddress().then(res => {
            this.setData({
                address: res.data
            })
        })
    },

    /**
     * 跳转到添加页面
     */
    toAddressAdd() {
        wx.navigateTo({
          url: '/pages/address_add/address_add',
        })
    },

    /**
     * 跳转到编辑页面
     */
    toEdit(event) {
        const id = event.target.id
        wx.navigateTo({
            url: '/pages/address_add/address_add?id=' + id,
        })
    },

    /**
     * 删除地址
     */
    onDeleteAddress(event) {
        const id = event.target.id
        // 1. 弹窗确认是否删除
        wx.showModal({
            title: '提示',
            content: '确认要删除吗',
            success: (res) => {
              if (!res.confirm) return

              // 2. 请求API, 执行删除
              deleteAddress(id).then(() => {
                // 3. 弹窗提示, 删除成功
                wx.showToast({
                title: '删除成功',
                icon: 'success'
                })

                // 4. 更新 data 中的数据
                this.setData({
                    address: this.data.address.filter(item => item.id != id)
                })
              })
             
            }
        })
          
    },


    /**
     * 选择地址
     */
    selectAddress(event) {
        const id = event.target.id
        wx.setStorageSync('select_address', id)
        wx.navigateBack()
    }
})