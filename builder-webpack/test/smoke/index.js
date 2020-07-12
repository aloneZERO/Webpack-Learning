/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');

// 一定要在加载配置前，变更 node 的当前工作目录
process.chdir(path.join(__dirname, 'template'));
const prodConfig = require('../../lib/webpack.prod');

const Mocha = require('mocha');
const mocha = new Mocha({
    timeout: '10000ms'
});

rimraf('./dist', () => {
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
        }));

        console.log('\nWebpack build success, begin run test.');
        mocha.addFile(path.resolve(__dirname, 'html-test.js'));
        mocha.addFile(path.resolve(__dirname, 'css-js-test.js'));
        mocha.run();
    });
});
