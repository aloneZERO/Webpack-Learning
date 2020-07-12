'use strict';
const path = require('path');
// const HtmlWebpacExternalsPlugin = require('html-webpack-externals-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    stats: 'errors-only',
    entry: {
        index: './src/entry-client.js'
    },
    plugins: [
        // css 压缩
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css/g, // 此处不能使用 $，因为 css 是以问号哈希值结尾的
            cssProcessor: require('cssnano')
        }),
        // new HtmlWebpacExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'vue',
        //             entry: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        //             global: 'Vue'
        //         }
        //     ]
        // })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
        // splitChunks: {
        //     minSize: 0,
        //     cacheGroups: {
        //         commons: {
        //             name: 'commons',
        //             chunks: 'all',
        //             minChunks: 2
        //         }
        //     }
        // }
    }
});
