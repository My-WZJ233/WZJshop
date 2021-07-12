const request = require('../utils/request')

// 登录
export const getUserInfo = (data = {}) => request.get('/api/user', data)

// 更新头像
export const updateAvatar = (data = {}) => request.patch('/api/user/avatar', data)