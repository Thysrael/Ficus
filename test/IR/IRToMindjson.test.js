const { markdownToTree } = require('../../src/IR/block/factory/markdownToTree.js')
const chai = require('chai')

describe('IR到MindJson测试', function () {
  let root = markdownToTree('# aa')
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
