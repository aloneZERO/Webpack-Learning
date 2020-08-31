module.exports = function (source) {
    const json = JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028') // 处理行分隔符
        .replace(/\u2029/g, '\\u2029'); // 处理段落分隔符

    return `export default ${json}`;
}