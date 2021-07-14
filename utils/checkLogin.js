export default () => {
    // 检查用户是否登录
    const checkToken = wx.getStorageSync('access_token')
    if (!checkToken) {
        // 获取页面路径已经查询参数
        const {route, options} = getCurrentPages().pop()
        // 页面路径
        let path = '/' + route

        // 判断是否有查询参数
        const optionsKeys = Object.keys(options)
        if (optionsKeys.length != 0) {
            // 假定 options = {id: 1, name: 'Tom'}
            // optionsKeys = ['id', 'name']
            const queryString = '?' + optionsKeys.reduce((previousValue, currentValue) => {
                // 第一次迭代: id=1&
                // 第二次迭代: id=1&name=Tom&
                return `${previousValue}${currentValue}=${options[currentValue]}&`
            }, '').slice(0, -1) // slice 截取之后: id=1&name=Tom
            path += queryString
        }

        // 记录回跳页面
        wx.setStorageSync('login_back_url', path)
        // 跳转到登录
        wx.redirectTo({
            url: '/pages/login/login'
        })
    }
}