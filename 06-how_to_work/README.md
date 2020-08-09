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

 类型 | 功能
 - | -
Hook | 所有钩子的后缀
Waterfall | 同步方法，但是它会传值给下一个函数
Bail | 熔断：当函数有任何返回值，就会在当前执行函数停止
Loop | 监听函数返回 true 表示继续循环，返回 undefined 表示结束循环
Sync | 同步方法
AsyncSeries | 异步串行
AsyncParallel | 异步并行

Tapable - Hook 基本用法示例
```js
const hook = new SyncHook(["arg1", "arg2", "arg3"]);

// 绑定事件到事件流
hook.tap('start', (arg1, arg2, arg3) => console.log(arg1, arg2, arg3));

// 执行绑定的事件
hook.call(1, 2, 3);
```
