# 编写 loader 和插件

## loader 的链式调用和执行顺序

定义：loader 只是一个导出为函数的 JavaScript 模块。

```js
module.exports = function (source) {
    return source;
}
```

多个 loader 的串行执行：顺序从后到前

```js
{
    use: [
        'style-loader',
        'css-loader',
        'less-loader'
    ] 
}
```

处理结果传递顺序：less-loader -> css-loader -> style-loader

webpack 采用的函数组合方式：
```js
compose = (f, g) => (...args) => f(g(...args));
```

## loader-runner

`loader-runner` 允许你在不安装 webpack 的情况下运行 loaders。
- 作为 webpack 的依赖，webpack 中使用它执行 loader
- 进行 loader 的开发和调试

## 更复杂的开发场景

webpack 默认开启 loader 缓存
- 可使用 `this.cacheable(false)` 关掉缓存

缓存条件：loader 的结果在相同的输入下有确定的输出
- 有依赖的 loader 无法使用缓存

### loader 如何进行文件输出？

通过 `this.emitFile` 进行文件输出。

## 插件基本结构

插件没有像 loader 那样的独立运行环境，只能在 webpack 里面运行。

```js
// 基本结构
class MyPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('my plugin', stats => {
            console.log('Hello World')
        })
    }
}
module.exports = MyPlugin

// 插件使用
{
    plugins: [new MyPlugin]
}
```

## 复杂的插件开发场景

### 错误处理

参数校验阶段直接 throw 错误。

通过 compilation 对象的 warnings 和 errors 接收
```js
compilation.warnings.push('warning')
compilation.errors.push('error')
```

### 编写插件的插件

插件本身也可以通过暴露 hooks 的方式进行自身扩展，以 html-webpack-plugin 为例
- html-webpack-plugin-after-chunks (sync)
- html-webpack-plugin-before-html-generation (async)
- html-webpack-plugin-after-asset-tags (async)
- html-webpack-plugin-after-html-processing (async)
- html-webpack-plugin-after-emit (async)
