export class TokenType {
  type = ''
  value = 0

  constructor(type: string, value: number) {
    this.type = type
    this.value = value
  }

  toString() {
    return this.type
  }
}

export default {
  KEYWORD: new TokenType('KEYWORD', 1),
  VARIABLE: new TokenType('VARIABLE', 2),
  OPERATOR: new TokenType('OPERATOR', 3),
  BRACKET: new TokenType('BRACKET', 4),
  INTEGER: new TokenType('INTEGER', 5),
  FLOAT: new TokenType('FLOAT', 6),
  BOOLEAN: new TokenType('BOOLEAN', 7),
  STRING : new TokenType("STRING", 8)
}