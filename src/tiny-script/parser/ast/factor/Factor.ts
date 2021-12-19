import Token from "../../../lexer/Token";
import AstNode from "../AstNode";

export default class Factor extends AstNode {

  constructor(token: Token) {
    super()
    this.lexeme = token
    this.label = token.getValue()
  }
}

// export function parse(it: PeekTokenIterator) {
//   const token = it.peek() as Token
//   const type = token.getType()

//   if (type === Types.VARIABLE) {
//     it.next()
//     return new Variable(token)
//   } else if(token.isScalar()) {
//     it.next()
//     return new Scalar(token)
//   }

//   return null
// }