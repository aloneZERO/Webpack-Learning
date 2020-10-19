import Vue from 'vue';
import App from './App.vue';
import { common } from './common';
import './styles/index.less';

console.log(common());

Vue.config.productionTip = false;

export default function createApp() {
    const app = new Vue({
        render: (h) => h(App)
    });
    return { app };
}
