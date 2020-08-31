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
