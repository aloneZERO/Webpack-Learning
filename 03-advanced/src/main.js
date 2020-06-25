import Vue from 'vue';
import App from './App.vue';
import { common } from './common';

console.log(common());

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    render: (h) => h(App)
});
