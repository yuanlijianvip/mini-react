/*
 * @Description: 
 * @version: 
 * @Author: yuanlijian
 * @Date: 2022-01-06 10:58:16
 * @LastEditors: yuanlijian
 * @LastEditTime: 2022-01-06 11:01:57
 */
const { override, addBabelPlugin } = require('customize-cra');
module.exports = override(
    addBabelPlugin([
        "@babel/plugin-proposal-decorators", { "legacy": true }
    ])
);
