import FicusTree from '../component/FicusTreeIR'

class DataManager {
  /**
     * 从markdown生成FicusTree
     * @param markdown md文本
     * @param replaced 是否替换当前DM中的tree
     * @returns
     */
  markdownToTree (markdown, replaced = false): FicusTree {
    return null
  }

  /**
     * 由当前FicusTree生成md
     * @returns markdown字符串
     */
  getTreeMarkdown (): string {
    return null
  }

  // /**
  //    *
  //    * @param srcNode 原NODE
  //    * @param dstNode 插入到目标NODE前
  //    */
  // copy (srcNode, dstNode) {

  // }
}

export default DataManager
