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

## 进一步分包：预编译资源

之前已使用过的 externals，将基础包通过 CDN 引入。

更好的方法：将基础包和业务基础包打成一个文件。使用 DllPlugin 分包，DllReferencePlugin 对 mainifest.json 引用，最后通过 add-asset-html-webpack-plugin 将基础包导入 html。

和 webpack 提供的 splitChunks 类似，不同是 Dll 分包只需执行一次即可。splitChunks 和 DllPlugin 可以一起用。

## 利用缓存提升二次构建速度

babel-loader 开启缓存（效果明显）。

terser-webpack-plugin 开启缓存（手动创建 minimizer 反而拖慢了速度）。

使用 cache-loader 或者 hard-source-webpack-plugin（效果明显）。

## 缩小构建目标

目的：尽可能的少构建模块

比如：babel-loader 不解析 node_modules

减少文件搜索范围
- 优化 resolve.modules 配置（减少模块搜索层级）
- 优化 resolve.mainFields 配置
- 优化 resolve.extensions 配置
- 合理使用 alias

## Tree Shaking

利用树摇优化的思想将无用的 css 删除掉。

PurifyCSS（不在维护）：遍历代码，识别已经用到的 css class。

uncss：html 需要通过 jsdom 加载，所有的样式通过 postcss 解析，通过 document.querySelector 来识别在 html 文件里面不存在的选择器。

purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用。

注意：当样式写在 vue 文件里时，purgecss-webpack-plugin 无法擦除无用样式。只有把样式提取出来（如 App.less），purgecss-webpack-plugin 才会正常处理。

## 图片压缩

基于 Node 库的 imagemin 或者 tinypng API。

imagemin 对应的有 image-webpack-loader。

## 动态 polyfill

目的：构建体积优化。

| 方案 | 优点 | 缺点 | 采用 |
| - | - | - | - |
| babel-polyfill | React16 官方推荐 | 1. 包体积200k+，难以单独抽离 Map、Set；<br>2. 若 react 通过 cdn 引用，如果用它，则需要单独构建一份放在 react 前加载 | 否 |
| babel-plugin-transform-runtime | 只 polyfill 用到的类或方法，相对体积较小 | 不能 polyfill 原型上的方法，不适用于业务项目的复杂开发环境 | 否 |
| 自己写 Map、Set 的 polyfill | 定制化高、体积小 | 1. 重复造轮子；<br>2. 即使体积小，依然所有用户都要加载 | 否 |
| polyfill-service | 只给用户返回需要的 polyfill，社区维护 | 部分国内浏览器 UA 可能无法识别（但可以降级返回所需全部 polyfill） | 是 |

polyfill-service 原理：识别 user-agent，下发不同的 polyfill。

官方提供的服务
```html
<script src="https://cdn.polyfill.io/v3/polyfill.min.js"></script>
```

或者根据官方的开源服务，自建自己的定制化服务。
