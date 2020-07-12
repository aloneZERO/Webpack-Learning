const path = require('path');
const glob = require('glob');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const PostcssPxtorem = require('postcss-pxtorem');

const projectRoot = process.cwd();

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

    Object.keys(entryFiles)
        .forEach((index) => {
            const entryFile = entryFiles[index];
            const pageName = entryFile.match(/src\/(.*)\/index\.js/)[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.resolve(projectRoot, `src/${pageName}/index.ejs`),
                    filename: `${pageName}.html`,
                    chunks: [pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: true,
                        useShortDoctype: true,
                    },
                }),
            );
        });

    return {
        entry,
        htmlWebpackPlugins,
    };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: '[name].js?[hash:8]',
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                Autoprefixer(),
                                PostcssPxtorem({
                                    rootValue: 54,
                                    unitPrecision: 5,
                                    propList: ['*'],
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'assets/[name].[ext]?[hash:8]',
                        esModule: false,
                        limit: 30720,
                    },
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]?[hash:8]',
                    esModule: false,
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css?[contenthash:8]',
        }),
        function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors
                    && stats.compilation.errors.length
                    && process.argv.indexOf('--watch') === -1) {
                    process.exit(1);
                }
            });
        },
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only',
};
