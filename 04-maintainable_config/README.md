# 可维护的构建配置

代码见目录：`builder-webpack`

## 构建配置抽离成 npm 包

通用性
- 业务开发者无需关注构建配置
- 统一团队构建脚本

可维护性
- 构建配置合理的拆分
- README 文档、ChangeLog 文档等

质量
- 冒烟测试、单元测试、测试覆盖率
- 持续集成

## 构建配置管理的可选方案

1. 多个配置文件管理不同环境的构建，`webpack --config` 参数进行控制
2. 将配置设计成一个库
3. 抽成一个工具进行管理
4. 将所有的配置放在一个文件，通过 `--env` 参数控制分支选择

## 构建配置包设计

多个配置文件管理不同环境
- 基础配置：webpack.base.js
- 开发环境：webpack.dev.js
- 生产环境：webpack.prod.js
- SSR环境：webpack.ssr.js

抽离成一个 npm 包统一管理
- 规范：git commit 日志、README、eslint 规范、semver 规范
- 质量：冒烟测试、单元测试、测试覆盖率和 CI

### 通过 `webpack-merge` 组合配置

```js
const merge = require('webpack-merge')
merge(
    {a:[1], b:5, c:20},
    {a:[2], b:10, d:421}
)
// {a:[1,2], b:10, c:20, d:421}
```

> 可参考 vue-cli2 webpack 模板的设计

## 冒烟测试（smoke testing）

冒烟测试：对提交测试的软件进行详细深入的测试之前而进行的预测试，这种预测试的主要目的是暴露导致软件需重新发布的基本功能失效等严重问题。

针对 `builder-webpack` 的冒烟测试
- 构建是否成功
- 每次构建完成 build 目录是否有内容输出
