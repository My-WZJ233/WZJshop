const request = require('../utils/request')

/**
 * 获取支付信息
 */
export const getPayConfig = (order_id, data = {}) => request.get(`/api/orders/${order_id}/pay`, data)

/**
 * 查询订单状态
 */
export const getOrderStatus = (order_id) => request.get(`/api/orders/${order_id}/status`, {}, false)