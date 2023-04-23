const DataManager = require('../../../src/IR/manager')
const assert = require('assert')
const { expect } = require('chai')

describe('manager树测试', function () {
  const manager = new DataManager()
  it('创建有效', function () {
    assert.notEqual(manager, undefined)
  })
  it('创建一棵树', function () {
    manager.buildTreeFromMarkdown({ content: '# a', path: '1' }, { replaced: true })
    expect(manager.getTreeMarkdown()).to.be.equal('# a\n\n')
  })
  it('更新一棵树', function () {
    manager.updateTreeFromMarkdown('## aa')
    expect(manager.getTreeMarkdown()).to.be.equal('## aa\n\n')
  })
  it('撤销更改', function () {
    manager.undoTree()
    expect(manager.getTreeMarkdown()).to.be.equal('# a\n\n')
  })
  it('重做', function () {
    manager.redoTree()
    expect(manager.getTreeMarkdown()).to.be.equal('## aa\n\n')
  })
})

describe('manager树混合测试', function () {
  const manager = new DataManager()
  it('创建有效', function () {
    assert.notEqual(manager, undefined)
  })
  it('创建一棵树', function () {
    manager.buildTreeFromMarkdown({ content: '# a', path: '1' }, { replaced: true, delay: 0 })
    expect(manager.getTreeMarkdown()).to.be.equal('# a\n\n')
  })
  it('通过json更新一棵树', function () {
    manager.updateTreeFromMindJson({
      name: '',
      text: '',
      type: 'root',
      children: [
        { name: 'aaa', text: 'aaa', type: 'heading', children: [], level: 2 }
      ]
    })
    expect(manager.getTreeMarkdown()).to.be.equal('## aaa\n\n')
  })
  it('通过md更新一棵树', function () {
    manager.updateTreeFromMarkdown('## aa')
    expect(manager.getTreeMarkdown()).to.be.equal('## aa\n\n')
  })
  it('撤销', function () {
    manager.undoTree()
    expect(manager.getTreeMarkdown()).to.be.equal('## aaa\n\n')
  })
  it('重做', function () {
    manager.redoTree()
    expect(manager.getTreeMarkdown()).to.be.equal('## aa\n\n')
  })
})
