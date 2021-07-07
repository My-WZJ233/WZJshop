export default () => {
    // 检查用户是否登录
    const checkToken = wx.getStorageSync('access_token')
    if (!checkToken) {
        const path = '/' + getCurrentPages().pop().route
        // 记录回跳页面
        wx.setStorageSync('login_back_url', path)
        // 跳转到登录
        wx.redirectTo({
            url: '/pages/login/login'
        })
    }
}