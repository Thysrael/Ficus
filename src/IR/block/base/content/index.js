const { rootTypeName } = require('../../type/constant.js')

class Content {
  // private text
  // private name

  constructor (name, text) {
    this.name = name
    this.text = text
    this.pre = '' // 非空白前缀
    this.spacePre = '' // 空白行前缀
  }

  toMarkdown () {
    return this.pre + this.text + '\n'
  }

  toJson () {
    return {
      name: this.name,
      text: this.text
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
  // constructor (name, text) {
  //   super(name, text)
  // }

  toMarkdown () {
    return super.toMarkdown() + this.spacePre + '\n'
  }
}

class HeadingContent extends Content {
  // private depth
  constructor (name, text, depth) {
    super(name, text)
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
}

class CodeContent extends Content {
  // private type
  // private lang
  constructor (name, text, type, lang) {
    super(name, text)
    this.type = type
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
}

class MathContent extends Content {
  // private style
  constructor (name, text, style) {
    super(name, text)
    this.style = style
  }

  toMarkdown () {
    return super.toMarkdown() + '\n' + this.spacePre + '\n'
  }
}

class QuoteContent extends Content {
  constructor (name) {
    super(name, '')
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
  constructor (name, loose, start, delimiter, marker) {
    super(name, '')
    this.loose = loose
    this.start = start
    this.delimiter = delimiter
    this.marker = marker
  }

  toMarkdown () {
    return ''
  }

  getSinglePre (off = 0) {
    return (this.marker || `${this.start + off}${this.delimiter}`) + ' '
  }
}

class ListItemContent extends Content {
  // private checked: boolean
  constructor (name, checked) {
    super(name, '')
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
}

class TableContent extends Content {
  // private cells: any
  constructor (cells) {
    super('table', '')
    this.cells = cells
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
  ParagraphContent
}
