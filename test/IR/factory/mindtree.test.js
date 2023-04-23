const { mindToTree } = require('../../../src/IR/block/factory/mindToTree.js')
const { markdownToTree } = require('../../../src/IR/block/factory/markdownToTree.js')
const assert = require('assert')

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
            name: 'aa',
            text: 'aa',
            type: 'heading',
            level: 3,
            children: [
              {
                name: 'aa',
                text: 'aa',
                type: 'heading',
                level: 4,
                children: []
              }]
          },
          {
            name: 'aa',
            text: 'aa',
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
            name: 'aa',
            text: 'aa',
            type: 'heading',
            level: 3,
            children: [
              {
                name: 'aa',
                text: 'aa',
                type: 'heading',
                level: 4,
                children: []
              }]
          },
          {
            name: 'aa',
            text: 'aa',
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
