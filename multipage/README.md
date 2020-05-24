## 多页面打包

```js
module.exports = {
    entry: glob.sync(path.join(__dirname, './src/*/index.js'))
}
```