const request = require('../utils/request')

// 订单预览
export const orderPreview = () => request.get('/api/orders/preview')
