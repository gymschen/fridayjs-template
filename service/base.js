/**
 * @ Author: firstfu
 * @ Create Time: 2021-05-22 18:35:17
 * @ Description: BaseService
 */


class BaseService {
  constructor(app) {
    let { service, model, config, helper, plugin } = app
    this.service = service
    this.model = model
    this.config = config
    this.helper = helper
    this.plugin = plugin
  }


}

module.exports = BaseService;