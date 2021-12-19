import { AstNodeType } from "../AstNodeType";
import Stmt from "./Stmt";

export default class ForStmt extends Stmt {
  constructor() {
    super(AstNodeType.FOR_STMT, 'for')
  }
}