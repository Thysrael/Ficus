import { rootTypeName, tableTypeName, headingTypeName, quoteTypeName, mathblockTypeName, frontmatterTypeName } from '../type/constant.js'
import yaml from 'js-yaml'
class Content {
  constructor (typename, text) {
    this.typename = typename
    this.text = text
    this.normalPrefix = '' // 非空白前缀
    this.spacePreix = '' // 空白行前缀
  }

  toMarkdown () {
    const lines = this.text.split('\n')
    let md = ''
    for (const line of lines) {
      if (line.trim().length === 0) {
        continue
      }
      md += this.spacePreix + line + '\n' + this.spacePreix + '\n'
    }
    return md.replace(this.spacePreix, this.normalPrefix)
  }

  getMindJson () {
    return {
      data: {
        name: this.text,
        text: this.text || this.typename,
        type: this.typename
      },
      children: []
    }
  }

  /**
   * 获取content本身可以生成的正常行前缀
   * @returns
   */
  getOneNormalPrefix () {
    return ''
  }

  /**
   * 获取content本身可以生成的空白行前缀
   * @returns
   */
  getOneSpacePrefix () {
    return ''
  }

  setNormalPrefix (prefix) {
    this.normalPrefix = prefix
  }

  setSpacePrefix (prefix) {
    this.spacePreix = prefix
  }
}
class FrontmatterContent extends Content {
  constructor (text, lang, style) {
    super(frontmatterTypeName, text)
    this.lang = lang
    this.style = style
    this.data = yaml.load(text) || {}
  }

  getTags () {
    return this.data.tags || []
  }

  toMarkdown () {
    if (this.isEmpty()) {
      return '---\n' + this.text + '---\n' + this.spacePreix + '\n'
    } else {
      return '---\n' + yaml.dump(this.data) + '---\n' + this.spacePreix + '\n'
    }
  }

  addTag (tagname) {
    if (this.data.tags === undefined) {
      this.data = {
        tags: [tagname]
      }
    } else if (!this.data.tags.includes(tagname)) {
      this.data.tags.push(tagname)
    }
  }

  removeTag (tagname) {
    if (this.data.tags !== undefined && this.data.tags.includes(tagname)) {
      this.data.tags.splice(this.data.tags.indexOf(tagname), 1)
      if (this.data.tags.length === 0) {
        delete this.data.tags
      }
    }
  }

  isEmpty () {
    return JSON.stringify(this.data) === '{}'
  }

  getMindJson () {
    return {
      name: yaml.dump(this.data),
      text: yaml.dump(this.data),
      type: this.typename,
      children: []
    }
  }
}
class RootContent extends Content {
  constructor (filename) {
    super(rootTypeName, filename)
    this.isBlock = true
  }

  toMarkdown () {
    return ''
  }

  getOutlineJson () {
    return {
      name: 'root',
      level: 0,
      children: []
    }
  }

  getMindJson () {
    return {
      data: {
        name: this.text,
        text: window.pathAPI.basename(this.text) || this.typename,
        type: this.typename
      },
      children: []
    }
  }
}
class ParagraphContent extends Content {
  // constructor (typename, text) {
  //   super(typename, text)
  // }

  // toMarkdown () {
  //   return super.toMarkdown() + this.spacePreix + '\n'
  // }
}
class HeadingContent extends Content {
  // private depth
  constructor (text, depth, headingStyle, marker) {
    super(headingTypeName, text)
    this.depth = depth
    this.headingStyle = headingStyle
    this.marker = marker
  }

  toMarkdown () {
    if (this.headingStyle === 'atx') {
      return this.normalPrefix + '#'.repeat(+this.depth) + ' ' + this.text + '\n' + this.spacePreix + '\n'
    } else {
      return this.normalPrefix + this.text + '\n' +
            this.spacePreix + this.marker + '\n' + this.spacePreix + '\n'
    }
  }

  getOutlineJson () {
    return {
      name: this.text,
      level: this.depth,
      children: []
    }
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.data.level = this.depth
    mindJson.data.headingStyle = this.headingStyle
    mindJson.data.marker = this.marker
    return mindJson
  }

