function component() {
  var element = document.createElement('div');
  var child1 = document.createElement('div');
  var child2 = document.createElement('div');
  
  // 不要误以为 env 是一个 object
  // env.NODE_ENV 也不是在浏览器环境中才编译取值的，
  // 而是再 webpack 打包时就已经取值，然后把 innerHTML 赋值完毕了
  child1.innerHTML = 'NODE_ENV: ' + env.NODE_ENV;
  child2.innerHTML = 'Production: ' + env.production;

  element.appendChild(child1);
  element.appendChild(child2);
  
  return element;
}

document.body.appendChild(component());