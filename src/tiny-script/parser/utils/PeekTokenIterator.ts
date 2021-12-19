import PeekIterator from '../../common/PeekIterator'
import Token from '../../lexer/Token'
import { TokenType } from '../../lexer/TokenType'
import ParseException from '../ParseException'

export default class PeekTokenIterator extends PeekIterator {
  constructor(it: Generator) {
    super(it)
  }

  nextMatchValue(value: any) {
    const token = this.next() as Token
    if (token.getValue() !== value) {
      throw new ParseException(`Error when parsing token value: ${token.getValue()}, but need value: ${value}`)
    }

    return token
  }

  nextMatchType(type: TokenType) {
    const token = this.next() as Token
    if (token.getType() !== type) {
      throw new ParseException(`Error when parsing token type: ${token.getType()}, but need value: ${type}`)
    }

    return token
  }
}