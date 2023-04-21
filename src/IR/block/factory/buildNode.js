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
  FrontmatterContent
} = require('../base/content/base')
const {
  FolderContent,
  FileContent,
  TagContent
} = require('../base/content/file')
const TreeNode = require('../base/treeNode')
const {
  paragraphTypeName,
  quoteTypeName,
  thematicBreakTypeName,
  codeblockTypeName,
  diagramTypeName,
  htmlblockTypeName,
  rootTypeName,
  frontmatterTypeName,
  headingTypeName,
  listItemTypeName,
  listTypeName,
  fileTypeName,
  folderTypeName,
  tagTypeName
} = require('../base/type/constant')

function buildRootNode () {
  return new TreeNode(rootTypeName, new RootContent())
}

function buildFrontMatter (text, lang, style) {
  return new TreeNode(frontmatterTypeName, new FrontmatterContent(text, lang, style))
}

function buildThematicBreak (text) {
  return new TreeNode(paragraphTypeName, new ParagraphContent(thematicBreakTypeName, text))
}

function buildHeading (text, depth) {
  return new TreeNode(headingTypeName, new HeadingContent(text, depth))
}

function buildCodeBlock (text, type, lang) {
  return new TreeNode(paragraphTypeName, new CodeContent(codeblockTypeName, text, type, lang))
}

function buildDiagramBlock (text, type, lang) {
  return new TreeNode(paragraphTypeName, new CodeContent(diagramTypeName, text, type, lang))
}

function buildParagraph (text) {
  return new TreeNode(paragraphTypeName, new ParagraphContent(paragraphTypeName, text))
}

function buildHtmlBlock (text) {
  return new TreeNode(paragraphTypeName, new ParagraphContent(htmlblockTypeName, text))
}

function buildMathBlock (text, style) {
  return new TreeNode(paragraphTypeName, new MathContent(text, style))
}

function buildQuoteBlock () {
  return new TreeNode(quoteTypeName, new QuoteContent(quoteTypeName))
}

function buildListBlock (name, loose, start, delimiter, marker) {
  return new TreeNode(listTypeName, new ListContent(name, loose, start, delimiter, marker))
}

function buildListItemBlock (name, checked) {
  return new TreeNode(listItemTypeName, new ListItemContent(name, checked))
}

function buildTable (cells) {
  return new TreeNode(paragraphTypeName, new TableContent(cells))
}

function buildFileNode (id, name, path, content) {
  return new TreeNode(fileTypeName, new FileContent(id, name, path, content))
}

function buildFolderNode (id, name, path) {
  return new TreeNode(folderTypeName, new FolderContent(id, name, path))
}

function buildTagNode (id, name) {
  return new TreeNode(tagTypeName, new TagContent(id, name))
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
