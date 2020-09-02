const loaderUtils = require('loader-utils');

module.exports = function(source) {
    console.log('Loader-B is executed!');

    const url = loaderUtils.interpolateName(this, '[name]_[hash:8].[ext]', {content: source});
    console.log(url);
    this.emitFile(url, source);

    return source;
}