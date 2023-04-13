const LinkedList = require('./linkedList')
class LinkedNode {
  // public prev: any
  // public next: any
  // public parent: any
  // public children: LinkedList
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
}
module.exports = LinkedNode
