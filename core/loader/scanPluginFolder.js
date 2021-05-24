/**
 * @ Author: firstfu
 * @ Create Time: 2021-05-19 19:16:39
 * @ Description: 掃描Plugin目錄
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
function scanPluginFolder(dir, app) {
  try {
    let collection = {}
    let pluginLst = require(dir)
    for (const [pluginName, plugin] of Object.entries(pluginLst)) {
      let package = require(plugin.package)
      collection[plugin.aliasName] = package
    }
    return collection
  } catch (error) {
    console.log(`${dir}掛載失敗`, error);
  }
}

module.exports = scanPluginFolder