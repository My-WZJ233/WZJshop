const request = require('../utils/request')

// 登录
export const login = (data) => request.post('/api/auth/login', data)

// 注册
export const register = (data) => request.post('/api/auth/register', data)
