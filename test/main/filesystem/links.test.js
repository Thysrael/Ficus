import linkManager from '../../../src/main/filesystem/linkManager'
import { getProject } from '../../../src/main/filesystem/getFileTree'
import assert from 'assert'
import path from 'path'
describe('links初始化测试', function () {
  it('读取测试', async function () {
    await getProject(path.resolve('test', 'main', 'data'))
  })
  it('tag正确性检测', async function () {
    assert.deepStrictEqual(linkManager.findTags(), ['aaa', 'b', 'c', 'a'])
  })
  it('links正确性检测', async function () {
    assert.deepStrictEqual(linkManager.getLinks().aerials, [{
      name: '123',
      sourcePath: path.resolve('test', 'main', 'data', '1.md'),
      targetPath: path.resolve('test', 'main', 'data', '3.md')
    }])
  })
  it('citing正确性检测', async function () {
    assert.deepStrictEqual(linkManager.getCiteInfo(path.resolve('test', 'main', 'data', '3.md')), {
      cited: [{
        name: '123',
        path: path.resolve('test', 'main', 'data', '1.md')
      }],
      citing: []
    })
  })
  it('tag搜索检测', async function () {
    assert.deepStrictEqual(linkManager.findTags('a'), ['aaa', 'a'])
  })
  it('删除某个文件后tag搜索检测', async function () {
    linkManager.delFile(path.resolve('test', 'main', 'data/3.md'))
    assert.deepStrictEqual(linkManager.findTags('c'), ['c'])
  })
})
