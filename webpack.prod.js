const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        // 设置 model 为生产模式后，以下插件自动启用
        // new UglifyJSPlugin({}),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // })
        // ...... 更详细的启用插件，请查阅官方文档-概念-模式章节
    ]
});