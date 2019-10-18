// 不推荐在主 bundle 中引入 polyfills，
// 因为这会使具备这些模块功能的现代浏览器用户，下载体积很大、却不需要的脚本文件
// import 'babel-polyfill';

// ES6的 import 和 export 一定是要在最外层，不能被包含在函数或是代码块中
// 所以此时使用 imports-loader 处理 index.js 会报错
// import { file, parse } from './globals.js';
// 改用 import() 或 require() 即可
// import('./globals.js').then(({ file, parse }) => {
//   console.log(file);
//   parse();
// });

function component() {
  var element = document.createElement('div');

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = join(['Hello', 'webpack'], ' '); // lodash 的 join 方法

  // 假设我们处在'window'对象的上下文中
  this.alert('Hmmm, this probably isn\'t a great idea...');

  return element;
}

document.body.appendChild(component());

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    console.log('拿到数据了！而且我们确信程序可以在各个版本的浏览器上运行。')
    console.log(json)
  })
  .catch(error => console.error('获取数据时，遇到了一些问题: ', error))