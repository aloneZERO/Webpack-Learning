'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpacExternalsPlugin = require('html-webpack-externals-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    // mode: 'none',
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
