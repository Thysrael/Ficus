import { markdownToTree } from '@/IR/block/factory/markdownToTree'
import { Lexer } from '../IR/utils/marked'
import { load } from 'js-yaml'

function getAerialInBlock (blocktext) {
  const aerialPattern = /-\[([^\]]+)\]\((\S*).*?\)/g
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
            tags = load(value).tags || []
          } catch (e) {
            tags = []
            console.error(`js-yaml parse failed: ${e}`)
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

function addTagToDoc (doc, tagName) {
  const ir = markdownToTree(doc)
  ir.addTag(tagName)
  return ir.toMarkdown()
}

function removeTagFromDoc (doc, tagName) {
  const ir = markdownToTree(doc)
  ir.removeTag(tagName)
  return ir.toMarkdown()
}

export {
  getLinksInFile,
  addTagToDoc,
  removeTagFromDoc
}
