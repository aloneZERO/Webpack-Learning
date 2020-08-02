/* eslint-disable */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
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
                    // 'happypack/loader'
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
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
                    }
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
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        optipng: {
                            enabled: false
                        },
                        pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false
                        },
                        webp: {
                            quality: 75
                        }
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
        new FriendlyErrorsWebpackPlugin(),
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors
                    && stats.compilation.errors.length
                    && process.argv.indexOf('--watch') === -1) {
                    console.log('build error');
                    process.exit(1);
                }
            })
        },
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.ejs'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                useShortDoctype: true
            }
        })
    ],
    // resolve: {
    //     alias: {
    //         vue: path.resolve(__dirname, './node_modules/vue/dist/vue.runtime.common.js')
    //     },
    //     extensions: ['.js'],
    //     mainFields: ['main']
    // }
}
