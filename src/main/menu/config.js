import path from 'path'

const builtInDocumentsFileName = ['功能分区.md', 'ficus功能.md', '其他功能.md', '使用技巧.md', '开发日志.md', '关于我们.md']
const isDevelopment = process.env.NODE_ENV !== 'production'

export function getBuiltInDocumentsPath () {
  if (isDevelopment) {
    return builtInDocumentsFileName.map(filename => path.resolve(__dirname, '../public/static', 'docs', filename))
  } else {
    return builtInDocumentsFileName.map(filename => path.resolve(__dirname, './static', 'docs', filename))
  }
}
