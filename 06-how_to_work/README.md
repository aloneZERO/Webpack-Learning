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
