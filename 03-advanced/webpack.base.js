'use strict';
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js?[hash:8]',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                require('postcss-pxtorem')({
                                    rootValue: 54,
                                    unitPrecision: 5,
                                    propList: ['*']
                                })
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'assets/[name].[ext]?[hash:8]',
                        esModule: false,
                        limit: 30720
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]?[hash:8]',
                    esModule: false
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css?[contenthash:8]'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css/g, // 此处不能使用 $，因为 css 是以问号哈希值结尾的
            cssProcessor: require('cssnano')
        })
    ]
}