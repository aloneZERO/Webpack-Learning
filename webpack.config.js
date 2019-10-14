const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // index: './src/index.js',
    // another: './src/another-module.js',
    // index: './src/index2.js',
    index: './src/index3.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js', // 动态导入
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    }),
  ],
  // optimization: {
  //   // webpack.optimize.CommonsChunkPlugin 插件弃用
  //   // webpack4 使用如下写法
  //   // 不启用该优化时，每次导入 lodash，都会将 lodash 写入 *.bundle.js
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
};
