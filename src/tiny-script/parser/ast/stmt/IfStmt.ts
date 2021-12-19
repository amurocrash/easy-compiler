import { AstNodeType } from "../AstNodeType";
import Stmt from "./Stmt";

export default class IfStmt extends Stmt {
  constructor() {
    super(AstNodeType.IF_STMT, 'if')
  }
}