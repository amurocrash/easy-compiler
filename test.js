class X {
  constructor(a, b) {
    this.a = a
    this.b = b
  }

  toString() {
    console.log(this.a, this.b, this.c)
  }
}

class F extends X {
  static exe() {
    const fImpl = new FImpl('fc')
    fImpl.toString()
  }

  constructor(c) {
    super()
    this.c = c
  }
}

class FImpl extends F {
  constructor(c){
    super(c)
    this.a = 'fa'
    this.b = 'fb'
  }
}

F.exe()