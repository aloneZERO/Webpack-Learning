const path = require('path');
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Cssnano = require('cssnano');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const baseConfig = require('../webpack.base');

const prodConfig = merge(baseConfig, {
    mode: 'production',
    stats: 'errors-only',
    entry: {
        index: path.resolve(__dirname, '../src/entry-client.js')
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css/g,
            cssProcessor: Cssnano
        })
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

const smp = new SpeedMeasureWebpackPlugin();
module.exports = smp.wrap(prodConfig);
