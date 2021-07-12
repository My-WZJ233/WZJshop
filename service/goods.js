const request = require('../utils/request')

// 商品详情
export const getGoodsInfo = id => request.get('/api/goods/' + id)

// 商品收藏和取消收藏
export const collectGoods = id => request.post('/api/collects/goods/' + id)