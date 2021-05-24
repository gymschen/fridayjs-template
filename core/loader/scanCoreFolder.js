/**
 * @ Author: firstfu
 * @ Create Time: 2021-05-19 19:16:39
 * @ Description: 掃描Core文件
 */

const path = require('path')
const fs = require('fs');


/**
 * 檢測文件目錄是否存在
 * @param {string} path 路徑
 */
function isDirExist(path) {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    return false;
  }
}


/**
 * 掃描目錄文件
 * @param {目錄} dir
 * @returns
 */
function scanCoreFolder(dir, app) {
  let _folder = path.resolve(__dirname, dir)
  if (!isDirExist(_folder)) {
    return;
  }

  try {
    let collection = {}
    const files = fs.readdirSync(_folder).filter(file => file !== 'index.js')

    if (dir === '../../config') {
      let env = process.env.NODE_ENV || 'dev'
      let oFileCnt = require(_folder + '/' + `config.${env}`)(app)
      collection = oFileCnt
      return collection
    }

    files.forEach((file) => {
      let filename = file.replace('.js', '')
      if (dir === '../../helper' || dir === '../../middleware') {
        let oFileCnt = require(_folder + '/' + filename)(app)
        collection[filename] = oFileCnt
      } else if (dir === '../../controller' || dir === '../../service') {
        let oFileCnt = require(_folder + '/' + filename)
        collection[filename] = new oFileCnt(app)
      } else {
        let oFileCnt = require(_folder + '/' + filename)
        collection[filename] = oFileCnt
      }

    })
    return collection
  } catch (error) {
    console.log(`${dir}掛載失敗`, error);
  }
}

module.exports = scanCoreFolder