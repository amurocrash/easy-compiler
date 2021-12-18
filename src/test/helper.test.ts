import Token from '../tiny-script/lexer/Token'
import { TokenType } from '../tiny-script/lexer/TokenType'

export const log = console.log

export function showTitle(title: string) {
  log(`======================${title}=======================`)
}

export function assertEqual(a: any, b: any) {
  log(a === b)
}

export function assertToken(token: Token, type: TokenType, value: any) {
  log(token.getType() == type && token.getValue() === value)
}