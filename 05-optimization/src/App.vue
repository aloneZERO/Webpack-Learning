<template>
    <div id="app">
        <div class="line-box">
            <span class="message">{{ message }}</span>
            <img src="./assets/1.png" />
            <img src="./assets/2.jpg" />
        </div>
        <div class="line-box">
            <button @click="loadTest">加载</button>
            <component :is="testComp"></component>
        </div>
        <div class="line-box">
            <temp1 />
            <temp2 />
            <temp3 />
            <temp4 />
            <temp5 />
            <temp6 />
        </div>
    </div>
</template>

<script>
import { a as testTreeShaking } from './common/tree-shaking';
import Temp1 from './components/Temp1.vue';
import Temp2 from './components/Temp2.vue';
import Temp3 from './components/Temp3.vue';
import Temp4 from './components/Temp4.vue';
import Temp5 from './components/Temp5.vue';
import Temp6 from './components/Temp6.vue';

export default {
    name: 'app',
    components: {
        Temp1,
        Temp2,
        Temp3,
        Temp4,
        Temp5,
        Temp6
    },
    data() {
        return {
            message: 'Made by Vue!',
            testComp: undefined
        };
    },
    mounted() {
        console.log('vue app running...');
        console.log(testTreeShaking());
    },
    methods: {
        loadTest() {
            import('./components/Test.vue').then((module) => {
                console.log(module);
                this.testComp = module.default;
            });
        }
    }
};
</script>

<style lang="less">
@import './App.less';
</style>
