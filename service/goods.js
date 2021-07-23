const request = require('../utils/request')

// 商品详情
export const getGoodsInfo = id => request.get('/api/goods/' + id)

// 商品收藏和取消收藏
export const collectGoods = id => request.post('/api/collects/goods/' + id)

/**
 * 商品列表页数据
 */
export const getGoodsList = (data = {}) => request.get('/api/goods', data)

/**
 * 我的收藏
 */
export const getCollects = page => request.get('/api/collects?page=' + page)
