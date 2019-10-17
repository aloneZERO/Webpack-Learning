// ES6的 import 和 export 一定是要在最外层，不能被包含在函数或是代码块中
// 所以此时使用 imports-loader 处理 index.js 会报错
// 改用 import() 或 require()
// import { file, parse } from './globals.js';

import('./globals.js').then(({file, parse}) => {
    console.log(file);
    parse();
});

function component() {
  var element = document.createElement('div');

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = join(['Hello', 'webpack'], ' '); // lodash 的 join 方法

  // 假设我们处在'window'对象的上下文中
  this.alert('Hmmm, this probably isn\'t a great idea...');

  return element;
}

document.body.appendChild(component());