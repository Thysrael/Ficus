const { Lexer } = require('../IR/utils/marked/lexer')

function getAerialInBlock (blocktext) {
  const aerailPattern = /\[(\w+)\]/g
  const aerials = []

  for (const word of blocktext.matchAll(aerailPattern)) {
    aerials.push(word)
  }

  return aerials
}

/**
 * 仅解析paragraph和text类型中的链接
 * @param {*} doc
 * @returns
 */
function getAerialInFile (doc) {
  const tokens = new Lexer({
    disableInline: true,
    footnote: false,
    isGitlabCompatibilityEnabled: false,
    superSubScript: false,
    frontMatter: true
  }).lex(doc)

  const aerials = []

  let token
  let value
  while ((token = tokens.shift())) {
    switch (token.type) {
      case 'frontmatter': {
        break
      }

      case 'hr': {
        break
      }

      case 'heading': {
        const { text } = token
        value = text
        aerials.concat(getAerialInBlock(value))
        break
      }

      case 'code': {
        break
      }

      case 'table': {
        break
      }

      case 'html': {
        break
      }

      case 'multiplemath': {
        break
      }

      case 'text': {
        value = token.text
        while (tokens[0].type === 'text') {
          token = tokens.shift()
          value += `\n${token.text}`
        }
        aerials.concat(getAerialInBlock(value))
        break
      }

      case 'paragraph': {
        value = token.text
        aerials.concat(getAerialInBlock(value))
        break
      }

      case 'blockquote_start': {
        break
      }

      case 'blockquote_end': {
        break
      }

      case 'list_start': {
        break
      }

      case 'list_end': {
        break
      }

      case 'loose_item_start': {
        break
      }

      case 'list_item_start': {
        break
      }

      case 'list_item_end': {
        break
      }

      case 'space': {
        break
      }

      default: {
        break
      }
    }
  }
  return aerials
}

module.exports = {
  getAerialInBlock,
  getAerialInFile
}