# webpack 常用插件和配置
整理一些常用的配置

## 插件列表
* [vue-loader](https://www.npmjs.com/package/vue-loader)  处理 .vue 文件
* [html-loader](https://www.npmjs.com/package/html-loader)  处理 .html 文件
* [css-loader](https://www.npmjs.com/package/css-loader)  处理 .css 文件
* [less-loader](https://www.npmjs.com/package/vue-loader)  处理 .less 文件
* [url-loader](https://www.npmjs.com/package/url-loader)  处理未被匹配的其他静态文件
* [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 让输出注入html的插件
* [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin) 将使用到的css提取为文件
* [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) 清除生成的dist包


## 通用配置
``` js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, '../index.js'),
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false,
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader?minimize=false',
            },
            {
                test: /\.(le|c)ss$/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name][hash:5].min.[ext]',
                            limit: 5000,
                            publicPath: '/fonts',
                            outputPath: '/fonts',
                            useRelativePath: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../index.html'),
            filename : `index.html`
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ],
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
        extensions: ['.js', '.vue', '.json'],
    },
};
```

## 区分webpack.dev和webpack.prod
对于测试环境和生产环境，webpack的配置会有些地方不同的。比如下面就是一个webpack.dev.js例子
``` js
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.common.js');

const prodConfig = {
	mode:'development',
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        port: 9528,
        open: true,
    },
}

module.exports = merge(baseConfig, prodConfig);
```

## 多入口项目配置代码案例
原理就是读取入口文件的地址生成数组，然后遍历，生成对应的 entry 对象和 HtmlWebpackPlugin 实例数组

``` js
const setMPA = ()=>{
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname,'../pages/*/index.js'))
    entryFiles.map((item)=>{
        const match = item.match(/pages\/(.*)\/index.js$/);
        const pageName = match && match[1];
        entry[pageName] = item;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template : path.join(__dirname,`../pages/${ pageName }/index.html`),
                filename : `${pageName}.html`,
                chunks: [pageName]
            })
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry,htmlWebpackPlugins } = setMPA();

module.exports = {
    ...entry,
    ...htmlWebpackPlugins,
    ...
}
```