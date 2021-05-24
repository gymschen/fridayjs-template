/**
 * @ Author: firstfu
 * @ Create Time: 2021-05-19 18:40:23
 * @ Description: loader掛載框架服務
 */
let scanCoreFolder = require('./scanCoreFolder')
let scanPluginFolder = require('./scanPluginFolder')


module.exports = (app) => {
  app.plugin = scanPluginFolder('../plugin', app)
  app.model = require('../../models/model')
  app.config = scanCoreFolder('../../config', app)
  app.helper = scanCoreFolder('../../helper', app)
  app.service = scanCoreFolder('../../service', app)
  app.middleware = scanCoreFolder('../../middleware', app)
  app.controller = scanCoreFolder('../../controller', app)
}