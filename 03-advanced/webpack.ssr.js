'use strict';
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    target: 'node',
    entry: {
        index: './src/entry-server.js'
    },
    output: {
        filename: '[name]-server.js',
        libraryTarget: 'umd'
    }
});
