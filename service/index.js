const request = require('../utils/request')

// 首页数据
export const getIndexData = (data = {}) => request.get('/api/index', data)