const { rootTypeName, tableTypeName, headingTypeName, quoteTypeName, mathblockTypeName, fileTypeName, tagTypeName } = require('../type/constant.js')

class Content {
  constructor (typename, text) {
    this.typename = typename
    this.text = text
    this.pre = '' // 非空白前缀
    this.spacePre = '' // 空白行前缀
  }

  toMarkdown () {
    return this.pre + this.text + '\n'
  }

  getMindJson () {
    return {
      name: this.text,
      text: this.text,
      type: this.typename,
      children: []
    }
  }

  getSinglePre () {
    return ''
  }

  getSingleSpacePre () {
    return ''
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
    return super.toMarkdown() + this.spacePre + '\n'
  }
}

class HeadingContent extends Content {
  // private depth
  constructor (text, depth) {
    super(headingTypeName, text)
    this.depth = depth
  }

  toMarkdown () {
    return this.pre + '#'.repeat(+this.depth) + ' ' + this.text + '\n' +
    this.spacePre + '\n'
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
    let res = this.spacePre + '```'
    if (this.lang) {
      res += this.lang
    }
    res += '\n' + super.toMarkdown() + this.spacePre + '```\n' + this.spacePre + '\n'
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
  // private style
  constructor (text, style) {
    super(mathblockTypeName, text)
    this.style = style
  }

  toMarkdown () {
    return this.spacePre + '$$\n' + super.toMarkdown() + this.spacePre + '$$\n' + this.spacePre + '\n'
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

  getSinglePre () {
    return '> '
  }

  getSingleSpacePre () {
    return '> '
  }
}

class ListContent extends Content {
  // private type
  // private loose: boolean
  // private start
  // private delimiter
  // private marker
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

  getSinglePre (off = 0) {
    return (this.marker || `${this.start + off}${this.delimiter}`) + ' '
  }

  getSingleSpacePre () {
    return this.marker === undefined ? '   ' : '  '
  }
}

class ListItemContent extends Content {
  // private checked: boolean
  constructor (typename, checked) {
    super(typename, '')
    this.checked = checked
  }

  toMarkdown () {
    return ''
  }

  getSinglePre () {
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

const escapeText = str => {
  return str.replace(/([^\\])\|/g, '$1\\|')
}

class TableContent extends Content {
  // private cells: any
  constructor (cells) {
    super(tableTypeName, 'table')
    this.cells = cells
  }

  toMarkdown () {
    const indent = this.pre
    const result = []
    const row = this.cells.length
    const column = this.cells[0].children.length
    const tableData = []

    for (const rowState of this.cells) {
      tableData.push(rowState.children.map(cell => escapeText(cell.text.trim())))
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
}

const folderCategory = 0
const fileCategory = 1
const tagCategory = 1

class FileContent extends Content {
  constructor (id, name, path, content) {
    super(fileTypeName, content)
    this.id = id
    this.name = name
    this.path = path
  }

  getFileJson () {
    return {
      name: this.name,
      path: this.path,
      content: this.text
    }
  }

  getNodeJson () {
    return {
      id: `${this.id}`,
      name: this.name,
      category: fileCategory
    }
  }
}

class FolderContent extends Content {
  constructor (id, name, path) {
    super(fileTypeName, name)
    this.id = id
    this.name = name
    this.path = path
  }

  getFileJson () {
    return {
      name: this.text,
      path: this.path,
      children: []
    }
  }

  getNodeJson () {
    return {
      id: `${this.id}`,
      name: this.name,
      category: folderCategory
    }
  }
}

class TagContent extends Content {
  constructor (id, name) {
    super(tagTypeName, name)
    this.id = id
    this.name = name
  }

  getNodeJson () {
    return {
      id: `${this.id}`,
      name: this.name,
      category: tagCategory
    }
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
  FileContent,
  FolderContent,
  TagContent
}
