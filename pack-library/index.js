module.exports = process.env.NODE_ENV === 'production'
    ? require('./dist/large-number')
    : require('./dist/large-number.min');