const request = require('../utils/request')

/**
 * 购物车列表
 */
export const getCarsList = (data = {}) => request.get('/api/carts', data)

/**
 * 加入购物车
 */
export const addCart = (data = {}) => request.post('/api/carts', data)

/**
 * 改变购物车数量
 */
export const changeNum = (id, data = {}) => request.put('/api/carts/' + id, data)

/**
 * 改变购物车的选中
 */
export const changeChecked = (data = {}) => request.patch('/api/carts/checked', data)