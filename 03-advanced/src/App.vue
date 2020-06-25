<template>
    <div id="app">
        <div class="line-box">
            <span>{{ message }}</span>
            <img src="./assets/1.png" />
            <img src="./assets/2.jpg" />
        </div>
        <div class="line-box">
            <button @click="loadTest">加载</button>
            <component :is="testComp"></component>
        </div>
    </div>
</template>

<script>
import { a as testTreeShaking } from './common/tree-shaking';

export default {
    name: 'app',
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
            import('./Test.vue').then((module) => {
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
    width: 500px;
    margin: 10px 0;
    font-family: "leo";
    font-size: 20px;
    font-weight: bold;
    color: white;

    > span {
        display: inline-block;
        width: 150px;
        height: @app-size;
        line-height: @app-size;
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
