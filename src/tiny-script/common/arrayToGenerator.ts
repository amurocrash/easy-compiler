function * arrayToGenerator(arr: any[]) {
  for(let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

export default arrayToGenerator