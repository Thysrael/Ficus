const { markdownToTree } = require('../../src/IR/block/factory/markdownToTree.js')
const { expect } = require('chai')

describe('markdown生成树测试', function () {
  let root = markdownToTree('# aa\naa')
  it('简单单行测试', function () {
    expect(root.toMarkdown()).to.be.equal('# aa\n\naa\n\n')
  })
})

describe('markdown生成树测试', function () {
  let root = markdownToTree('# a\n## aa\naaa## aa\n### aaa\naaa')
  it('复合标题段落测试', function () {
    expect(root.toMarkdown()).to.be.equal('# a\n\n## aa\n\naaa## aa\n\n### aaa\n\naaa\n\n')
  })
})

describe('markdown生成树测试', function () {
  let root = markdownToTree('- 1\n- # 2\n- ## 3')
  it('无序列表测试', function () {
    expect(root.toMarkdown()).to.be.equal('- 1\n\n- # 2\n\n- ## 3\n\n')
  })
})

describe('markdown生成树测试', function () {
  let root = markdownToTree('1. 11\n2. 22\n3. 33')
  it('有序列表测试', function () {
    expect(root.toMarkdown()).to.be.equal('1. 11\n\n2. 22\n\n3. 33\n\n')
  })
})

describe('markdown生成树测试', function () {
  let root = markdownToTree('- [x] 3\n- [ ] 2')
  it('任务列表测试', function () {
    expect(root.toMarkdown()).to.be.equal('- [x] 3\n\n- [ ] 2\n\n')
  })
})

