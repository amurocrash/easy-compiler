import arrayToGenerator from "../tiny-script/common/arrayToGenerator"
import Lexer from "../tiny-script/lexer/Lexer"
import Parser from "../tiny-script/parser/Parser"
import PeekTokenIterator from "../tiny-script/parser/utils/PeekTokenIterator"
import { assertEqual } from "./helper.test"

export function simple() {
  const source = '1+2+3+4'

  const lexer = new Lexer()
  const tokens = lexer.analyze(source)
  const it = new PeekTokenIterator(arrayToGenerator(tokens))

  const expr = Parser.simpleParse(it)
  console.log(expr)
  assertEqual(expr.children.length, 2)

  const v1 = expr.getChild(0)
  assertEqual(v1.getLexeme()?.getValue(), '1')
  assertEqual(expr.getLexeme()?.getValue(), '+')

  const expr1 = expr.getChild(1)
  const v2 = expr1.getChild(0)
  assertEqual(v2.getLexeme()?.getValue(), '2')
  assertEqual(expr1.getLexeme()?.getValue(), '+')

  const expr2 = expr1.getChild(1)
  const v3 = expr2.getChild(0)
  assertEqual(v3.getLexeme()?.getValue(), '3')
  assertEqual(expr2.getLexeme()?.getValue(), '+')

  const v4 = expr2.getChild(1)
  assertEqual(v4.getLexeme()?.getValue(), '4')

  expr.print()
}