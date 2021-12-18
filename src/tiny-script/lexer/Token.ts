import AlphabetHelper from '../common/AlphabetHelper'
import PeekIterator from '../common/PeekIterator'
import LexicalException from './LexicalException'
import Types, { Keywords, TokenType } from './TokenType'

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

  getValue() {
    return this.value
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

  isValue() {
    return this.isScalar() || this.isVariable();
  }

  toString() {
    return `type ${this.type}, value ${this.value}`
  }

  static makeVarOrKeyword(it: PeekIterator) {
    let s = ''

    while(it.hasNext()) {
      const c = it.peek()
      if (AlphabetHelper.isLiteral(c)) {
        s += c
      } else {
        break
      }

      it.next()
    }

    if (Keywords.has(s)) {
      return new Token(Types.KEYWORD, s)
    }

    if (s === 'true' || s === 'false') {
      return new Token(Types.BOOLEAN, s)
    }

    return new Token(Types.VARIABLE, s)
  }

  static makeString (it: PeekIterator) {
    let s = ''
    let state = 0

    while(it.hasNext()) {
      const c = it.next()

      switch(state) {
        case 0: {
          if (c === '"') {
            state = 1
          } else {
            state = 2
          }

          s += c
          break
        }
        case 1: {
          if (c === '"') {
            return new Token(Types.STRING, s + c)
          } else {
            s += c
          }
          break
        }
        case 2: {
          if (c === "'") {
            return new Token(Types.STRING, s + c)
          } else {
            s += c
          }

          break
        }
      }
    }

    throw new LexicalException('unexpected error occurred when making string')
  }

  static makeOp(it: PeekIterator) {
    let state = 0
    while (it.hasNext()) {
      let lookahead = it.next()

      switch (state) {
        case 0:
          switch (lookahead) {
            case '+':
              state = 1
              break
            case '-':
              state = 2
              break
            case '*':
              state = 3
              break
            case '/':
              state = 4
              break
            case '>':
              state = 5
              break
            case '<':
              state = 6
              break
            case '=':
              state = 7
              break
            case '!':
              state = 8
              break
            case '&':
              state = 9
              break
            case '|':
              state = 10
              break
            case '^':
              state = 11
              break
            case '%':
              state = 12
              break
            case ',':
              return new Token(Types.OPERATOR, ',')
            case ';':
              return new Token(Types.OPERATOR, ';')
          }
          break
        case 1: {
          if (lookahead == '+') {
            return new Token(Types.OPERATOR, '++')
          } else if (lookahead == '=') {
            return new Token(Types.OPERATOR, '+=')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '+')
          }
        }
        case 2:
          if (lookahead == '-') {
            return new Token(Types.OPERATOR, '--')
          } else if (lookahead == '=') {
            return new Token(Types.OPERATOR, '-=')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '-')
          }
        case 3:
          if (lookahead == '=') {
            return new Token(Types.OPERATOR, '*=')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '*')
          }
        case 4:
          if (lookahead == '=') {
            return new Token(Types.OPERATOR, '/=')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '/')
          }
        case 5:
          if (lookahead == '=') {
            return new Token(Types.OPERATOR, '>=')
          } else if (lookahead == '>') {
            return new Token(Types.OPERATOR, '>>')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '>')
          }
        case 6:
          if (lookahead == '=') {
            return new Token(Types.OPERATOR, '<=')
          } else if (lookahead == '<') {
            return new Token(Types.OPERATOR, '<<')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '<')
          }
        case 7:
          if (lookahead == '=') {
            return new Token(Types.OPERATOR, '==')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '=')
          }
        case 8:
          if (lookahead == '=') {
            return new Token(Types.OPERATOR, '!=')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '!')
          }
        case 9:
          if (lookahead == '&') {
            return new Token(Types.OPERATOR, '&&')
          } else if (lookahead == '=') {
            return new Token(Types.OPERATOR, '&=')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '&')
          }
        case 10:
          if (lookahead == '|') {
            return new Token(Types.OPERATOR, '||')
          } else if (lookahead == '=') {
            return new Token(Types.OPERATOR, '|=')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '|')
          }
        case 11:
          if (lookahead == '^') {
            return new Token(Types.OPERATOR, '^^')
          } else if (lookahead == '=') {
            return new Token(Types.OPERATOR, '^=')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '^')
          }
        case 12:
          if (lookahead == '=') {
            return new Token(Types.OPERATOR, '%=')
          } else {
            it.putBack()
            return new Token(Types.OPERATOR, '%')
          }
      }
    } // end while

    throw new LexicalException('Unexpected error when making Operator')
  }

  static makeNumber(it: PeekIterator) {
    let state = 0
    let s = ''

    while(it.hasNext()) {
      const lookahead = it.peek()

      switch(state) {
        case 0: {
          if (lookahead === '0') {
            state = 1
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '+' || lookahead === '-') {
            state = 3
          } else if (lookahead === '.') {
            state = 5
          }
          break
        }
        case 1: {
          if (lookahead === '0') {
            state = 1
          } else if (lookahead === '.') {
            state = 4
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else {
            return new Token(Types.INTEGER, s)
          }
          break
        }
        case 2: {
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 4
          } else {
            return new Token(Types.INTEGER, s)
          }
          break
        }
        case 3: {
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 2
          } else if (lookahead === '.') {
            state = 5
          } else {
            throw new LexicalException(`unable to parse ${lookahead} after + or -`)
          }
          break
        }
        case 4: {
          if (lookahead === '.') {
            throw new LexicalException(`unable to parse . after .`)
          } else if (AlphabetHelper.isNumber(lookahead)) {
            state = 4
          } else {
            return new Token(Types.FLOAT, s)
          }
          break
        }
        case 5: {
          if (AlphabetHelper.isNumber(lookahead)) {
            state = 4
          } else {
            throw new LexicalException(`unable parse ${lookahead} after .`)
          }
          break
        }
      }
      
      s += lookahead
      it.next()
    } // end while

    throw new LexicalException('Unexpected error while making number')
  }
}

export default Token
