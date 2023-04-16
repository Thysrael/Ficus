const { markdownToTree } = require('../../src/IR/block/factory/markdownToTree.js')
const chai = require('chai')
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');

chai.use(chaiJsonSchemaAjv);

describe('markdown生成树到大纲视图测试', function () {
  let root = markdownToTree('# aa')
  it('简单单行测试', function () {
    chai.expect(root.toOutlineJson()).to.be.jsonSchema({
        name: 'root',
        level: 0,
        children: [
            {
                name: 'aa',
                level: 1,
                children: []
            }
        ]
    })
  })
})
