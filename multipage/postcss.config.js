module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-pxtorem')({
            rootValue: 54,
            unitPrecision: 5,
            propList: ['*']
        })
    ]
}