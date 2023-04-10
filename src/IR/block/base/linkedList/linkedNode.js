import LinkedList from './linkedList'

class LinkedNode {
  constructor () {
    this.prev = this.next = null
    this.parent = null
    this.children = new LinkedList()
  }
}

export default LinkedNode
