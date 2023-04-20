const { buildGraphFromFileTree } = require('../../../src/IR/block/factory/filesToGraph')
const assert = require('assert')
const { files, res1, nodes1, link1 } = require('../data/file.js')

describe('fileJson到IR测试', function () {
  const irgraph = buildGraphFromFileTree(files)
  it('简单文件树结构测试', function () {
    assert.deepStrictEqual(irgraph.getFileTreeJson(), res1)
  })
  it('简单文件树结构到nodes', function () {
    assert.deepStrictEqual(irgraph.getNodes(), nodes1)
  })
  it('简单文件树结构到links', function () {
    assert.deepStrictEqual(irgraph.getLinks(), link1)
  })
})
