const assert = require('assert');
const path = require('path');

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base');

    // console.log(baseConfig);
    const root = path.resolve(__dirname, '../smoke/template/src')
    it('entry', () => {
        assert.equal(
            baseConfig.entry.index, 
            path.join(root, 'index/index.js')
        );
        assert.equal(
            baseConfig.entry.search, 
            path.join(root, 'search/index.js')
        );
    })
});
