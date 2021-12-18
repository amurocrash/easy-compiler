import arrayToGenerator from "../tiny-script/common/arrayToGenerator";
import PeekIterator from "../tiny-script/common/PeekIterator";
import Token from "../tiny-script/lexer/Token";
import Types from "../tiny-script/lexer/TokenType";
import { showTitle, assertToken } from "./helper.test";

// function assertToken(token: Token, type: TokenType, value: any) {
//   log(token.getType() == type && token.getValue() === value)
// }

export function makeVarOrKeyword() {
  showTitle('makeVarOrKeyword')

  const it1 = new PeekIterator(arrayToGenerator([...'if abc']))
  const it2 = new PeekIterator(arrayToGenerator([...'true abc']))

  const token1 = Token.makeVarOrKeyword(it1)
  const token2 = Token.makeVarOrKeyword(it2)
  it1.next()
  const token3 = Token.makeVarOrKeyword(it1)

  assertToken(token1, Types.KEYWORD, 'if')
  assertToken(token2, Types.BOOLEAN, 'true')
  assertToken(token3, Types.VARIABLE, 'abc')
}

export function makeString() {
  showTitle('makeString')

  const tests = ['"123"', "'123'"]

  tests.forEach(t => {
    const it = new PeekIterator(arrayToGenerator([...t]))
    const token = Token.makeString(it)
    assertToken(token, Types.STRING, t)
  })
}

export function makeOp() {
  showTitle('makeOp')

  const tests = [
    ["+ xxx", "+"],
    ["++mmm", "++"],
    ["/=g", "/="],
    ["==1", "=="],
    ["&=3982", "&="],
    ["&777", "&"],
    ["||xx", "||"],
    ["^=111", "^="],
    ["%7", "%"],
  ]

  tests.forEach(t => {
    const [input, expected] = t
    const it = new PeekIterator(arrayToGenerator([...input]))
    const token = Token.makeOp(it)
    assertToken(token, Types.OPERATOR, expected)
  })

}

export function makeNumber() {
  showTitle('makeNumber')

  const tests = [
    "+0 aa",
    "-0 bbb",
    ".3 ccc",
    ".5555 ddd",
    "7899.999 aaa",
    "-100 ggg",
    "-1000.5345345*123123",
    "012 aaa"
  ]

  tests.forEach(t => {
    const it = new PeekIterator(arrayToGenerator([...t]))
    const token = Token.makeNumber(it)
    const [expected] = t.split(/[ *]/)
    const type = t.indexOf('.') === -1 ? Types.INTEGER : Types.FLOAT
    assertToken(token, type, expected)
  })
}