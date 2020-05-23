## 自动清理构建目录

```sh
rm -rf ./dist && webpack

# or
rimraf ./dist && webpack
```

使用 webpack 插件 `clean-webpack-plugin`。

## 自动补齐 CSS3 前缀

- postcss-loader
- autoprefixer

## 自动转换 PX 为 REM

- px2rem-loader: 解析 vue 文件中的 less 报错，原因未知
- lib-flexible: 根据设备动态计算并设置根元素的 `font-size`
- postcss-pxtorem

## 静态资源内联

raw-loader 内联 html
```ejs
<%= {require('raw-loader!babel-loader!./meta.html') %>
```

raw-loader 内联 js
```ejs
<script><%= require('raw-loader!babel-loader!../node_modules/lib-flexible') %></script>
```

内联 css
- style-loader
- html-inline-css-webpack-plugin