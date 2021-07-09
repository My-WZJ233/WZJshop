import Toast from "../miniprogram_npm/@vant/weapp/toast/toast";

/**
 * 提醒
 * @param type
 * @param message
 * @param callback
 */
const toast = (type = 'success', message = '成功', onClose = () => {}) => Toast({type,message,onClose})

/**
 * 成功的提示
 */
const success = (message = '成功', onClose = () => {}) => toast('success', message, onClose)

/**
 * 错误的提示
 */
const fail = (message = '成功', onClose = () => {}) => toast('fail', message, onClose)


module.exports = {
    toast,
    success,
    fail
}