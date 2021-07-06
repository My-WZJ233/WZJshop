const app = getApp()

Page({
  data: {
    slides: [],
    goods: [],
    page: 1,
    isLoading: false,
    active: 0
  },

  onLoad() {
    this.getData()
  },

  /**
   * 页面触底事件
   */
  onReachBottom() {
    // 带着分页信息重新请求数据
    this.setData({
      page: this.data.page + 1
    })
    this.getData()
  },

  getData() {
    this.setData({isLoading: true})
    // 请求API获取数据
    wx.request({
      url: 'https://bookapi.luwnto.com/api/index',
      data: {
        page: this.data.page
      },
      success: res => {
        this.setData({isLoading: false})

        // 判断请求的状态
        if (res.statusCode == 200) {
          // 获取到数据之后, 对data里定义的数据进行更新
          this.setData({
            slides: res.data.slides,
            goods: [...this.data.goods, ...res.data.goods.data]
            // goods: [...this.data.goods]
          })
        } else {
          wx.showToast({
            title: '请求异常',
            icon: 'error'
          })
        }
      
      }
    })
  },

  // tab标签
  
  /* onChange(event) {
    console.log(...res.data.goods.data);
    this.getData(
      this.setData({
        // goods: [...this.data.goods, ...res.data.goods.data]
        goods: [...res.data.goods.data]
      })
    )
  },*/
})
