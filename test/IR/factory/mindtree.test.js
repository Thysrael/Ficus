const { mindToTree } = require('../../../src/IR/block/factory/mindToTree.js')
const { markdownToTree } = require('../../../src/IR/block/factory/markdownToTree.js')
const assert = require('assert')
const { expect } = require('chai')
const fs = require('fs-extra')

describe('IR到MindJson测试', function () {
  const root = markdownToTree('# aa')
  const mindJson = root.toMindJson()
  it('简单单行测试', function () {
    assert.deepStrictEqual(mindJson, {
      name: '',
      text: '',
      type: 'root',
      children: [
        {
          name: 'aa',
          text: 'aa',
          type: 'heading',
          level: 1,
          children: []
        }
      ]
    })
  })

  const content = fs.readFileSync('test/IR/data/vditor.md').toString()
  const root1 = markdownToTree(content)
  it('vditor测试', function () {
    expect(mindToTree(root1.toMindJson()).toMarkdown()).to.be.equal(content)
  })
})

describe('MindJson到IR', function () {
  const mindJson = {
    name: '',
    text: '',
    type: 'root',
    children: [
      {
        name: 'aa',
        text: 'aa',
        type: 'heading',
        level: 1,
        children: []
      }
    ]
  }
  const root1 = mindToTree(mindJson)
  it('简单单行测试', function () {
    assert.deepStrictEqual(mindJson, root1.toMindJson())
  })

  const mindJson2 = {
    name: '',
    text: '',
    type: 'root',
    children: [
      {
        name: 'aa',
        text: 'aa',
        type: 'heading',
        level: 1,
        children: [
          {
            name: 'aa3',
            text: 'aa3',
            type: 'heading',
            level: 3,
            children: []
          },
          {
            name: 'aa4',
            text: 'aa4',
            type: 'heading',
            level: 4,
            children: []
          }
        ]
      }
    ]
  }

  const mindJsonRes2 = {
    name: '',
    text: '',
    type: 'root',
    children: [
      {
        name: 'aa',
        text: 'aa',
        type: 'heading',
        level: 1,
        children: [
          {
            name: 'aa3',
            text: 'aa3',
            type: 'heading',
            level: 3,
            children: []
          },
          {
            name: 'aa4',
            text: 'aa4',
            type: 'heading',
            level: 3,
            children: []
          }
        ]
      }
    ]
  }

  const root2 = mindToTree(mindJson2)
  it('修改标题级别测试', function () {
    assert.deepStrictEqual(mindJsonRes2, root2.toMindJson())
  })
})
