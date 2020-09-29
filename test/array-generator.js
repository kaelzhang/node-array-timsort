const ArrayGenerator = {}

ArrayGenerator.randomInt = function (n) {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(parseInt(Math.random() * 9007199254740992))
  }
  return arr
}

ArrayGenerator.descendingInt = function (n) {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(n - i)
  }
  return arr
}

ArrayGenerator.ascendingInt = function (n) {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(i)
  }
  return arr
}

ArrayGenerator.ascending3RandomExchangesInt = function (n) {
  const arr = []
  for (var i = 0; i < n; i ++) {
    arr.push(i)
  }
  for (i = 0; i < 1; i ++) {
    const first = parseInt(Math.random() * n)
    const second = parseInt(Math.random() * n)
    const tmp = arr[first]
    arr[first] = arr[second]
    arr[second] = tmp
  }
  return arr
}

ArrayGenerator.ascending10RandomEndInt = function (n) {
  const arr = []
  for (var i = 0; i < n; i ++) {
    arr.push(i)
  }
  const endStart = n - 10
  for (i = endStart; i < n; i ++) {
    arr[i] = parseInt(Math.random() * n)
  }
  return arr
}

ArrayGenerator.allEqualInt = function (n) {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(42)
  }
  return arr
}

ArrayGenerator.manyDuplicateInt = function (n) {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(parseInt(Math.random() * (n / 2 * (Math.log(n) / Math.LN10))))
  }
  return arr
}

ArrayGenerator.someDuplicateInt = function (n) {
  const arr = []
  for (let i = 0; i < n; i ++) {
    arr.push(parseInt(Math.random() * n))
  }
  return arr
}

module.exports = ArrayGenerator
