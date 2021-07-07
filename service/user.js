const request = require('../utils/request')

// 登录
export const getUserInfo = (data = {}) => request.get('/api/user', data)
