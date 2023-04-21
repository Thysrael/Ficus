const LinkedList = require('./linkedList')
class LinkedNode {
  constructor () {
    this.prev = this.next = null
    this.parent = null
    this.children = new LinkedList()
  }

  insertBefore (newNode, refNode) {
    newNode.parent = this
    this.children.insertBefore(newNode, refNode)
    return newNode
  }

  insertAfter (newNode, refNode) {
    this.insertBefore(newNode, refNode.next)
    return newNode
  }

  insertAtLast (newNode) {
    this.insertBefore(newNode, null)
  }

  removeSelf () {
    if (this.parent !== null) {
      this.parent.children.remove(this)
    }
  }

  getChildrenHead () {
    return this.children.head
  }
}
module.exports = LinkedNode
