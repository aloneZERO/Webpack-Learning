const path = require('path');
const glob = require('glob');
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Cssnano = require('cssnano');
// const TerserPlugin = require('terser-webpack-plugin');
// const HappyPack = require('happypack');
// const webpack = require('webpack');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const libraryManifest = require('./build/library/library.json');
const HardSourcePlugin = require('hard-source-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const baseConfig = require('./webpack.base');

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = merge(baseConfig, {
    mode: 'production',
    // stats: 'errors-only',
    plugins: [
        // new HappyPack({
        //     loaders: ['babel-loader', 'eslint-loader']
        // }),
        // new webpack.DllReferencePlugin({
        //     manifest: libraryManifest
        // }),
        // new AddAssetHtmlPlugin([
        //     { filepath: path.resolve(__dirname, 'build/library/library.dll.js') }
        // ])
        new HardSourcePlugin(),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css/g,
            cssProcessor: Cssnano
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*.vue`, { nodir: true }),
            whitelist: () => ['body']
        })
    ],
    optimization: {
        // minimizer: [
        //     new TerserPlugin({
        //         parallel: true,
        //         cache: true
        //     })
        // ],
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
