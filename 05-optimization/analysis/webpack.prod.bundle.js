const path = require('path');
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Cssnano = require('cssnano');
const HtmlWebpacExternalsPlugin = require('html-webpack-externals-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('../webpack.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    stats: 'errors-only',
    entry: {
        index: path.resolve(__dirname, '../src/entry-client.js')
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css/g,
            cssProcessor: Cssnano
        }),
        // 如果不使用该插件，会很明显地看到 vue.js 占了构建包的大部分体积
        new HtmlWebpacExternalsPlugin({
            externals: [
                {
                    module: 'vue',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
                    global: 'Vue'
                }
            ]
        }),
        new BundleAnalyzerPlugin()
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
    }
});
