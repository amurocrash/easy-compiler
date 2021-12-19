import Token from '../lexer/Token'
import { AstNodeType } from './ast/AstNodeType'
import Expr from './ast/expr/Expr'
import Scalar from './ast/factor/Scalar'
import Variable from './ast/factor/Variable'
import ParseException from './ParseException'
import PeekTokenIterator from './utils/PeekTokenIterator'
import Types from '../lexer/TokenType'

function factorParse(it: PeekTokenIterator) {
  const token = it.peek() as Token
  const type = token.getType()

  if (type === Types.VARIABLE) {
    it.next()
    return new Variable(token)
  } else if(token.isScalar()) {
    it.next()
    return new Scalar(token)
  }

  return null
}

export default class Parser {

  static simpleParse(it: PeekTokenIterator) {

    const expr = new Expr()
    const scalar = factorParse(it)

    if (scalar == null) {
      throw new ParseException('scalar is null')
    }

    if(!it.hasNext()) {
      return scalar
    }

    expr.addChild(scalar)
    const op = it.nextMatchValue('+')
    expr.label = '+'
    expr.type = AstNodeType.BINARY_EXPR
    expr.lexeme = op
    expr.addChild(Parser.simpleParse(it))

    return expr
  }
}