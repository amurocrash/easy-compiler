import AstNode from '../AstNode'
import { AstNodeType } from '../AstNodeType'

export default class Stmt extends AstNode {
  constructor(type: AstNodeType, label: string) {
    super(type, label)
  }
}