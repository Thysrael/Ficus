const { getAerialInFile } = require('../../src/common/parseLinks')
const assert = require('assert')
describe('须测试', function () {
  it('文件须测试', function () {
    assert.deepStrictEqual(getAerialInFile('-[a](aa)-[a](aa)').aerials, [{
      name: 'a',
      path: 'aa'
    },
    {
      name: 'a',
      path: 'aa'
    }])
  })
  it('文件须测试2', function () {
    assert.deepStrictEqual(getAerialInFile('-[123](1)-[](1)-[1]()').aerials, [{
      name: '123',
      path: '1'
    },
    {
      name: '1',
      path: ''
    }])
  })
})

describe('柱测试', function () {
  it('文件须测试', function () {
    assert.deepStrictEqual(getAerialInFile('---\ntags:\n  - a\n  - b\n---\n\n').tags,
      ['a', 'b'])
  })
})
