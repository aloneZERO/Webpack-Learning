'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'development',
    entry: {
        index: './src/entry-client.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.ejs'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                useShortDoctype: true
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    watchOptions: {
        ignored: /node_modules/
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: '#source-map',
});