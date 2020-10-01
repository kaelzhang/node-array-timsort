const ArrayGenerator = {}

ArrayGenerator.randomInt = n => {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(parseInt(Math.random() * 9007199254740992, 10))
  }
  return arr
}

ArrayGenerator.descendingInt = n => {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(n - i)
  }
  return arr
}

ArrayGenerator.ascendingInt = n => {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(i)
  }
  return arr
}

ArrayGenerator.ascending3RandomExchangesInt = n => {
  const arr = []
  let i
  for (i = 0; i < n; i ++) {
    arr.push(i)
  }
  for (i = 0; i < 1; i ++) {
    const first = parseInt(Math.random() * n, 10)
    const second = parseInt(Math.random() * n, 10)
    const tmp = arr[first]
    arr[first] = arr[second]
    arr[second] = tmp
  }
  return arr
}

ArrayGenerator.ascending10RandomEndInt = n => {
  const arr = []
  let i
  for (i = 0; i < n; i ++) {
    arr.push(i)
  }
  const endStart = n - 10
  for (i = endStart; i < n; i ++) {
    arr[i] = parseInt(Math.random() * n, 10)
  }
  return arr
}

ArrayGenerator.allEqualInt = n => {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(42)
  }
  return arr
}

ArrayGenerator.manyDuplicateInt = n => {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(
      parseInt(Math.random() * (n / 2 * (Math.log(n) / Math.LN10)), 10)
    )
  }
  return arr
}

ArrayGenerator.someDuplicateInt = n => {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(parseInt(Math.random() * n, 10))
  }
  return arr
}

module.exports = ArrayGenerator
