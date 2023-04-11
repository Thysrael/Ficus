import { rootTypeName } from '../../type/constant'

export class Content {
  private text: string
  private name: string

  constructor (name: string, text: string) {
    this.name = name
    this.text = text
  }

  public toMarkdown (): string {
    return this.text
  }
}

export class RootContent extends Content {
  constructor () {
    super(rootTypeName, '')
  }
}

// export class ParagraphContent extends Content {
//   constructor (name: string, text: string) {
//     super(name, text)
//   }
// }

export class HeadingContent extends Content {
  private depth: number
  constructor (name: string, text: string, depth: number) {
    super(name, text)
    this.depth = depth
  }
}

export class CodeContent extends Content {
  private type: string
  private lang: string
  constructor (name: string, text: string, type: string, lang: string) {
    super(name, text)
    this.type = type
    this.lang = lang
  }
}

export class MathContent extends Content {
  private style: string
  constructor (name: string, text: string, style: string) {
    super(name, text)
    this.style = style
  }
}

export class QuoteContent extends Content {
  constructor (name: string) {
    super(name, '')
  }
}

export class ListContent extends Content {
  private type: string
  private loose: boolean
  private start: number
  private delimiter: string
  private marker: string
  constructor (name: string, loose: boolean, start: number, delimiter: string, marker: string) {
    super(name, '')
    this.loose = loose
    this.start = start
    this.delimiter = delimiter
    this.marker = marker
  }
}

export class ListItemContent extends Content {
  private checked: boolean
  constructor (name: string, checked: boolean) {
    super(name, '')
    this.checked = checked
  }
}

export class TableContent extends Content {
  private cells: any
  constructor (cells: any) {
    super('table', '')
    this.cells = cells
  }
}
