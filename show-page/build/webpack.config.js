/*
 * @Author: xux
 * @Date: 2020-07-07 22:21:28
 * @Description: webpack config file
 */

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '../index.js'),
    output: {
        filename: 'bundle.js',
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
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            preserveWhitespace: false,
                        },
                    },
                    {
                        loader: path.join(__dirname, './md-loader/index.js'),
                    },
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
};
