
const { getLinksInFile } = require('../../../src/common/parseLinks')
const { IRTree } = require('../../../src/IR/component/tree')
const assert = require('assert')

describe('已有tag', function () {
  const tree = new IRTree({ content: '---\ntags:\n  - a\n  - b\n---\n\n' })
  it('获得tag', function () {
    assert.deepStrictEqual(tree.getTags(), ['a', 'b'])
  })
  it('增加重复tag', function () {
    tree.addTag('a')
    assert.deepStrictEqual(tree.getTags(), ['a', 'b'])
  })
  it('增加不重复tag', function () {
    tree.addTag('c')
    assert.deepStrictEqual(tree.getTags(), ['a', 'b', 'c'])
  })
  it('移除tag', function () {
    tree.removeTag('b')
    assert.deepStrictEqual(tree.getTags(), ['a', 'c'])
  })
  it('移除不存在tag', function () {
    tree.removeTag('b')
    assert.deepStrictEqual(tree.getTags(), ['a', 'c'])
  })
  it('移除所有tag', function () {
    tree.removeTag('a')
    tree.removeTag('c')
    assert.deepStrictEqual(tree.getTags(), [])
  })
  it('增加tag', function () {
    tree.addTag('c')
    assert.deepStrictEqual(tree.getTags(), ['c'])
  })
})

describe('无tag', function () {
  const tree = new IRTree({ content: '' })
  it('初始tag', function () {
    assert.deepStrictEqual(tree.getTags(), [])
  })
  it('增加tag', function () {
    tree.addTag('a')
    assert.deepStrictEqual(tree.getTags(), ['a'])
  })
  it('第二次增加tag', function () {
    tree.addTag('b')
    assert.deepStrictEqual(tree.getTags(), ['a', 'b'])
  })
  it('测试输出md', function () {
    assert.deepStrictEqual(tree.toMarkdown(), '---\ntags:\n  - a\n  - b\n---\n\n')
  })
})

describe('柱测试', function () {
  it('文件柱测试1', function () {
    assert.deepStrictEqual(getLinksInFile('---\ntags:\n  - a\n  - b\n---\naaa\n').tags,
      ['a', 'b'])
  })
  it('文件柱测试2', function () {
    assert.deepStrictEqual(getLinksInFile('---\ntags:\n  - a\n  - b\n---\n---\n\n\n\n\n').tags,
      ['a', 'b'])
  })
})
