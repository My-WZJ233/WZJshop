/**
 * 验证邮箱
 * @param email
 */
const email = email => {
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(reg.test(email)) return true
    return false
}

/**
 * 验证最小长度
 * @param str
 * @param len
 */
const min = (str, len) => {
    if(str.length >= len) return true
    return false
}

module.exports = {
    email,
    min
}