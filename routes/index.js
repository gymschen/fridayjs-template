var express = require('express')
let router = express.Router()



module.exports = (app) => {

  let { controller, service, model, middleware, config, utils, plugin } = app


  // router.post('/api/v1/user/register', controller.user.register)




  return router
}




