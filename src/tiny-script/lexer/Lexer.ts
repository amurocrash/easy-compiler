import AlphabetHelper from '../common/AlphabetHelper'
import arrayToGenerator from '../common/arrayToGenerator'
import PeekIterator from '../common/PeekIterator'
import LexicalException from './LexicalException'
import Token from './Token'
import Types from './TokenType'

class Lexer {
  
  analyze(source: string) {
    const tokens: Token[] = []
    const it = new PeekIterator(arrayToGenerator([...source]), '\0')

    while(it.hasNext()) {
      let c = it.next()
      if (c === '\0') {
        break
      }
      const lookahead = it.peek()

      if(c === ' ' || c === '\n' || c === '\r') {
        continue
      }

      if (c === '/') {
        if (lookahead === '/') {
          while(it.hasNext() && ((c = it.next()) !== '\n')) {
            continue
          } // 跳过所有的注释内容，跳过后回到大循环
          continue
        } else {
          if (lookahead === '*') {
            let valid = false
            while(it.hasNext()) {
              const p = it.next()
              if (p === '*' && it.peek() === '/') {
                valid = true
                it.next()
                break
              }
            }
            if (!valid) {
              throw new LexicalException(`comment /* not valid`)
            }

            continue
          }
        }
      }

      if (c === '{' || c === '}' || c === '(' || c === ')') {
        tokens.push(new Token(Types.BRACKET, c))
        continue
      }

      if (c === '"' || c === "'") {
        it.putBack()
        tokens.push(Token.makeString(it))
        continue
      }

      if (AlphabetHelper.isLetter(c)) {
        it.putBack()
        tokens.push(Token.makeVarOrKeyword(it))
        continue
      }

      if (AlphabetHelper.isNumber(c)) {
        it.putBack()
        tokens.push(Token.makeNumber(it))
        continue
      }

      if ((c === '+' || c === '-') && AlphabetHelper.isNumber(lookahead)) {
        const lastToken = tokens[tokens.length - 1] || null

        // 处理 +5 =-5
        if (lastToken == null || !lastToken.isValue()) {
          it.putBack()
          tokens.push(Token.makeNumber(it))
          continue
        }
      }

      if (AlphabetHelper.isOperator(c)) {
        it.putBack()
        tokens.push(Token.makeOp(it))
        continue
      }

      throw new LexicalException('Unknown error when lexer analyzing')

    }


    return tokens
  }
}

export default Lexer