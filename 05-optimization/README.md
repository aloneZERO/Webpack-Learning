# 构建速度和体积优化

## 内置的 stats

构建的统计信息

```sh
webpack --env production --json > stats.json
```

缺点：颗粒度太粗，不容易看出问题。

## 速度分析

```js
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasureWebpackPlugin()
module.exports = smp.wrap(webpackConfig)
```

分析整个打包总耗时和每个 loader 和插件执行的耗时。

## 体积分析

```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
}
```

构建完成后会在 8888 端口展示体积分析结果。

## 使用高版本

高版本的 webpack 和 node.js 使构建时间降低了 60%-98%！

webpack4 优化原因：
- V8 的优化（for of 替代 forEach、Map 和 Set 替代 Object、includes 替代 indexOf）
- 默认使用更快的 md4 hash 算法
- webpacks AST 可直接从 loader 传递给 AST，减少解析时间
- 使用字符串方法替代正则表达式

## 多进程/多实例构建

HappyPack：每次 webpack 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中。

thread-loader：原理同 HappyPack，由 webpack 官方提供。

本项目使用 HappyPack 和 thread-loader 反而变慢了......猜测其更适用于优化多页面打包。

## 多进程并行压缩代码

方法一：使用 webpack-parallel-uglify-plugin 插件。

方法二：使用 uglifyjs-webpack-plugin 开启 parallel 参数（不支持 ES6 语法压缩）。

方法三：使用 terser-webpack-plugin 开启 parallel 参数。

