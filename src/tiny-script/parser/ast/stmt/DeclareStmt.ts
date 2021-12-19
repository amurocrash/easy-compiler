import { AstNodeType } from "../AstNodeType";
import Stmt from "./Stmt";

export default class DeclareStmt extends Stmt {
  constructor() {
    super(AstNodeType.DECLARE_STMT, 'declare')
  }
}