/**
 * @ Author: firstfu
 * @ Create Time: 2021-05-22 03:28:58
 * @ Description: 驗證器
 */

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports = (app) => {

  let { config } = app


  /**
   * 解碼line idToken
   */
  function lineDecode(token) {
    const decode = jwt.decode(token)
    // console.log('decode:', decode)
    return decode
  }


  /**
   * 加密密碼
   * @param {*} pwd: 密碼
   */
  function hashPwd(pwd) {
    const saltRounds = 5
    return bcrypt.hashSync(pwd, saltRounds)
  }


  /**
   * 驗證密碼
   * @param {*} pwd: 密碼
   * @param {*} hashPwd: hash密碼
   */
  function verifyPwd(pwd, hashPwd) {
    return bcrypt.compareSync(pwd, hashPwd)
  }


  /**
   * 產生token
   */
  function createToken({ userId = '', time = (60 * 60) * 24 * 365 * 200 }) {
    const token = jwt.sign({
      issuer: 'gymMachi',
      userId,
    },
      config.jwtKey, {
      expiresIn: time,
    })
    return token
  }

  /**
   * 驗證token
   */
  function verifyToken(token) {
    return new Promise((resolve, reject) => {
      if (!token) {
        return reject(new Error('錯誤:使用者認證'))
      }
      jwt.verify(token, config.jwtKey, (err, decoded) => {
        if (err) {
          return reject(new Error(err))
        }
        return resolve(decoded)
      })
    })
  }




  return {
    lineDecode,
    hashPwd,
    verifyPwd,
    createToken,
    verifyToken,
  }

}
