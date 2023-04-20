const {
  CodeContent,
  HeadingContent,
  ListContent,
  ListItemContent,
  MathContent,
  QuoteContent,
  RootContent,
  TableContent,
  ParagraphContent,
  FolderContent,
  FileContent,
  TagContent
} = require('../base/content')
const TreeNode = require('../base/treeNode')
const {
  headingNodeType,
  listItemNodeType,
  listNodeType,
  paragraphNodeType,
  quoteNodeType,
  rootNodeType,
  fileNodeType,
  folderNodeType,
  tagNodeType
} = require('../base/type/type')
const {
  paragraphTypeName,
  quoteTypeName,
  frontmatterTypeName,
  thematicBreakTypeName,
  codeblockTypeName,
  diagramTypeName,
  htmlblockTypeName,
} = require('../base/type/constant')

function buildRootNode () {
  return new TreeNode(rootNodeType, new RootContent())
}

function buildFrontMatter (text) {
  return new TreeNode(paragraphNodeType, new ParagraphContent(frontmatterTypeName, text))
}

function buildThematicBreak (text) {
  return new TreeNode(paragraphNodeType, new ParagraphContent(thematicBreakTypeName, text))
}

function buildHeading (text, depth) {
  return new TreeNode(headingNodeType, new HeadingContent(text, depth))
}

function buildCodeBlock (text, type, lang) {
  return new TreeNode(paragraphNodeType, new CodeContent(codeblockTypeName, text, type, lang))
}

function buildDiagramBlock (text, type, lang) {
  return new TreeNode(paragraphNodeType, new CodeContent(diagramTypeName, text, type, lang))
}

function buildParagraph (text) {
  return new TreeNode(paragraphNodeType, new ParagraphContent(paragraphTypeName, text))
}

function buildHtmlBlock (text) {
  return new TreeNode(paragraphNodeType, new ParagraphContent(htmlblockTypeName, text))
}

function buildMathBlock (text, style) {
  return new TreeNode(paragraphNodeType, new MathContent(text, style))
}

function buildQuoteBlock () {
  return new TreeNode(quoteNodeType, new QuoteContent(quoteTypeName))
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

function buildFileNode (id, name, path, content) {
  return new TreeNode(fileNodeType, new FileContent(id, name, path, content))
}

function buildFolderNode (id, name, path) {
  return new TreeNode(folderNodeType, new FolderContent(id, name, path))
}

function buildTagNode (id, name) {
  return new TreeNode (tagNodeType, new TagContent(id, name))
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
  buildThematicBreak,
  buildFileNode,
  buildFolderNode,
  buildTagNode
}
