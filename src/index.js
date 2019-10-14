// 导入的 css 文件源码，
// 经过 webpack 处理，会动态的在页面生成 style 标签
// import './style.css';
// import _ from 'lodash';
// import Icon from './icon.png';
// import Data from './data.xml';
// import printMe from './print.js';
import { cube } from './math.js';

function component() {
  // var element = document.createElement('div');
  // var btn = document.createElement('button');
  var element = document.createElement('pre');

  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');
  // element.classList.add('hello');

  // 将图像添加到我们现有的 div
  // var myIcon = new Image();
  // myIcon.src = Icon;
  // element.appendChild(myIcon);

  // console.log(Data);

  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;
  // element.appendChild(btn);

  return element;
}

// document.body.appendChild(component());
let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    // printMe();
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })
}
