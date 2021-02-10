# eslint 常用插件和配置
整理一些常用的配置

## 所需库
* [eslint](https://www.npmjs.com/package/eslint)  基础
* [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)  用于加载插件

## 插件列表
* [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)  处理 .js 文件规范
* [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)  处理 .vue 文件规范



## 常用配置
.eslintrc.js 自用的常用安装与配置，最基础的配置。
``` dos
npm i eslint eslint-plugin-import eslint-config-airbnb-base eslint-plugin-vue -D
```

``` javascript
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
```
