import Token from "../../../lexer/Token";
import { AstNodeType } from "../AstNodeType";
import Factor from "./Factor";

export default class Scalar extends Factor {
  constructor(token: Token) {
    super(token)

    this.type = AstNodeType.SCALAR
  }
}