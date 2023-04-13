const { rootTypeName } = require('../../type/constant.js')

class Content {
  // // private text
  // // private name

  constructor (name, text) {
    this.name = name
    this.text = text
  }

  toMarkdown () {
    return this.text
  }
}

class RootContent extends Content {
  constructor () {
    super(rootTypeName, '')
  }
}

// class ParagraphContent extends Content {
//   constructor (name, text) {
//     super(name, text)
//   }
// }

class HeadingContent extends Content {
  // private depth
  constructor (name, text, depth) {
    super(name, text)
    this.depth = depth
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
}

class MathContent extends Content {
  // private style
  constructor (name, text, style) {
    super(name, text)
    this.style = style
  }
}

class QuoteContent extends Content {
  constructor (name) {
    super(name, '')
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
}

class ListItemContent extends Content {
  // private checked: boolean
  constructor (name, checked) {
    super(name, '')
    this.checked = checked
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
  TableContent
}
