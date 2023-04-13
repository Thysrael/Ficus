const { markdownToTree } = require('../../src/IR/block/factory/markdownToTree.js')
const { expect } = require('chai')

describe('markdown生成树测试', function () {
  let root = markdownToTree('aa')
  it('简单单行测试', function () {
    expect(root.toMarkdown()).to.be.equal('aa')
  })
})
