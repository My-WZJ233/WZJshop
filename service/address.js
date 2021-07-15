const request = require('../utils/request')

/**
 * 地址列表
 */
export const getAddress = () => request.get('/api/address')


/**
 * 添加地址
 */
export const addAddress = (data) => request.post('/api/address', data)

/**
 * 地址详情
 */
export const getAddressInfo = (id) => request.get('/api/address/' + id)

/**
 * 修改地址
 */
export const updateAddress = (id, data) => request.put('/api/address/' + id, data)

/**
 * 地址详情
 */
export const deleteAddress = (id) => request.delete('/api/address/' + id)