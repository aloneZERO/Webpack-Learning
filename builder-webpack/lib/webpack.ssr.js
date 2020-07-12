const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpacExternalsPlugin = require('html-webpack-externals-plugin');
const Cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const ssrConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'ignore-loader',
            },
            {
                test: /\.less$/,
                use: 'ignore-loader',
            },
        ],
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css/g,
            cssProcessor: Cssnano,
        }),
        new HtmlWebpacExternalsPlugin({
            externals: [
                {
                    module: 'vue',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
                    global: 'Vue',
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                },
            },
        },
    },
};

module.exports = merge(baseConfig, ssrConfig);
