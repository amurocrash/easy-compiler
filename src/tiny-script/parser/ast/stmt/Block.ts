import { AstNodeType } from '../AstNodeType'
import Stmt from './Stmt'

export default class Block extends Stmt {
  constructor() {
    super(AstNodeType.BLOCK, 'block')
  }
}