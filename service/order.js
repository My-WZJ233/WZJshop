const request = require('../utils/request')

// 订单预览
export const orderPreview = () => request.get('/api/orders/preview')

/**
 * 提交订单
 */
export const commitOrder = (data) => request.post('/api/orders', data)

/**
 * 订单详情
 */
export const orderInfo = (order_id) => request.get(`/api/orders/${order_id}?include=orderDetails.goods,address`)