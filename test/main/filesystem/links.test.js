const linkManager = require("../../../src/main/filesystem/linkManager")
const { getTree } = require("../../../src/main/filesystem/getFileTree")
const assert = require('assert')
const path = require('path')

describe ('links初始化测试', function () {
    it('读取测试', async function () {
        await getTree(path.resolve('test', 'main', 'data'))
        linkManager.init()
    })
    it('tag正确性检测', async function () {
        assert.deepStrictEqual(linkManager.getAllTags(), ['a', 'b', 'c'])
    })
})