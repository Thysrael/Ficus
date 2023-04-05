const moduleUnderTest = require('../src/static_func.js')
const expect = require('chai').expect

describe('同步纯函数测试', function () {
  it('简单 int 加法', function () {
    expect(moduleUnderTest.add(1, 1)).to.be.equal(2)
  })
})
