const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');

module.exports = function (source) {
    const { name } = loaderUtils.getOptions(this);
    console.log('name:', name);

    const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028') // 处理行分隔符
        .replace(/\u2029/g, '\\u2029'); // 处理段落分隔符

    // 同步 loader
    // return `export default ${json}`;

    // 抛异常
    // this.callback(new Error('err'), json);

    // 异步处理
    const callback = this.async();
    fs.readFile(path.resolve(__dirname, './meta.txt'), 'utf-8', (err, data) => {
        if (err) {
            return callback(err, '');
        }
        callback(null, `${data}: ${json}`);
    });
}