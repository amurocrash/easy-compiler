import PeekIterator from '../tiny-script/common/PeekIterator'
import arrayToGenerator from '../tiny-script/common/arrayToGenerator'

const log = console.log

export function lookahead1() {
  const it = new PeekIterator(arrayToGenerator([...'abcdefg']))
  log(it.next())
  log(it.next())
  log(it.peek())
  log(it.peek())
  log(it.next())
  log(it.next())
}

export function lookahead2() {
  const it = new PeekIterator(arrayToGenerator([...'abcdefg']))
  log(it.next())
  log(it.peek())
  log(it.peek())
  log(it.next())
  log(it.next())

  it.putBack()
  it.putBack()

  log(it.next())
  log(it.next())
  log(it.next())
}

export function endToken() {
  const it = new PeekIterator(arrayToGenerator([...'abcdefg']), '\0')
  for (let i = 0; i < 8; i++) {
    if (i === 7) {
      log(it.next() === '\0')
    } else {
      log(it.next())
    }
  }
}