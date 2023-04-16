const { CodeContent, HeadingContent, ListContent, ListItemContent, MathContent, QuoteContent, RootContent, TableContent, ParagraphContent } = require('../base/content')
const TreeNode = require('../base/treeNode.js')
const { headingNodeType, listItemNodeType, listNodeType, paragraphNodeType, quoteNodeType, rootNodeType } = require('../type/type')

function buildRootNode () {
  return new TreeNode(rootNodeType, new RootContent())
}

function buildFrontMatter (text) {
  return new TreeNode(paragraphNodeType, new ParagraphContent('frontmatter', text))
}

function buildThematicBreak (text) {
  return new TreeNode(paragraphNodeType, new ParagraphContent('thematic-break', text))
}

function buildHeading (text, depth) {
  return new TreeNode(headingNodeType, new HeadingContent('heading', text, depth))
}

function buildCodeBlock (text, type, lang) {
  return new TreeNode(paragraphNodeType, new CodeContent('code-block', text, type, lang))
}

function buildDiagramBlock (text, type, lang) {
  return new TreeNode(paragraphNodeType, new CodeContent('diagram', text, type, lang))
}

function buildParagraph (text) {
  return new TreeNode(paragraphNodeType, new ParagraphContent('paragraph', text))
}

function buildHtmlBlock (text) {
  return new TreeNode(paragraphNodeType, new ParagraphContent('html-block', text))
}

function buildMathBlock (text, style) {
  return new TreeNode(paragraphNodeType, new MathContent('math-block', text, style))
}

function buildQuoteBlock () {
  return new TreeNode(quoteNodeType, new QuoteContent('quote'))
}

function buildListBlock (name, loose, start, delimiter, marker) {
  return new TreeNode(listNodeType, new ListContent(name, loose, start, delimiter, marker))
}

function buildListItemBlock (name, checked) {
  return new TreeNode(listItemNodeType, new ListItemContent(name, checked))
}

function buildTable (cells) {
  return new TreeNode(paragraphNodeType, new TableContent(cells))
}

module.exports = {
  buildCodeBlock,
  buildDiagramBlock,
  buildFrontMatter,
  buildHeading,
  buildHtmlBlock,
  buildListBlock,
  buildListItemBlock,
  buildMathBlock,
  buildParagraph,
  buildQuoteBlock,
  buildRootNode,
  buildTable,
  buildThematicBreak
}
