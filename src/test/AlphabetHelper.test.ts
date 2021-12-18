import AlphabetHelper from '../tiny-script/common/AlphabetHelper'

const log = console.log

export function test() {
  log(AlphabetHelper.isLetter('g'))
  log(AlphabetHelper.isNumber('4'))
  log(AlphabetHelper.isLiteral('_'))
  log(AlphabetHelper.isOperator('*'))
}