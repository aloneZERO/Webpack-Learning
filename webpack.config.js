const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.css$/, // 正则匹配文件后缀名
      use: [ // css 文件都交给这两个 loader 处理
        'style-loader',
        'css-loader'
      ]
    }]
  }
};