const { markdownToTree } = require('../../src/IR/block/factory/markdownToTree.js')
const assert = require('assert');

describe('markdown生成树到大纲视图测试', function () {
  let root = markdownToTree('# aa')
  it('简单单行测试', function () {
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
})
