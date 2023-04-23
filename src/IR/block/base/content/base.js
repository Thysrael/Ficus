const {
  rootTypeName,
  tableTypeName,
  headingTypeName,
  quoteTypeName,
  mathblockTypeName,
  frontmatterTypeName
} = require('../type/constant.js')

class Content {
  constructor (typename, text) {
    this.typename = typename
    this.text = text
    this.normalPrefix = '' // 非空白前缀
    this.spacePreix = '' // 空白行前缀
  }

  toMarkdown () {
    return this.normalPrefix + this.text + '\n'
  }

  getMindJson () {
    return {
      name: this.text,
      text: this.text,
      type: this.typename,
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

const yaml = require('js-yaml')

class FrontmatterContent extends Content {
  constructor (text, lang, style) {
    super(frontmatterTypeName, text)
    this.lang = lang
    this.style = style
    this.data = yaml.load(text)
  }

  getTags () {
    return this.data.tags || []
  }

  toMarkdown () {
    return '---\n' + this.normalPrefix + yaml.dump(this.data) + '---\n\n'
  }

  addTag (tagname) {
    if (this.data === undefined) {
      this.data = { tags: [tagname] }
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
}

class RootContent extends Content {
  constructor () {
    super(rootTypeName, '')
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
}

class ParagraphContent extends Content {
  // constructor (typename, text) {
  //   super(typename, text)
  // }

  toMarkdown () {
    return super.toMarkdown() + this.spacePreix + '\n'
  }
}

class HeadingContent extends Content {
  // private depth
  constructor (text, depth) {
    super(headingTypeName, text)
    this.depth = depth
  }

  toMarkdown () {
    return this.normalPrefix + '#'.repeat(+this.depth) + ' ' + this.text + '\n' +
    this.spacePreix + '\n'
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
    mindJson.level = this.depth
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
    res += '\n' + super.toMarkdown() + this.spacePreix + '```\n' + this.spacePreix + '\n'
    return res
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.style = this.style
    mindJson.lang = this.lang
    return mindJson
  }
}

class MathContent extends Content {
  constructor (text, style) {
    super(mathblockTypeName, text)
    this.style = style
  }

  toMarkdown () {
    return this.spacePreix + '$$\n' + super.toMarkdown() + this.spacePreix + '$$\n' + this.spacePreix + '\n'
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.style = this.style
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
    mindJson.loose = this.loose
    mindJson.start = this.start
    mindJson.delimiter = this.delimiter
    mindJson.marker = this.marker
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
    } else { return `[${this.checked ? 'x' : ' '}] ` }
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.checked = this.checked
    return mindJson
  }
}

class TableContent extends Content {
  constructor (cells) {
    super(tableTypeName, 'table')
    this.cells = cells
  }

  toMarkdown () {
    const indent = this.normalPrefix
    const result = []
    const row = this.cells.length
    const column = this.cells[0].children.length
    const tableData = []

    for (const rowState of this.cells) {
      tableData.push(rowState.children.map(cell => this.escapeText(cell.text.trim())))
    }

    const columnWidth = this.cells[0].children.map(th => ({ width: 5, align: th.meta.align }))

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
        const cutOff = indent + '|' + columnWidth.map(({ width, align }) => {
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

    return result.join('\n') + '\n'
  }

  getMindJson () {
    const mindJson = super.getMindJson()
    mindJson.cells = this.cells
    return mindJson
  }

  /* private */
  escapeText (str) {
    return str.replace(/([^\\])\|/g, '$1\\|')
  }
}

module.exports = {
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
