/**
 * @ Author: firstfu
 * @ Create Time: 2021-05-22 21:55:40
 * @ Description: 自定義Error
 */


class CustomError extends Error {
  constructor({ name = 'CustomError', code = 40301, message = null, error = null }) {
    super(message)
    // 錯誤名稱
    this.name = name
    // 錯誤代碼
    this.code = code
    // 錯誤訊息
    this.message = message
    // 錯誤trace棧
    this.error = error
    this.trace = error?.stack
  }
}

module.exports = (app) => {
  return CustomError
}