const { buildGraphFromFileTree } = require('../../src/IR/block/factory/filesToGraph')
const assert = require('assert');

const data1 = {
    "version": 1,
    "root": {
        "path": "C:\\Users\\22143\\Desktop\\test",
        "tree": [
            {
                "name": "test1.txt",
                "path": "C:\\Users\\22143\\Desktop\\test\\test1.txt",
                "content": "fhaf\r\nfafa\r\nafafs",
                "type": "file"
            },
            {
                "name": "test2.txt",
                "path": "C:\\Users\\22143\\Desktop\\test\\test2.txt",
                "curChild": -1,
                "offset": -1,
                "content": "klejahads\r\nkeafjl\r\njglsf",
                "absolutePath": [
                    "C:",
                    "Users",
                    "22143",
                    "Desktop",
                    "test",
                    "test2.txt"
                ],
                "type": "file"
            },
            {
                "name": "test3.txt",
                "path": "C:\\Users\\22143\\Desktop\\test\\test3.txt",
                "curChild": -1,
                "offset": -1,
                "content": "iiiiiiiiiiiiiiiiiiiiiiii",
                "absolutePath": [
                    "C:",
                    "Users",
                    "22143",
                    "Desktop",
                    "test",
                    "test3.txt"
                ],
                "type": "file"
            },
            {
                "name": "testFolder",
                "path": "C:\\Users\\22143\\Desktop\\test\\testFolder",
                "curChild": -1,
                "offset": -1,
                "content": "",
                "absolutePath": [
                    "C:",
                    "Users",
                    "22143",
                    "Desktop",
                    "test",
                    "testFolder"
                ],
                "children": [
                    {
                        "name": "test.txt",
                        "path": "C:\\Users\\22143\\Desktop\\test\\testFolder\\test.txt",
                        "curChild": -1,
                        "offset": -1,
                        "content": "",
                        "absolutePath": [
                            "C:",
                            "Users",
                            "22143",
                            "Desktop",
                            "test",
                            "testFolder",
                            "test.txt"
                        ],
                        "type": "file"
                    }
                ],
                "type": "folder"
            }
        ],
        "folderName": "test"
    }
} 

const res1 = {
    name: 'test',
    path: 'C:\\Users\\22143\\Desktop\\test',
    children: [
      {
        name: 'test1.txt',
        path: 'C:\\Users\\22143\\Desktop\\test\\test1.txt',
        content: 'fhaf\r\nfafa\r\nafafs'
      },
      {
        name: 'test2.txt',
        path: 'C:\\Users\\22143\\Desktop\\test\\test2.txt',
        content: 'klejahads\r\nkeafjl\r\njglsf'
      },
      {
        name: 'test3.txt',
        path: 'C:\\Users\\22143\\Desktop\\test\\test3.txt',
        content: 'iiiiiiiiiiiiiiiiiiiiiiii'
      },
      {
        name: 'testFolder',
        path: 'C:\\Users\\22143\\Desktop\\test\\testFolder',
        children: [
            {
                "name": "test.txt",
                "path": "C:\\Users\\22143\\Desktop\\test\\testFolder\\test.txt",
                "content": "",
              }
        ]
      }
    ]
}

const nodes1 = [
  { id: '0', name: 'test', category: 0 },
  { id: '1', name: 'test1.txt', category: 1 },
  { id: '2', name: 'test2.txt', category: 1 },
  { id: '3', name: 'test3.txt', category: 1 },
  { id: '4', name: 'testFolder', category: 0 },
  { id: '5', name: 'test.txt', category: 1 }
]

const link1 = [
  { id: 0, source: 0, target: 1, type: 0 },
  { id: 1, source: 0, target: 2, type: 0 },
  { id: 2, source: 0, target: 3, type: 0 },
  { id: 3, source: 0, target: 4, type: 0 },
  { id: 4, source: 4, target: 5, type: 0 }
]

describe('fileJson到IR测试', function () {
  let irgraph = buildGraphFromFileTree(data1)
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

