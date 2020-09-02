const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

const sprites = [
    path.resolve(__dirname, './images/1.png'),
    path.resolve(__dirname, './images/2.png')
]

Spritesmith.run({src: sprites}, (err, res) => {
    if (err) throw err;
    console.log(res);
    fs.writeFile(path.resolve(__dirname, 'images/sprite.png'), res.image, (err) => {
        if (err) throw err;
    });
});
