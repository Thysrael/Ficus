const { makeFolderStat } = require('./statistic')

exports.refresh = async (projPath) => {
  const tree = await makeFolderStat(projPath)
  return tree.children
}
