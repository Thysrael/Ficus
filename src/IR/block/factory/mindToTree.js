const {
  buildRootNode,
  buildFrontMatter,
  buildThematicBreak,
  buildCodeBlock,
  buildMathBlock,
  buildHtmlBlock,
  buildHeading,
  buildParagraph,
  buildDiagramBlock,
  buildTable,
  buildListBlock,
  buildQuoteBlock,
  buildListItemBlock
} = require('./buildNode')
const {
  rootTypeName,
  frontmatterTypeName,
  thematicBreakTypeName,
  codeblockTypeName,
  mathblockTypeName,
  htmlblockTypeName,
  headingTypeName,
  paragraphTypeName,
  diagramTypeName,
  tableTypeName,
  bulletlistTypeName,
  orderlistTypeName,
  quoteTypeName,
  tasklistTypeName,
  listItemTypeName,
  taskListItemTypeName
} = require('../type/constant')

exports.mindToTree = function (mindJson) {
  return mindToTreeRecursion(mindJson)
}

function mindToTreeRecursion (mindJson) {
  let nowNode
  switch (mindJson.type) {
    case rootTypeName:
      nowNode = buildRootNode()
      break
    case headingTypeName:
      nowNode = buildParagraph(mindJson.text)
      break
    case paragraphTypeName:
      nowNode = buildHeading(mindJson.text, mindJson.depth)
      break
    case frontmatterTypeName:
      nowNode = buildFrontMatter(mindJson.text)
      break
    case thematicBreakTypeName:
      nowNode = buildThematicBreak(mindJson.text)
      break
    case codeblockTypeName:
      nowNode = buildCodeBlock(mindJson.text, mindJson.type, mindJson.lang)
      break
    case mathblockTypeName:
      nowNode = buildMathBlock(mindJson.text, mindJson.style)
      break
    case htmlblockTypeName:
      nowNode = buildHtmlBlock(mindJson.text)
      break
    case diagramTypeName:
      nowNode = buildDiagramBlock(mindJson.text, mindJson.type, mindJson.lang)
      break
    case tableTypeName:
      nowNode = buildTable(mindJson.cells)
      break
    case bulletlistTypeName:
      nowNode = buildListBlock(bulletlistTypeName, mindJson.loose, mindJson.start, mindJson.delimiter, mindJson.marker)
      break
    case orderlistTypeName:
      nowNode = buildListBlock(orderlistTypeName, mindJson.loose, mindJson.start, mindJson.delimiter, mindJson.marker)
      break
    case tasklistTypeName:
      nowNode = buildListBlock(tasklistTypeName, mindJson.loose, mindJson.start, mindJson.delimiter, mindJson.marker)
      break
    case quoteTypeName:
      nowNode = buildQuoteBlock()
      break
    case listItemTypeName:
      nowNode = buildListItemBlock(listItemTypeName, mindJson.checked)
      break
    case taskListItemTypeName:
      nowNode = buildListItemBlock(taskListItemTypeName, mindJson.checked)
      break
    default:
      // error
      break
  }
  mindJson.children.forEach(mjson => {
    nowNode.insertAtLast(mindToTreeRecursion(mjson))
  })
  return nowNode
}
