const request = require('../utils/request')

// 登录
export const login = (data) => request.post('/api/auth/login', data)

// 注册
export const register = (data) => request.post('/api/auth/register', data)

// 发送小程序code, 换取openid以及用户信息
export const getOpenid = (data) => request.post('/api/auth/wx/code', data)

// 登录以后, 绑定微信到当前登录的账号
export const bindOpenid = (data) => request.post('/api/auth/wx/bind', data)
