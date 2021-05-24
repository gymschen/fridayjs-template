/**
 * @ Author: firstfu
 * @ Create Time: 2021-05-22 18:35:17
 * @ Description: BaseController
 */



class BaseController {
  constructor(app) {
    let { service, model, config, helper, plugin } = app
    this.service = service
    this.model = model
    this.config = config
    this.helper = helper
    this.plugin = plugin
  }


  /**
   * API成功回傳
   * @param {*} param0
   * @returns
   */
  success = ({ code, data }) => {
    let { resp: { success, fail } } = this.helper
    return success({
      code,
      data,
    })
  }


  /**
   * API錯誤回傳
   * @param {*} param0
   * @returns
   */
  fail = ({ code, errorMsg, error }) => {
    let { resp: { success, fail } } = this.helper
    return fail({
      code,
      errorMsg,
      error
    })
  }

}

module.exports = BaseController;