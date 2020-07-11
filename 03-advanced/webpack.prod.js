'use strict';
const path = require('path');
// const HtmlWebpacExternalsPlugin = require('html-webpack-externals-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    stats: 'errors-only',
    entry: {
        index: './src/entry-client.js'
    },
    plugins: [
        // new HtmlWebpacExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'vue',
        //             entry: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
        //             global: 'Vue'
        //         }
        //     ]
        // })
        function() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors 
                    && stats.compilation.errors.length
                    && process.argv.indexOf('--watch')==-1) 
                {
                    console.log('build error');
                    process.exit(1);
                }
            })
        }
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
