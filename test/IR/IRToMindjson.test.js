const { markdownToTree } = require('../../src/IR/block/factory/markdownToTree.js')
<<<<<<< HEAD
=======
const chai = require('chai')
>>>>>>> 7f67072 (feat(renderer): 修改面包屑，加入导出pdf功能)
const assert = require('assert')

describe('IR到MindJson测试', function () {
  const root = markdownToTree('# aa')
  it('简单单行测试', function () {
    assert.deepStrictEqual(root.toMindJson(), {
      name: '',
      text: '',
      type: 'root',
      children: [
        {
          name: 'aa',
          text: 'aa',
          type: 'heading',
          level: 1,
          children: []
        }
      ]
    })
  })
})
