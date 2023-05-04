import { markdownToTree } from '../../src/IR/block/factory/markdownToTree.js'
import assert from 'assert'
describe('IR到MindJson测试', function () {
  const root = markdownToTree('# aa')
  it('简单单行测试', function () {
    assert.deepStrictEqual(root.toMindJson(), {
      name: '',
      text: '',
      type: 'root',
      children: [{
        name: 'aa',
        text: 'aa',
        type: 'heading',
        level: 1,
        children: []
      }]
    })
  })
})
