const fs = require('fs');
const path = require('path');
const { runLoaders } = require('loader-runner');

runLoaders(
    {
        resource: path.resolve(__dirname, './test/index.css'),
        loaders: [
            path.resolve(__dirname, 'src/sprite-loader.js')
        ],
        readResource: fs.readFile.bind(fs)
    },
    (err, res) => {
        if (err) throw err
        console.log(res.result);
    }
);
