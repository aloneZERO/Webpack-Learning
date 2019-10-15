const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * main bundle 会随着自身的新增内容的修改，而发生变化。
 * vendor bundle 会随着自身的 module.id 的修改，而发生变化。
 * runtime bundle 会因为当前包含一个新模块的引用，而发生变化。
 */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js', // 确保文件修改后，浏览器获取到新文件，而不是缓存
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Caching'
    })
  ],
  // webpack.optimize.CommonsChunkPlugin 弃用
  // webpack4 写法
  optimization: {
    moduleIds: 'hashed', // 保证文件修改时，vendor hash 不变
    runtimeChunk: 'single', // 保证文件未修改时，文件名不变（hash一致），从让浏览器可以命中缓存
    splitChunks: {
      // 提取第三方依赖到单独的文件
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  }
};