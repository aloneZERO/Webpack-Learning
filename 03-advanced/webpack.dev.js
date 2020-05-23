'use strict';
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
    search: './src/search.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
    //   {
    //     test: /\.(png|jpg|gif|jpeg)$/,
    //     loader: 'file-loader',
    //     options: {
    //         name: 'assets/[name].[ext]?[hash:10]',
    //         esModule: false
    //     }
    //   },
      {
        // 小于限制的图片打成 base64，
        // 大于限制的图片自动交给 file-loader 处理
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
            loader: 'url-loader',
            options: {
                name: 'assets/[name].[ext]?[hash:10]',
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
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: '#source-map',
  watchOptions: {
      ignored: /node_modules/
  },
  devServer: {
      contentBase: '.',
      hot: true
  }
}