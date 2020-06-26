// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
        node: true
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // 更严格的规则：
    //  plugin:vue/strongly-recommended
    //  plugin:vue/recommended
    extends: ['plugin:vue/essential', 'airbnb-base'],
    plugins: [
        'vue'
    ],
    // 自定义规则
    rules: {
        semi: 'off',
        indent: ['warn', 4],
        'linebreak-style': 'off',
        'comma-dangle': ['error', 'never'],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state', // for vuex state
                'acc', // for reduce accumulators
                'e' // for e.returnvalue
            ]
        }],
        // 开发模式下允许使用 debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
