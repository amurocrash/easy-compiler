import { AstNodeType } from "../AstNodeType";
import Stmt from "./Stmt";

export default class FunctionDelcareStmt extends Stmt {
  constructor() {
    super(AstNodeType.FUNCTION_DECLARE_STMT, 'func')
  }
}