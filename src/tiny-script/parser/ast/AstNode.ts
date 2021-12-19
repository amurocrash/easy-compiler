import Token from '../../lexer/Token'
import { AstNodeType } from './AstNodeType'
import Expr from './expr/Expr'
import Factor from './factor/Factor'
import Scalar from './factor/Scalar'
import Variable from './factor/Variable'

class AstNode {
  children: AstNodeImpl[] = []
  parent: AstNodeImpl | null = null
  lexeme: Token | null = null
  type: AstNodeType | null = null
  label: string
  props = {}

  constructor(type: AstNodeType | null = null, label: string = '') {
    this.type = type
    this.label = label
  }

  getChild(index: number) {
    return this.children[index]
  }

  addChild(node: AstNodeImpl) {
    node.parent = this
    this.children.push(node)
  }

  getLabel() {
    return this.label
  }

  getLexeme(){
    return this.lexeme
  }

  getType(){
      return this.type
  }

  setLexeme(lexeme: Token) {
      this.lexeme = lexeme
  }

  getChildren(){
      return this.children
  }

  print(intend = 0) {
    console.log(`${''.padStart(intend * 2, ' ')}${this.label}`)
    this.children.forEach(child => child.print(intend + 1))
  }
}

export default AstNode

export type AstNodeImpl = Expr | Factor | Variable | Scalar