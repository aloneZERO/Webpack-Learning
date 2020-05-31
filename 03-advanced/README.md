## 自动清理构建目录

```sh
rm -rf ./dist && webpack

# or
rimraf ./dist && webpack
```

使用 webpack 插件 `clean-webpack-plugin`。

## 自动补齐 CSS3 前缀

- postcss-loader
- autoprefixer

## 自动转换 PX 为 REM

- px2rem-loader: 解析 vue 文件中的 less 报错，原因未知
- lib-flexible: 根据设备动态计算并设置根元素的 `font-size`
- postcss-pxtorem

## 静态资源内联

raw-loader 内联 html
```ejs
<%= {require('raw-loader!babel-loader!./meta.html') %>
```

raw-loader 内联 js
```ejs
<script><%= require('raw-loader!babel-loader!../node_modules/lib-flexible') %></script>
```

内联 css
- style-loader
- html-inline-css-webpack-plugin

## Source map

通过 source map 定位到源代码，开发环境开启，线上环境关闭。
- eval：使用 eval 包裹模块代码
- source map：产生 .map 文件
- cheap：不包含列信息
- inline：将 .map 作为 DataURI 嵌入，不单独生成 .map 文件
- module：包含 loader 的 sourcemap

## 提取公共资源
将 react、react-dom 或 vue 基础包通过 cdn 引入，不打入 bundle，使用 html-webpack-externals-Plugin。

利用 SplitChunksPlugin 进行公共脚本分离：Webpack4 内置，替代 CommonsChunkPlugin

chunks 参数说明：
- async 异步引入的库进行分离（默认）
- initial 同步引入的库进行分离
- all 所有引入的库进行分离（推荐）