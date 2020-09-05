const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        'large-number': './src/index.js',
        'large-number.min': './src/index.js',
    },
    output: {
        filename: '[name].js',
        library: 'large-number',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}