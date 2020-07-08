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

## Tree Shaking
概念：1个模块可能有多个方法，只要其中某个方法使用到了，则整个文件都会被打到 bundle 里面，tree shaking 就是只把用到的方法打入 bundle，没用到的方法会在 uglify 阶段擦除掉。

使用：webpack 默认支持，在 `.babelrc` 里设置 `modules:false` 即可。production 模式下默认开启。

要求：必须是 ES6 模块语法，CommonJS 方式不支持。

原理：利用 ES6 模块的特点：
- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是不可变的

## Scope Hoisting
问题背景：打包后大量函数闭包包裹代码，导致体积增大。运行代码时创建的函数作用域变多，内存开销变大。

原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突。

对比：通过 scope hoisting 可以减少函数声明和内存开销。

使用：ModuleConcatenationPlugin，production 模式默认开启，必须 ES6 模块语法。

## 代码分割
webpack 可以将你的代码库分割成 chunks，当代码运行到需要它们的时候再进行加载。

适用场景：
- 抽离相同代码到一个共享块
- 脚本懒加载，使得初始下载代码更小

懒加载 JS 方式
- CommonJS：`require.ensure`
- ES6：`import()`（需要 babel 转换）

```sh
npm i -D @babel/plugin-syntax-dynamic-import
```

```js
{
    "plugins":["@babel/plugin-syntax-dynamic-import"]
}
```

## ESLint

- eslint-plugin-vue
- eslint-config-airbnb

## SSR
页面打开过程：
1. 开始加载
2. HTML加载成功，开始加载数据
3. 数据加载成功，渲染成功，加载图片资源
4. 图片加载成功，页面可交互

服务端：
- 所有模板等资源都存储在服务端
- 内网机器拉取数据更快
- 一个HTML返回所有数据

服务端渲染的核心是减少请求。