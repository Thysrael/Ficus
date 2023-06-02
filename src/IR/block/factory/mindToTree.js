import { buildRootNode, buildFrontMatter, buildThematicBreak, buildCodeBlock, buildMathBlock, buildHtmlBlock, buildHeading, buildParagraph, buildDiagramBlock, buildTable, buildListBlock, buildQuoteBlock, buildListItemBlock } from './buildNode'
import { rootTypeName, frontmatterTypeName, thematicBreakTypeName, codeblockTypeName, mathblockTypeName, htmlblockTypeName, headingTypeName, paragraphTypeName, diagramTypeName, tableTypeName, bulletlistTypeName, orderlistTypeName, quoteTypeName, tasklistTypeName, listItemTypeName, taskListItemTypeName } from '../base/type/constant'
function mindToTree (mindJson) {
  const rootNode = mindToTreeRecursion(mindJson)
  if (mindJson.data.frontmatter) {
    rootNode.insertAtHead(buildFrontMatter(mindJson.data.frontmatter.text))
  }
  return rootNode
}
function mindToTreeRecursion (mindJson) {
  let nowNode
  let nowLevel
  switch (mindJson.data.type) {
    case rootTypeName:
      nowNode = buildRootNode(mindJson.data.name)
      break
    case paragraphTypeName:
      nowNode = buildParagraph(mindJson.data.text)
      break
    case headingTypeName:
      nowNode = buildHeading(mindJson.data.text, mindJson.data.level, mindJson.data.headingStyle, mindJson.data.marker)
      nowLevel = mindJson.level
      break
    case frontmatterTypeName:
      nowNode = buildFrontMatter(mindJson.data.text)
      break
    case thematicBreakTypeName:
      nowNode = buildThematicBreak(mindJson.data.text)
      break
    case codeblockTypeName:
      nowNode = buildCodeBlock(mindJson.data.text, mindJson.data.style, mindJson.data.lang)
      break
    case mathblockTypeName:
      nowNode = buildMathBlock(mindJson.data.text, mindJson.data.style)
      break
    case htmlblockTypeName:
      nowNode = buildHtmlBlock(mindJson.data.text)
      break
    case diagramTypeName:
      nowNode = buildDiagramBlock(mindJson.data.text, mindJson.data.style, mindJson.data.lang)
      break
    case tableTypeName:
      nowNode = buildTable(mindJson.data.cells)
      break
    case bulletlistTypeName:
      nowNode = buildListBlock(bulletlistTypeName, mindJson.data.loose, mindJson.data.start, mindJson.data.delimiter, mindJson.data.marker)
      break
    case orderlistTypeName:
      nowNode = buildListBlock(orderlistTypeName, mindJson.data.loose, mindJson.data.start, mindJson.data.delimiter, mindJson.data.marker)
      break
    case tasklistTypeName:
      nowNode = buildListBlock(tasklistTypeName, mindJson.data.loose, mindJson.data.start, mindJson.data.delimiter, mindJson.data.marker)
      break
    case quoteTypeName:
      nowNode = buildQuoteBlock()
      break
    case listItemTypeName:
      nowNode = buildListItemBlock(listItemTypeName, mindJson.data.checked)
      break
    case taskListItemTypeName:
      nowNode = buildListItemBlock(taskListItemTypeName, mindJson.data.checked)
      break
    default:
      console.error('mindToTree: unknown type ' + mindJson.data.type)
      break
  }
  let level
  mindJson.children.forEach(mjson => {
    const chnode = mindToTreeRecursion(mjson)
    // 寻找子节点最小权重
    if (mjson.level) {
      if (level) {
        level = Math.min(mjson.data.level, level)
      } else {
        level = mjson.data.level
      }
    }
    if (nowLevel && level) {
      level = Math.max(level, nowLevel + 1)
    }
    if (chnode.nodeType === headingTypeName && level) {
      chnode.content.setDepth(level)
    }
    nowNode.insertAtLast(chnode)
  })
  return nowNode
}
export { mindToTree }
