import LinkedList from './linkedList'

class LinkedNode {
  private prev: LinkedNode
  private next: LinkedNode
  private parent: LinkedNode
  private children: LinkedList
  constructor () {
    this.prev = this.next = null
    this.parent = null
    this.children = new LinkedList()
  }

  insertBefore (newNode: LinkedNode, refNode: LinkedNode) {
    newNode.parent = this
    this.children.insertBefore(newNode, refNode)
    return newNode
  }

  insertAfter (newNode: LinkedNode, refNode: LinkedNode) {
    this.insertBefore(newNode, refNode.next)
    return newNode
  }

  insertAtLast (newNode: LinkedNode) {
    this.insertAfter(newNode, this.children.tail)
  }
}

export default LinkedNode