  setDepth (depth) {
    this.depth = depth
  }
}
class CodeContent extends Content {
  // private type
  // private lang
  constructor (typename, text, type, lang) {
    super(typename, text)
    this.style = type
    this.lang = lang
  }

  toMarkdown () {
    let res = this.spacePreix + '```'
    if (this.lang) {
      res += this.lang
    }
    res += '\n' + this.text + '\n' + this.spacePreix + '```\n' + this.spacePreix + '\n'
    return res
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.data.style = this.style
    mindJson.data.lang = this.lang
    return mindJson
  }
}
class MathContent extends Content {
  constructor (text, style) {
    super(mathblockTypeName, text)
    this.style = style
  }

  toMarkdown () {
    return this.spacePreix + '$$\n' + this.text + '\n' + this.spacePreix + '$$\n' + this.spacePreix + '\n'
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.data.style = this.style
    return mindJson
  }
}
class QuoteContent extends Content {
  constructor () {
    super(quoteTypeName, '')
  }

  toMarkdown () {
    return ''
  }

  getOneNormalPrefix () {
    return '> '
  }

  getOneSpacePrefix () {
    return '> '
  }
}
class ListContent extends Content {
  constructor (typename, loose, start, delimiter, marker) {
    super(typename, '')
    this.loose = loose
    this.start = start
    this.delimiter = delimiter
    this.marker = marker
  }

  toMarkdown () {
    return ''
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.data.loose = this.loose
    mindJson.data.start = this.start
    mindJson.data.delimiter = this.delimiter
    mindJson.data.marker = this.marker
    return mindJson
  }

  getOneNormalPrefix (off = 0) {
    return (this.marker || `${this.start + off}${this.delimiter}`) + ' '
  }

  getOneSpacePrefix () {
    return this.marker === undefined ? '   ' : '  '
  }
}
class ListItemContent extends Content {
  constructor (typename, checked) {
    super(typename, '')
    this.checked = checked
  }

  toMarkdown () {
    return ''
  }

  getOneNormalPrefix () {
    if (this.checked === undefined) {
      return ''
    } else {
      return `[${this.checked ? 'x' : ' '}] `
    }
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.data.checked = this.checked
    return mindJson
  }
}
class TableContent extends Content {
  constructor (cells) {
    super(tableTypeName, 'table')
    this.cells = cells
  }

  toMarkdown () {
    const indent = this.spacePreix
    const result = []
    const row = this.cells.length
    const column = this.cells[0].children.length
    const tableData = []
    for (const rowState of this.cells) {
      tableData.push(rowState.children.map(cell => this.escapeText(cell.text.trim())))
    }
    const columnWidth = this.cells[0].children.map(th => ({
      width: 5,
      align: th.meta.align
    }))
    let i
    let j
    for (i = 0; i < row; i++) {
      for (j = 0; j < column; j++) {
        columnWidth[j].width = Math.max(columnWidth[j].width, tableData[i][j].length + 2) // add 2, because have two space around text
      }
    }

    tableData.forEach((r, i) => {
      const rs = indent + '|' + r.map((cell, j) => {
        const raw = ` ${cell + ' '.repeat(columnWidth[j].width)}`
        return raw.substring(0, columnWidth[j].width)
      }).join('|') + '|'
      result.push(rs)
      if (i === 0) {
        const cutOff = indent + '|' + columnWidth.map(({
          width,
          align
        }) => {
          let raw = '-'.repeat(width - 2)
          switch (align) {
            case 'left':
              raw = `:${raw} `
              break
            case 'center':
              raw = `:${raw}:`
              break
            case 'right':
              raw = ` ${raw}:`
              break
            default:
              raw = ` ${raw} `
              break
          }
          return raw
        }).join('|') + '|'
        result.push(cutOff)
      }
    })
    return result.join('\n').replace(indent, this.normalPrefix) + '\n' + this.spacePreix + '\n'
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.data.cells = this.cells
    return mindJson
  }

  /* private */
  escapeText (str) {
    return str.replace(/([^\\])\|/g, '$1\\|')
  }
}
export {
  Content,
  RootContent,
  HeadingContent,
  CodeContent,
  MathContent,
  QuoteContent,
  ListContent,
  ListItemContent,
  TableContent,
  ParagraphContent,
  FrontmatterContent
}
