const DataManager = require('../../../src/IR/manager')
const assert = require('assert')
const { expect } = require('chai')

describe('manager树测试', function () {
  const manager = new DataManager()
  it('创建有效', function () {
    assert.notEqual(manager, undefined)
  })
  manager.buildTreeFromMarkdown({ content: '# a', path: '1' }, { replaced: true })
  it('创建一棵树', function () {
    expect(manager.getTreeMarkdown()).to.be.equal('# a\n\n')
    manager.updateTreeFromMarkdown('## aa')
  })
  it('更新一棵树', function () {
    expect(manager.getTreeMarkdown()).to.be.equal('## aa\n\n')
    manager.irtree.undo()
  })
  it('撤销更改', function () {
    expect(manager.getTreeMarkdown()).to.be.equal('# a\n\n')
    manager.irtree.redo()
  })
  it('重做', function () {
    expect(manager.getTreeMarkdown()).to.be.equal('## aa\n\n')
  })
})
