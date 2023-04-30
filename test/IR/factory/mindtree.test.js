import { mindToTree } from '../../../src/IR/block/factory/mindToTree.js'
import { markdownToTree } from '../../../src/IR/block/factory/markdownToTree.js'
import { deepStrictEqual } from 'assert'
import { expect } from 'chai'
import { readFileSync } from 'fs-extra'

describe('IR到MindJson测试', function () {
  const root = markdownToTree('# aa')
  const mindJson = root.toMindJson()
  it('简单单行测试', function () {
    deepStrictEqual(mindJson, {
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

  it('vditor测试', function () {
    const content = readFileSync('test/IR/data/vditor.md').toString()
    const root1 = markdownToTree(content)
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
    deepStrictEqual(mindJson, root1.toMindJson())
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
    deepStrictEqual(mindJsonRes2, root2.toMindJson())
  })
})
