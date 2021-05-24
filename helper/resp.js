/**
 * @ Author: firstfu
 * @ Create Time: 2021-05-22 03:28:58
 * @ Description: 回應器
 */



const logger = require('./logger')()


module.exports = (app) => {


  // API成功回傳
  function success({ code, data }) {
    return {
      status: 'ok',
      code,
      error: null,
      data,
    }
  }

  // API錯誤回傳
  function fail({ code, errorMsg, error = null }) {
    logger.write({ code, errorMsg, error })
    return {
      status: 'error',
      code,
      error: errorMsg,
      data: null,
    }
  }



  return {
    success,
    fail
  }

}
