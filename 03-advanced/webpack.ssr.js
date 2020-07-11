'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

baseConfig.plugins.pop();
module.exports = merge(baseConfig, {
    mode: 'production',
    target: 'node',
    entry: {
        index: './src/entry-server.js'
    },
    output: {
        filename: '[name]-server.js',
        libraryTarget: 'umd'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.ejs'),
            filename: 'template.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false, // ssr需要注释作为占位符
                useShortDoctype: true
            }
        }),
    ]
});
