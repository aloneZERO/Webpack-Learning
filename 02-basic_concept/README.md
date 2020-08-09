## Loaders

处理 webpack 不能直接支持的文件。

### 常见的 loaders

| 名称 | 描述 | 
| - | - |
| babel-loader | 转换新特性语法 |
| css-loader | 支持 css 文件的加载和解析 |
| less-loader | 将 less 文件转换成 css |
| ts-loader | 将 TS 转换成 JS |
| file-loader | 进行图片、字体等的打包 |
| raw-loader | 将文件以字符串的形式导入 |
| thread-loader | 多进程打包 JS 和 CSS |

## Plugins

优化 bundle 文件，资源管理和环境变量注入，作用于整个构建过程。

### 常见的 plugins

| 名称 | 描述 |
| - | - |
| CommonsChunkPlugin | 将 chunks 相同的模块代码提取成公共 js |
| CleanWebpackPlugin | 清理构建目录 |
| ExtractTextWebpackPlugin | 将 css 从 bundle 文件里提取成一个独立的 css 文件 |
| CopyWebpackPlugin | 将文件或者文件拷贝到构建的输出目录 |
| HtmlWebpackPlugin | 创建 html 文件去承载输出的 bundle |
| UglifyjsWebpackPlugin | 压缩 js |
| ZipWebpackPlugin | 将打包出的资源生成一个 zip 包 |

 ## Mode

 指定当前的构建环境：
  - production：默认值
  - development
  - none

| 选项 | 描述 |
| - | - |
| development | 设置 `process.env.NODE_ENV` 的值为 development。开启 NamedChunksPlugin 和 NamedModulesPlugin
| production | 设置 `process.env.NODE_ENV` 的值为 production。开启 FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、NoduleConcatenationPlugin、NoEmitOnErrorsPlugin、OccurrenceOrderPlugin、SideEffectsFlagPlugin 和 TerserPlugin
| none | 不开启任何优化选项

## 文件监听的原理

轮询判断文件的最后编辑时间是否变化？某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout。

```js
module.export = {
    // 默认 false 不开启
    watch: true,
    // 只有开启监听模式，watchOptions 才有效
    watchOptions: {
        // 不监听的文件或者文件夹，默认为空
        ignored: /node_modules/,
        // 监听到变化发生后等 300ms 再去执行，默认 300ms
        aggregateTimeout: 300,
        // 轮询，默认每秒 1000 次
        poll: 1000
    }
}
```

## 热更新的原理

hmr：hot module replacement.

- webpack compile：将 js 编译成 bundle
- hmr server：将热更新的文件输出给 hmr runtime
- bundle server：提供文件在浏览器的访问
- hmr runtime：会被注入到浏览器，更新文件的变化
- bundle.js：构建输出的文件

## 文件指纹

- Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
- Chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值
- Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

file-loader 里指定的 hash 和上述不同，它是文件内容的 hash，默认是 md5 生成。