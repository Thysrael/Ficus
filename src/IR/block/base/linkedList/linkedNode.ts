import LinkedList from './linkedList'

class LinkedNode {
  public prev: LinkedNode
  public next: LinkedNode
  public parent: LinkedNode
  public children: LinkedList
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
    this.insertBefore(newNode, null)
  }
}

export default LinkedNode
