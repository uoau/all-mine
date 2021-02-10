/*
 * @Author: xux
 * @Date: 2020-07-07 22:21:28
 * @Description: webpack config file
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '../index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../../docs'),
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
            {
                test: /\.png|jpe?g|gif/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            esModule: false,
                        },
                    },
                    'img-loader',
                ],
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
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@packages': path.join(__dirname, '../../packages'),
            '@': path.join(__dirname, '../../packages'),
        },
        extensions: ['.js', '.vue', '.json'],
    },
    devServer: {
        contentBase: path.join(__dirname, '../../docs'),
        port: 9527,
        open: true,
    },
};
