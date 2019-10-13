import _ from 'lodash';
// 导入的 css 文件源码，
// 经过 webpack 处理，会动态的在页面生成 style 标签
import './style.css';

function component() {
  var element = document.createElement('div');
  
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  
  return element;
}

document.body.appendChild(component());