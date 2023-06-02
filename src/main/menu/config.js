import path from 'path'

const builtInDocumentsFileName = ['功能规格说明书.md']
const isDevelopment = process.env.NODE_ENV !== 'production'

export function getBuiltInDocumentsPath () {
  if (isDevelopment) {
    return builtInDocumentsFileName.map(filename => path.resolve(__dirname, '../public/static', 'docs', filename))
  } else {
    return builtInDocumentsFileName.map(filename => path.resolve(__dirname, './static', 'docs', filename))
  }
}
