# Webpack 打包原理

## webpack 启动过程分析

执行 npm script 后，npm 会让命令行工具进入 `node_modules/.bin` 目录查找是否存在 webpack.sh 或者 webpack.cmd 文件，如果存在就执行，不存在就抛出错误。

实际入口文件：
```sh
node_modules/webpack/bin/webpack.js
```

分析 webpack 入口文件：webpack.js
```js
process.exitCode = 0;                                       // 1.正常执行返回
const runCommand = (command, args) => {};                   // 2.运行某个命令
const isInstalled = packageName => {};                      // 3.判断某个包是否安装
const CLIs = [];                                            // 4.webpack 可用的 CLI：webpack-cli 和 webpack-command
const installedClis = CLIs.filter(cli => cli.installed);    // 5.判断是否两个 cli 已安装
if (installedClis.length===0) {}                            // 6.根据安装数量进行处理
else if (installedClis.length===1) {}
else {}
```

启动后的结果：webpack 最终找到 webpack-cli（或 webpack-command）这个 npm 包，并且执行 cli。

## webpack-cli 做了哪些事情？

1.引入 yargs，对命令进行定制。

2.分析命令行参数，对各个参数进行转换，组成编译配置项。

3.引用 webpack，根据配置项进行编译和构建。

## webpack 的本质

webpack 可以将其理解是一种基于事件流的编程范例，一系列的插件运行。

核心对象 `Compiler` 和 `Compilation` 均继承自 `Tapable`。

### Tapable 是什么？

Tapable 是一个类似于 node.js 的 EventEmitter 的库，主要是控制钩子函数的发布与订阅，控制着 webpack 的插件系统。

Tapable 暴露了很多 Hook 类，为插件提供挂载的钩子
```js
const {
	SyncHook,                   // 同步钩子
	SyncBailHook,               // 同步熔断钩子
	SyncWaterfallHook,          // 同步流水钩子
	SyncLoopHook,               // 同步循环钩子
	AsyncParallelHook,          // 同步并发钩子
	AsyncParallelBailHook,      // 同步并发熔断钩子
	AsyncSeriesHook,            // 同步串行钩子
	AsyncSeriesBailHook,        // 同步串行熔断钩子
	AsyncSeriesWaterfallHook    // 同步串行流水钩子
 } = require("tapable");
```

| 类型 | 功能 |
| - | - |
| Hook | 所有钩子的后缀 |
| Waterfall | 同步方法，但是它会传值给下一个函数 |
| Bail | 熔断：当函数有任何返回值，就会在当前执行函数停止 |
| Loop | 监听函数返回 true 表示继续循环，返回 undefined 表示结束循环 |
| Sync | 同步方法 |
| AsyncSeries | 异步串行 |
| AsyncParallel | 异步并行 |

Tapable - Hook 基本用法示例
```js
const hook = new SyncHook(["arg1", "arg2", "arg3"]);

// 绑定事件到事件流
hook.tap('start', (arg1, arg2, arg3) => console.log(arg1, arg2, arg3));

// 执行绑定的事件
hook.call(1, 2, 3);
```

## Tapable 是如何和 webpack 联系起来的？

编写 webpack 插件必须提供一个 apply 方法，参数是 webpack 生成的 compiler 对象。在 apply 方法里，通过监听一些 tapable hook 来实现插件的具体功能。

## webpack 流程：准备阶段

webpack 的编译按照如下的钩子调用顺序执行：
1. entry-option：初始化 option
2. run：开始编译
3. make：从 entry 开始递归的分析依赖，对每个依赖模块进行 build
4. before-resolve：对模块位置进行解析
5. build-module：开始构建某个模块
6. normal-module-loader：将 loader 加载完成的 module 进行编译，生成 AST 树
7. program：遍历 AST，当遇到 require 等一些调用表达式时，收集依赖
8. seal：所有依赖 build 完成，开始优化
9. emit：输出到 dist 目录

### WebpackOptionsApply 对象

将所有的配置 options 参数转换成 webpack 内部插件，并使用默认插件列表

例如：
- output.library -> LibraryTemplatePlugin
- externals -> ExternalsPlugin
- devtool -> EvalDevtoolModulePlugin, SourceMapDevToolPlugin
- AMDPlugin, CommonJsPlugin
- RemoveEmptyChunksPlugin

## webpack 流程：模块构建和 chunk 生成阶段

### Compiler hooks

流程相关：
- (before-)run
- (before-/after-)compile
- make
- (after-)emit
- done

监听相关：
- watch-run
- watch-close

### Compilation hooks

模块相关：
- build-module
- failed-module
- succeed-module

优化和 seal 相关：
- (after-)seal
- optimize
- optimize-modules(-basic/advanced)
- after-optimize-modules
- after-optimize-chunk
- after-optimize-tree
- optimize-chunk-modules(-basic/advanced)
- after-optimize-chunk-modules
- optimize-module/chunk-order
- before-module/chunk-ids
- (after-)optimize-module/chunk-ids
- before/after-hash

资源生成相关：
- module-asset
- chunk-asset

### Chunk 生成算法

1. webpack 先将 entry 中对应的 module 都生成一个新的 chunk
2. 遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中
3. 如果一个依赖 module 是动态引入的模块，那么就会根据这个 module 创建一个新的 chunk，继续遍历依赖
4. 重复上面的过程，直至得到所有的 chunks

## webpack 流程：文件生成


