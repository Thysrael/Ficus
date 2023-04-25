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

const files2 = {
  name: 'data',
  children: [
    {
      name: '1.md',
      path: '/Ficus/test/main/data/1.md',
      curChild: -1,
      offset: -1,
      absolutePath: [Array],
      type: 'file',
      isMd: true
    },
    {
      name: '2.md',
      path: '/Ficus/test/main/data/2.md',
      curChild: -1,
      offset: -1,
      absolutePath: [Array],
      type: 'file',
      isMd: true
    },
    {
      name: '3.md',
      path: '/Ficus/test/main/data/3.md',
      curChild: -1,
      offset: -1,
      absolutePath: [Array],
      type: 'file',
      isMd: true
    }
  ],
  type: 'folder',
  path: '/Ficus/test/main/data'
}

const relations = [
  {
    tagName: 'aaa',
    attach: ['/Ficus/test/main/data/1.md']
  },
  {
    tagName: 'b',
    attach: ['/Ficus/test/main/data/1.md']
  },
  {
    tagName: 'c',
    attach: [
      '/Ficus/test/main/data/1.md',
      '/Ficus/test/main/data/3.md'
    ]
  },
  {
    tagName: 'a',
    attach: ['/Ficus/test/main/data/3.md']
  }
]

const aerials = [
  {
    name: 123,
    sourcePath: '/Ficus/test/main/data/1.md',
    targetPath: '/Ficus/test/main/data/3.md'
  }
]

const node2 = [
  { id: '0', name: 'data', category: 0 },
  { id: '1', name: '1.md', category: 1 },
  { id: '2', name: '2.md', category: 1 },
  { id: '3', name: '3.md', category: 1 },
  { id: '4', name: 'aaa', category: 1 },
  { id: '5', name: 'b', category: 1 },
  { id: '6', name: 'c', category: 1 },
  { id: '7', name: 'a', category: 1 }
]

const link2 = [
  { id: 0, source: 0, target: 1, type: 0 },
  { id: 1, source: 0, target: 2, type: 0 },
  { id: 2, source: 0, target: 3, type: 0 },
  { id: 3, source: 4, target: 1, type: 1 },
  { id: 4, source: 5, target: 1, type: 1 },
  { id: 5, source: 6, target: 1, type: 1 },
  { id: 6, source: 6, target: 3, type: 1 },
  { id: 7, source: 7, target: 3, type: 1 },
  { id: 8, name: 123, source: 1, target: 3, type: 2 }
]

describe('fileJson+links到IR测试', function () {
  const irgraph = buildGraphFromFileTree(files2, relations, aerials)
  it('nodes', function () {
    assert.deepStrictEqual(irgraph.getNodes(), node2)
  })
  it('links', function () {
    assert.deepStrictEqual(irgraph.getLinks(), link2)
  })
})
