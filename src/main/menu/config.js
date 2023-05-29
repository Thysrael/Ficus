import path from 'path'

const builtInDocumentsFileName = ['功能规格说明书.md']

export function getBuiltInDocumentsPath () {
  return builtInDocumentsFileName.map(filename => path.resolve(__dirname, '../static/docs', filename))
}
