export default class Enum {
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