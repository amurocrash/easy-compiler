import Types, { TokenType } from './TokenType'

class Token {
  private type: TokenType
  private value: any

  constructor(type: TokenType, value: any) {
    this.type = type
    this.value = value
  }

  getType() {
    return this.type
  }

  isVariable() {
    return this.type == Types.VARIABLE
  }
  
  isScalar() {
    return this.type == Types.INTEGER || 
      this.type == Types.BOOLEAN ||
      this.type == Types.STRING ||
      this.type == Types.FLOAT
  }

  toString() {
    return `type ${this.type}, value ${this.value}`
  }
}
