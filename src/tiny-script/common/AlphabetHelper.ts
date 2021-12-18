class AlphabetHelper {
  static ptnLetter = /^[a-zA-Z]$/
  static ptnNumber = /^[0-9]$/
  static ptnLiteral = /^[_a-zA-Z0-9]$/
  static ptnOperator = /^[+-\\*/><=!&|^%]$/

  static isLetter(c: string) {
    return AlphabetHelper.ptnLetter.test(c)
  }

  static isNumber(c: string) {
    return AlphabetHelper.ptnNumber.test(c)
  }

  static isLiteral(c: string) {
    return AlphabetHelper.ptnLiteral.test(c)
  }

  static isOperator(c: string) {
    return AlphabetHelper.ptnOperator.test(c)
  }
}

export default AlphabetHelper