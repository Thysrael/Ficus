import IRGraph from '../../component/graph'

function buildGraphFromFileTree (files, relations = [], aerials = []) {
  const res = new IRGraph()
  res.addFiles(files)
  res.addRelations(relations)
  res.addAerials(aerials)
  return res
}

export default buildGraphFromFileTree
