const { markdownToTree } = require('../../../src/IR/block/factory/markdownToTree.js')
const assert = require('assert')

describe('markdown生成树到大纲视图测试', function () {
  it('简单单行测试', function () {
    const root = markdownToTree('# aa')
    assert.deepStrictEqual(root.toOutlineJson(), {
      name: 'root',
      level: 0,
      children: [
        {
          name: 'aa',
          level: 1,
          children: []
        }
      ]
    })
  })
  it('空串测试', function () {
    const root2 = markdownToTree('')
    assert.deepStrictEqual(root2.toOutlineJson(), {
      name: 'root',
      level: 0,
      children: []
    })
  })
})
