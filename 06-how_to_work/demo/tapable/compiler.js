// 模拟 compiler.js
const {
    SyncHook,
    AsyncSeriesHook
} = require('tapable');

module.exports = class Compiler {

    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newspeed']),
            brake: new SyncHook(),
            calculateRoutes: new AsyncSeriesHook(["source", "target", "routesList"])
        }
    }

    run() {
        this.calculateRoutes('Async', 'hook', 'demo')
        this.accelerate(10)
        this.break()
    }

    accelerate(speed) {
        this.hooks.accelerate.call(speed);
    }

    break() {
        this.hooks.brake.call();
    }
    
    calculateRoutes(...args) {
        this.hooks.calculateRoutes.promise(...args)
            .then(() => {})
            .catch(console.log);
    }
}