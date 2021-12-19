import LinkedList from '../common/linkedlist'

const CACHE_SIZE = 10

/**
 * 提供一个流的处理工具
 * 包含
 * peek，看下当前的值，但并不向后遍历
 * putback，回溯，最大可回溯的值与CACHE_SIZE相关
 * next，向后遍历一个值
 */
class PeekIterator {
  private it: Generator
  stackPutbacks: typeof LinkedList
  queueCache: typeof LinkedList
  endToken: any

  constructor(it: Generator, endToken: any = null) {
    this.it = it
    this.stackPutbacks = new LinkedList()
    this.queueCache = new LinkedList()
    this.endToken = endToken
  }

  peek() {
    if (this.stackPutbacks.length > 0) {
      return this.stackPutbacks.tail
    }

    const val = this.next()
    this.putBack()
    return val
  }

  putBack() {
    if (this.queueCache.length > 0) {
      this.stackPutbacks.push(this.queueCache.pop())
    }
  }

  hasNext() {
    return this.endToken || !!this.peek()
  }

  next() {
    let val = null

    if (this.stackPutbacks.length > 0) {
      val = this.stackPutbacks.pop()
    } else {
      val = this.it.next().value
      if (val === undefined) {
        const temp = this.endToken
        this.endToken = null
        val = temp
      }
    }

    while (this.queueCache.length >= CACHE_SIZE) {
      this.queueCache.shift()
    }

    this.queueCache.push(val)

    return val
  }
}

export default PeekIterator

