const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');

module.exports = function (source) {
    // console.log(this);

    const callback = this.async();
    const imgs = source.match(/url\((\S*)\?__sprite\)/g);
    const matchedImgs = [];

    let dir = path.dirname(this.resourcePath);
    for (let i=0; i < imgs.length; i++) {
        const img = imgs[i].match(/url\((\S*)\?__sprite\)/)[1];
        matchedImgs.push(path.resolve(dir, img));
    }

    Spritesmith.run({
        src: matchedImgs
    }, (err, res) => {
        if (err) throw err;
        // console.log(res);

        fs.writeFileSync(path.resolve(__dirname, '../dist/sprite.png'), res.image);

        let coordinates = Object.keys(res.coordinates).map(k => res.coordinates[k]);
        for (let pos of coordinates) {
            source = source.replace(
                /url\((\S*)\/(\S*\.(png|jpg))\?__sprite\);/, 
                `url(./sprite.png);\nbackground-position: -${pos.x}px -${pos.y}px;`
            );
        }
        // source = source.replace(/url\((\S*)\/(\S*\.(png|jpg))\?__sprite\)/g, 'url(./sprite.png)');

        let fileName = loaderUtils.interpolateName(this, '[name].[ext]', {});
        fs.writeFileSync(path.resolve(__dirname, `../dist/${fileName}`), source);
        callback(null, source);
    });
}
