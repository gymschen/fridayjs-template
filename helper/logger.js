/**
 * @ Author: firstfu
 * @ Create Time: 2021-05-22 03:28:58
 * @ Description: logger處理器
 */

// const util = require('util');
const winston = require('winston')

/**
 * Fridayjs winston
 */
const fridayLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'fridayjs錯誤記錄' }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.json(),
    winston.format.colorize()
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/friday/error.json',
      json: true,
      maxsize: 5242880,
      maxFiles: 10,
    }),
    // new winston.transports.Console(),
  ],
});



module.exports = (app) => {

  /**
   * logger處理器
   * @param {*} logs日誌
   */
  function write(logs) {
    console.log('logger處理器:', logs.error)
    fridayLogger.error({
      level: 'error',
      message: logs.error
    });
  }


  return {
    write
  }

}
