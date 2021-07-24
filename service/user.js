const request = require('../utils/request')

// 登录
export const getUserInfo = (data = {}) => request.get('/api/user', data)

// 更新头像
export const updateAvatar = (data = {}) => request.patch('/api/user/avatar', data)

// 修改用户名
export const updateName = (data = {}) => request.put('/api/user', data)

// 修改密码
export const updatePassword = (data = {}) => request.post('/api/auth/password/update', data)

// 邮箱
export const updateEmail = (data) => request.patch('/api/auth/email/update', data)

// 邮箱验证码
export const emailCode = (data = {}) => request.post('/api/auth/email/code', data)