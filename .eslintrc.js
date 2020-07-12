/*
 * @Author: your name
 * @Date: 2020-07-11 10:41:17
 * @LastEditTime: 2020-07-12 14:36:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /all-mine/.eslintrc.js
 */
module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
    rules: {
        'global-require': 0,
        indent: ['error', 4],
    },
};
