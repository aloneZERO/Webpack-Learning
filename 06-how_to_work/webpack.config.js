// 非打包配置，用于分析 webpack 启动过程
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'production',
  target: 'node'
}
