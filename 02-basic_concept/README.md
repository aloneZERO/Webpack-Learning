## Loaders

处理 webpack 不能直接支持的文件。

### 常见的 loaders

 名称 | 描述  
 - | - 
babel-loader | 转换新特性语法
css-loader | 支持 css 文件的加载和解析
less-loader | 将 less 文件转换成 css
ts-loader | 将 TS 转换成 JS
file-loader | 进行图片、字体等的打包
raw-loader | 将文件以字符串的形式导入
thread-loader | 多进程打包 JS 和 CSS

## Plugins

优化 bundle 文件，资源管理和环境变量注入，作用于整个构建过程。

### 常见的 plugins

名称 | 描述
 - | -
 CommonsChunkPlugin | 将 chunks 相同的模块代码提取成公共 js
 CleanWebpackPlugin | 清理构建目录
 ExtractTextWebpackPlugin | 将 css 从 bundle 文件里提取成一个独立的 css 文件
 CopyWebpackPlugin | 将文件或者文件拷贝到构建的输出目录
 HtmlWebpackPlugin | 创建 html 文件去承载输出的 bundle
 UglifyjsWebpackPlugin | 压缩 js
 ZipWebpackPlugin | 将打包出的资源生成一个 zip 包

 ## Mode

 指定当前的构建环境：
  - production：默认值
  - development
  - none

选项 | 描述
 - | - 
development | 设置 `process.env.NODE_ENV` 的值为 development。开启 NamedChunksPlugin 和 NamedModulesPlugin
production | 设置 `process.env.NODE_ENV` 的值为 production。开启 FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、NoduleConcatenationPlugin、NoEmitOnErrorsPlugin、OccurrenceOrderPlugin、SideEffectsFlagPlugin 和 TerserPlugin
none | 不开启任何优化选项