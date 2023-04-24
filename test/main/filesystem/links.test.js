const linkManager = require('../../../src/main/filesystem/linkManager')
const { getTree } = require('../../../src/main/filesystem/getFileTree')
const assert = require('assert')
const path = require('path')

describe('links初始化测试', function () {
  it('读取测试', async function () {
    await getTree(path.resolve('test', 'main', 'data'))
    linkManager.init()
  })
  it('tag正确性检测', async function () {
    assert.deepStrictEqual(linkManager.findTags(), ['a', 'b', 'c'])
  })
  it('links正确性检测', async function () {
    assert.deepStrictEqual(linkManager.getLinks().aerials, [
      {
        name: '123',
        sourcePath: '/Users/apple/非ICOULD区/SE软工/Ficus/test/main/data/1.md',
        targetPath: '/Users/apple/非ICOULD区/SE软工/Ficus/test/main/data/3.md'
      }
    ])
  })
  it('tag搜索检测', async function () {
    assert.deepStrictEqual(linkManager.findTags('a'), ['a'])
  })
  it('删除某个文件后tag搜索检测', async function () {
    linkManager.delFile(path.resolve('test', 'main', 'data/3.md'))
    assert.deepStrictEqual(linkManager.findTags('c'), ['c'])
  })
})
