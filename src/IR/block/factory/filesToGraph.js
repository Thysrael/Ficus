const { IRGraph } = require('../../component/graph')

function buildGraphFromFileTree (files, relations = [], aerials = []) {
  const res = new IRGraph()
  res.addFiles(files)
  res.addRelations(relations)
  res.addAerials(aerials)
  return res
}

// TODO
function buildGraphFromNodes (nodes, links = {}) {
  const res = new IRGraph()
  return res
}

module.exports = {
  buildGraphFromFileTree,
  buildGraphFromNodes
}
