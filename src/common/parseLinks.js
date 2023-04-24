const { Lexer } = require('../IR/utils/marked/lexer')
const yaml = require('js-yaml')

function getAerialInBlock (blocktext) {
  const aerialPattern = /-\[([^\]]+)\]\((.*?)\)/g
  const aerials = []
  for (const word of blocktext.matchAll(aerialPattern)) {
    aerials.push(
      {
        name: word[1] || '',
        path: word[2]
      }
    )
  }

  return aerials
}

/**
 * 仅解析paragraph和text类型中aerial/tag
 * @param {string} doc
 * @returns
 */
function getLinksInFile (doc) {
  const tokens = new Lexer({
    disableInline: true,
    footnote: false,
    isGitlabCompatibilityEnabled: false,
    superSubScript: false,
    frontMatter: true
  }).lex(doc)

  let aerials = []
  let tags = []

  let token
  let value
  while ((token = tokens.shift())) {
    switch (token.type) {
      case 'frontmatter': {
        const { lang, text } = token
        value = text
          .replace(/^\s+/, '')
          .replace(/\s$/, '')
        if (lang === 'yaml') {
          try {
            tags = yaml.load(value).tags
          } catch (e) {
            tags = []
            console.log(`js-yaml parse failed: ${e}`)
          }
        }

        break
      }

      case 'heading': {
        const { text } = token
        value = text
        aerials = aerials.concat(getAerialInBlock(value))
        break
      }

      case 'text': {
        value = token.text
        while (tokens[0].type === 'text') {
          token = tokens.shift()
          value += `\n${token.text}`
        }
        aerials = aerials.concat(getAerialInBlock(value))
        break
      }

      case 'paragraph': {
        value = token.text
        aerials = aerials.concat(getAerialInBlock(value))
        break
      }

      default: {
        break
      }
    }
  }
  return { aerials, tags }
}

module.exports = {
  getLinksInFile
}
