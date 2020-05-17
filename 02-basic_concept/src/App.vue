<template>
  <div id="app">
      {{message}}
  </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            message: 'Made by Vue!'
        }
    }
}
</script>

<style>
#app {
    width: 150px;
    height: 50px;
    margin: 10px;
    line-height: 50px;
    text-align: center;
    background-color: palevioletred;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .5);
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
    color: white;
}
</style>