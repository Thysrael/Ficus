const { markdownToTree } = require('../../../src/IR/block/factory/markdownToTree.js')
const { expect } = require('chai')

describe('markdown生成树简单测试', function () {
  const root1 = markdownToTree('# aa\naa')
  it('简单单行测试', function () {
    expect(root1.toMarkdown()).to.be.equal('# aa\n\naa\n\n')
  })
  const root2 = markdownToTree('# a\n## aa\naaa## aa\n### aaa\naaa')
  it('复合标题段落测试', function () {
    expect(root2.toMarkdown()).to.be.equal('# a\n\n## aa\n\naaa## aa\n\n### aaa\n\naaa\n\n')
  })
  const root3 = markdownToTree('- 1\n- # 2\n- ## 3')
  it('无序列表测试', function () {
    expect(root3.toMarkdown()).to.be.equal('- 1\n  \n- # 2\n  \n- ## 3\n  \n')
  })
  const root4 = markdownToTree('1. 11\n2. 22\n3. 33')
  it('有序列表测试', function () {
    expect(root4.toMarkdown()).to.be.equal('1. 11\n   \n2. 22\n   \n3. 33\n   \n')
  })
  const root5 = markdownToTree('- [x] 3\n- [ ] 2')
  it('任务列表测试', function () {
    expect(root5.toMarkdown()).to.be.equal('- [x] 3\n  \n- [ ] 2\n  \n')
  })
})

describe('markdown列表简单测试', function () {
  const root1 = markdownToTree('| a   | b   | c   |\n| --- | --- | --- |\n| 1 1 | 1 2 | 1 3 |\n| 2 1 | 2 2 | 2 3 |\n| 3 1 | 3 2 | 3 3 |\n\n')
  it('普通列表测试', function () {
    expect(root1.toMarkdown()).to.be.equal('| a   | b   | c   |\n| --- | --- | --- |\n| 1 1 | 1 2 | 1 3 |\n| 2 1 | 2 2 | 2 3 |\n| 3 1 | 3 2 | 3 3 |\n')
  })
})
