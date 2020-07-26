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
@font-face {
    font-family: "leo";
    src: url("./assets/my-font.ttf") format("truetype");
}

@app-size: 50px;
#app .line-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 90vw;
    margin: 10px 0;
    font-family: "leo";
    font-size: 20px;
    font-weight: bold;
    color: white;

    .message {
        width: 150px;
    }

    > span {
        display: inline-block;
        height: @app-size;
        line-height: @app-size;
        margin-bottom: 15px;
        padding: 0 10px;
        text-align: center;
        background-color: palevioletred;
        border-radius: 5px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
    }

    > img {
        width: @app-size;
        height: @app-size;
        margin-left: 10px;
        border-radius: 5px;
    }
}
</style>
