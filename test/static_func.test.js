var module_under_test = require('../src/static_func.js');
var expect = require('chai').expect;

describe('同步纯函数测试', function() {
    it('简单 int 加法', function() {
        expect(module_under_test.add(1, 1)).to.be.equal(2);
    });
});
