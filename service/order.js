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

/**
 * 订单列表
 */
export const getOrderList = (data = {}) => request.get(`/api/orders?include=orderDetails.goods`, data, false)

/**
 * 确认收货
 */
export const Confirm = (order_id,order_no) => request.patch(`/api/orders/${order_id}/confirm?order=${order_no}`)

/**
 * 评价
 */
export const Comment = (order_id,data) => request.post(`/api/orders/${order_id}/comment?`,data)