/**
 * 使用 async 简化 index2.js
 */
async function getComponent() {
    var element = document.createElement('div');
    const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
    console.log('[OK] Lodash loading');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

getComponent().then(component => {
    document.body.appendChild(component);
})