import { CodeContent, HeadingContent, ListContent, ListItemContent, MathContent, ParagraphContent, QuoteContent, RootContent } from "../base/content";
import TreeNode from "../base/treeNode";
import { headingNodeType, listItemNodeType, listNodeType, paragraphNodeType, quoteNodeType, rootNodeType } from "../type/type";

export function buildRootNode(): TreeNode {
    return new TreeNode(rootNodeType, new RootContent())
}

export function buildFrontMatter(text: string): TreeNode {
    return new TreeNode(paragraphNodeType, new ParagraphContent('frontmatter', text))
}

export function buildThematicBreak(text: string): TreeNode {
    return new TreeNode(paragraphNodeType, new ParagraphContent('thematic-break', text))
}

export function buildHeading(text: string, depth: number): TreeNode {
    return new TreeNode(headingNodeType, new HeadingContent('heading', text, depth))
}

export function buildCodeBlock(text: string, type: string, lang: string): TreeNode {
    return new TreeNode(paragraphNodeType, new CodeContent('code-block', text, type, lang))
}

export function buildDiagramBlock(text: string, type: string, lang: string): TreeNode {
    return new TreeNode(paragraphNodeType, new CodeContent('diagram', text, type, lang))
}

export function buildParagraph(text: string): TreeNode {
    return new TreeNode(paragraphNodeType, new ParagraphContent('paragraph', text))
}

export function buildHtmlBlock(text: string): TreeNode {
    return new TreeNode(paragraphNodeType, new ParagraphContent('html-block', text))
}

export function buildMathBlock(text: string, style: string): TreeNode {
    return new TreeNode(paragraphNodeType, new MathContent('math-block', text, style))
}

export function buildQuoteBlock(): TreeNode {
    return new TreeNode(quoteNodeType, new QuoteContent('quote'))
}

export function buildListBlock(name: string, loose: boolean, start: number, delimiter: string, marker: string): TreeNode {
    return new TreeNode(listNodeType, new ListContent(name, loose, start, delimiter, marker))
}

export function buildListItemBlock(name: string, checked: boolean): TreeNode {
    return new TreeNode(listItemNodeType, new ListItemContent(name, checked))
}
