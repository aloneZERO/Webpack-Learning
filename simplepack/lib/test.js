const { getAST, getDependencies, transform } = require('./parser');
const path = require('path');

let ast = getAST(path.resolve(__dirname, '../src/index.js'));
console.log(ast);

let dependencies = getDependencies(ast);
console.log(dependencies);

let source = transform(ast);
console.log(source);
