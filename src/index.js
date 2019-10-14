import _ from 'lodash';
// 导入的 css 文件源码，
// 经过 webpack 处理，会动态的在页面生成 style 标签
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们现有的 div
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  console.log(Data);

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);
  
  return element;
}

document.body.appendChild(component());