const request = require('../utils/request')

// 商品详情
export const getGoodsInfo = id => request.get('/api/goods/' + id)