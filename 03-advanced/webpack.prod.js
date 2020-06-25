'use strict';
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpacExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
    mode: 'production',
    // mode: 'none',
    entry: {
        index: './src/main.js'
    },
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
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css?[contenthash:8]'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css/g, // 此处不能使用 $，因为 css 是以问号哈希值结尾的
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.ejs'),
            filename: 'index.html',
            chunks: [
                'index', 
                'vendors',
                'commons'
            ],
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
}
