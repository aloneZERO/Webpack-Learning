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

## 单元测试与测试覆盖率

- 技术选型：Mocha + Chai
- 测试代码：describe，it，except
- 测试命令：mocha add.test.js
- 测试覆盖率：istanbul

```js
const { expect } = require('chai')
const add = require('./add')
describe('use expect: add.js', () => {
    it('add(1,2)===3', () => {
        expect(add(1,2)).to.equal(3)
    })
})
```

## 持续集成

- 快速发现错误
- 防止分支大幅偏离主干

核心措施：代码集成到主干之前，必须通过自动化测试。只要有一个测试永例失败，就不能集成。

travis.yml 文件内容
- install 安装项目依赖
- script 运行测试用例

## 发布到 NPM

添加用户：npm adduser

升级版本：
- 升级补丁版本号：npm version patch
- 升级小版本号：npm version minor
- 升级大版本号：npm version major

发布版本：
1. npm login
2. npm publish

## Commit 规范和 Changelog 的生成

提交格式要求：
```html
<type>(<scope>): <subject>
<BLANK_LINE>
<body>
<BLANK_LINE>
<footer>
```

type 详细说明：

- feat：新增 feature
- fix：修复 bug
- docs：仅修改了文档，比如 README，CHANGELOG，CONTRIBUTE 等
- style：仅修改了空格、格式缩进、逗号等，不改变代码逻辑
- refactor：代码重构，没有加新功能或者修复 bug
- perf：优化相关，比如提升性能、体验
- test：测试用例，包括单元测试、集成测试等
- revert：回滚到上一个版本
- build：改变构建流程，或者增加依赖、工具等
- ci：修改持续集成流程
- chore：其他

```sh
npm i -D husky
npm i -D conventional-changelog-cli
```

通过 commitmsg 钩子校验信息
```json
{
    "scripts": {
        "commitmsg": "validate-commit-msg",
        "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
    }
}
```