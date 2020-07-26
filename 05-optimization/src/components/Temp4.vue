<template>
    <span :style="style">Thread-Loader 测试 04</span>
</template>

<script>
import random from 'random';

export default {
    data() {
        return {
            r: 0,
            g: 0,
            b: 0
        }
    },
    computed: {
        style() {
            return {
                backgroundColor: `rgb(${this.r},${this.g},${this.b}) !important`
            }
        }
    },
    mounted() {
        this.r = random.int(0, 255);
        this.g = random.int(0, 255);
        this.b = random.int(0, 255);
    }
}
</script>

<style lang="less">
    span {
        margin-right: 15px;
    }
</style>
