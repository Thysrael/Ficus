import { Lexer } from '@/IR/utils/marked'
import TreeNode from '../base/treeNode'
import { buildCodeBlock, buildDiagramBlock, buildFrontMatter, buildHeading, buildHtmlBlock, buildListBlock, buildListItemBlock, buildMathBlock, buildParagraph, buildQuoteBlock, buildRootNode, buildTable, buildThematicBreak } from './buildNode'

const restoreTableEscapeCharacters = text => {
  // NOTE: markedjs replaces all escaped "|" ("\|") characters inside a cell with "|".
  //       We have to re-escape the chraracter to not break the table.
  return text.replace(/\|/g, '\\|')
}

export function markdownToTree (markdown: string): TreeNode {
  const root: TreeNode = buildRootNode()
  const tokens = new Lexer({
    disableInline: true,
    footnote: false,
    isGitlabCompatibilityEnabled: false,
    superSubScript: false,
    frontMatter: true
  }).lex(markdown)

  let token: any
  let value: string
  const parentStack = [{ node: root, level: 0 }]
  while ((token = tokens.shift())) {
    switch (token.type) {
      case 'frontmatter': {
        // const { lang, style, text } = token
        const { text } = token
        value = text
          .replace(/^\s+/, '')
          .replace(/\s$/, '')

        parentStack[0].node.insertAtLast(buildFrontMatter(value))
        break
      }

      case 'hr': {
        parentStack[0].node.insertAtLast(buildThematicBreak(token.marker))
        break
      }

      case 'heading': {
        const { depth, text } = token
        value = '#'.repeat(+depth) + ` ${text}`

        const newNode = buildHeading(value, depth)

        // 标题节点作为接下来的父节点
        if (depth <= 3 && parentStack[0].level !== undefined) {
          while (depth >= parentStack[0].level) {
            parentStack.shift()
          }
          parentStack[0].node.insertAtLast(newNode)
          parentStack.unshift({ node: newNode, level: depth })
        } else {
          parentStack[0].node.insertAtLast(newNode)
        }
        break
      }

      case 'code': {
        const { codeBlockStyle, text, lang: infostring = '' } = token

        // // GH#697, markedjs#1387
        const lang = (infostring || '').match(/\S*/)[0]

        value = text
        // FIXME: 考虑去除不必要的换行
        // marktext#1265.
        if ((value.endsWith('\n') || value.startsWith('\n'))) {
          value = value
            .replace(/\n+$/, '')
            .replace(/^\n+/, '')
        }

        if (/mermaid|flowchart|vega-lite|sequence|plantuml/.test(lang)) {
          const codeType = lang
          const codeLang = lang === 'vega-lite' ? 'json' : 'yaml'
          parentStack[0].node.insertAtLast(buildDiagramBlock(value, codeType, codeLang))
        } else {
          const codeType = codeBlockStyle === 'fenced' ? 'fenced' : 'indented'
          const codeLang = lang
          parentStack[0].node.insertAtLast(buildCodeBlock(token.text, codeType, codeLang))
        }
        break
      }

      case 'table': {
        const tableCells: any = []
        const { header, align, cells } = token

        tableCells.push({
          name: 'table.row',
          children: header.map((h: any, i: string | number) => ({
            name: 'table.cell',
            meta: { align: align[i] },
            text: restoreTableEscapeCharacters(h)
          }))
        })

        tableCells.children.push(...cells.map((row: any[]) => ({
          name: 'table.row',
          children: row.map((c: any, i: string | number) => ({
            name: 'table.cell',
            meta: { align: align[i] },
            text: restoreTableEscapeCharacters(c)
          }))
        })))

        parentStack[0].node.insertAtLast(buildTable(tableCells))
        break
      }

      case 'html': {
        const text = token.text.trim()
        // Muya TODO: Treat html state which only contains one img as paragraph, we maybe add image state in the future.
        const isSingleImage = /^<img[^<>]+>$/.test(text)
        if (isSingleImage) {
          parentStack[0].node.insertAtLast(buildParagraph(text))
        } else {
          parentStack[0].node.insertAtLast(buildHtmlBlock(text))
        }
        break
      }

      case 'multiplemath': {
        const text = token.text.trim()
        const { mathStyle = '' } = token
        parentStack[0].node.insertAtLast(buildMathBlock(text, mathStyle))
        break
      }

      case 'text': {
        value = token.text
        while (tokens[0].type === 'text') {
          token = tokens.shift()
          value += `\n${token.text}`
        }
        parentStack[0].node.insertAtLast(buildParagraph(value))
        break
      }

      case 'paragraph': {
        value = token.text
        parentStack[0].node.insertAtLast(buildParagraph(value))
        break
      }

      case 'blockquote_start': {
        const newNode = buildQuoteBlock()
        parentStack[0].node.insertAtLast(newNode)
        parentStack.unshift({ node: newNode, level: undefined })
        break
      }

      case 'blockquote_end': {
        parentStack.shift()
        break
      }

      case 'list_start': {
        const { listType, start } = token
        const { bulletMarkerOrDelimiter, type } = tokens.find(t => t.type === 'loose_item_start' || t.type === 'list_item_start')

        const loose = type === 'loose_item_start'
        let listStart
        let delimiter
        let marker
        if (listType === 'order') {
          listStart = /^\d+$/.test(start) ? start : 1
          delimiter = bulletMarkerOrDelimiter || '.'
        } else {
          marker = bulletMarkerOrDelimiter || '-'
        }
        const newNode = buildListBlock(`${listType}-list`, loose, listStart, delimiter, marker)
        parentStack[0].node.insertAtLast(newNode)
        parentStack.unshift({ node: newNode, level: undefined })
        break
      }

      case 'list_end': {
        parentStack.shift()
        break
      }

      case 'loose_item_start': {
        const { checked } = token
        const name = checked !== undefined ? 'task-list-item' : 'list-item'

        const newNode = buildListItemBlock(name, checked)
        parentStack[0].node.insertAtLast(newNode)
        parentStack.unshift({ node: newNode, level: undefined })
        break
      }

      case 'list_item_start': {
        const { checked } = token
        const name = checked !== undefined ? 'task-list-item' : 'list-item'

        const newNode = buildListItemBlock(name, checked)
        parentStack[0].node.insertAtLast(newNode)
        parentStack.unshift({ node: newNode, level: undefined })
        break
      }

      case 'list_item_end': {
        parentStack.shift()
        break
      }

      case 'space': {
        break
      }

      default: {
        // FIXME: 日志记录异常情况
        break
      }
    }
  }
  return root
}
