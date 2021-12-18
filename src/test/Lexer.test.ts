import Lexer from '../tiny-script/lexer/Lexer'
import { assertEqual, assertToken, log, showTitle } from './helper.test'
import Types from '../tiny-script/lexer/TokenType'

export function expression() {
  showTitle('lexer expression')

  const source = '(a+b)^100.12==+100-20'
  const lexer = new Lexer()
  const tokens = lexer.analyze(source)
  assertEqual(tokens.length, 11)

  assertToken(tokens[0], Types.BRACKET, '(')
  assertToken(tokens[1], Types.VARIABLE, 'a')
  assertToken(tokens[2], Types.OPERATOR, '+')
  assertToken(tokens[3], Types.VARIABLE, 'b')
  assertToken(tokens[4], Types.BRACKET, ')')
  assertToken(tokens[5], Types.OPERATOR, '^')
  assertToken(tokens[6], Types.FLOAT, '100.12')
  assertToken(tokens[7], Types.OPERATOR, '==')
  assertToken(tokens[8], Types.INTEGER, '+100')
  assertToken(tokens[9], Types.OPERATOR, '-')
  assertToken(tokens[10], Types.INTEGER, '20')
}

export function func() {
  showTitle('lexer func')

  const source = `
    func foo(a,b) {
      print(a+b)
    }
    foo(-100.0, 100)
  ` 
  const lexer = new Lexer()
  const tokens = lexer.analyze(source)

  assertToken(tokens[0], Types.KEYWORD, 'func')
  assertToken(tokens[1], Types.VARIABLE, 'foo')
  assertToken(tokens[2], Types.BRACKET, '(')
  assertToken(tokens[3], Types.VARIABLE, 'a')
  assertToken(tokens[4], Types.OPERATOR, ',')
  assertToken(tokens[5], Types.VARIABLE, 'b')
  assertToken(tokens[6], Types.BRACKET, ')')
  assertToken(tokens[7], Types.BRACKET, '{')
  assertToken(tokens[8], Types.VARIABLE, 'print')
  assertToken(tokens[9], Types.BRACKET, '(')
  assertToken(tokens[10], Types.VARIABLE, 'a')
  assertToken(tokens[11], Types.OPERATOR, '+')
  assertToken(tokens[12], Types.VARIABLE, 'b')
  assertToken(tokens[13], Types.BRACKET, ')')
  assertToken(tokens[14], Types.BRACKET, '}')
  assertToken(tokens[15], Types.VARIABLE, 'foo')
  assertToken(tokens[16], Types.BRACKET, '(')
  assertToken(tokens[17], Types.FLOAT, '-100.0')
  assertToken(tokens[18], Types.OPERATOR, ',')
  assertToken(tokens[19], Types.INTEGER, '100')
  assertToken(tokens[20], Types.BRACKET, ')')
}

export function deleteComment() {
  showTitle('delete comment')
  const lexer = new Lexer()
  const source = `
    /*123123123
      123123123
    */
    var a=1
    //adnwjdbakd
    var b=2
  `
  const tokens = lexer.analyze(source)
  assertEqual(tokens.length, 8)
  assertToken(tokens[0], Types.KEYWORD, 'var')
  assertToken(tokens[1], Types.VARIABLE, 'a')
  assertToken(tokens[2], Types.OPERATOR, '=')
  assertToken(tokens[3], Types.INTEGER, '1')
  assertToken(tokens[4], Types.KEYWORD, 'var')
  assertToken(tokens[5], Types.VARIABLE, 'b')
  assertToken(tokens[6], Types.OPERATOR, '=')
  assertToken(tokens[7], Types.INTEGER, '2')
}