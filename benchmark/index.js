const TimSort = require('../index.js')
const ArrayGenerator = require('../test/array-generator.js')

function numberCompare (a, b) {
  return a - b
}

const lengths = [10, 100, 1000, 10000]

function repetitionsFromLength (n) {
  return parseInt(12000000 / (n * (Math.log(n) / Math.LN10)))
}

const PrettyPrinter = function () {
  this.str = ''
}

PrettyPrinter.prototype.addAt = function (value, at) {
  while (at > this.str.length) {
    this.str += ' '
  }
  this.str += value
}

PrettyPrinter.prototype.toString = function () {
  return this.str
}

const defaultResults = {}
const timsortResults = {}

let printer = new PrettyPrinter()
printer.addAt('ArrayType', 0)
printer.addAt('Length', 30)
printer.addAt('TimSort', 37)
printer.addAt('array.sort', 47)
printer.addAt('Speedup', 59)
console.log(printer.toString())

for (const generatorName in ArrayGenerator) {
  if (ArrayGenerator.hasOwnProperty(generatorName)) {
    const generator = ArrayGenerator[generatorName]
    defaultResults[generatorName] = {}
    timsortResults[generatorName] = {}

    for (let j = 0; j < lengths.length; j ++) {
      const length = lengths[j]

      let defaultTime = 0
      let timsortTime = 0
      const repetitions = repetitionsFromLength(length)

      for (let i = 0; i < repetitions; i ++) {
        const arr1 = generator(length)
        const arr2 = arr1.slice()

        let start = process.hrtime()
        arr1.sort(numberCompare)
        let stop = process.hrtime()

        let startNano = start[0] * 1000000000 + start[1]
        let stopNano = stop[0] * 1000000000 + stop[1]
        defaultTime += stopNano - startNano

        start = process.hrtime()
        TimSort.sort(arr2, numberCompare)
        stop = process.hrtime()

        startNano = start[0] * 1000000000 + start[1]
        stopNano = stop[0] * 1000000000 + stop[1]
        timsortTime += stopNano - startNano
      }

      defaultResults[generatorName][length] = defaultTime / repetitions
      timsortResults[generatorName][length] = timsortTime / repetitions
      printer = new PrettyPrinter()
      printer.addAt(generatorName, 0)
      printer.addAt(length, 30)
      printer.addAt(parseInt(timsortResults[generatorName][length]), 37)
      printer.addAt(parseInt(defaultResults[generatorName][length]), 47)
      printer.addAt(defaultResults[generatorName][length]
        / timsortResults[generatorName][length], 59)
      console.log(printer.toString())
    }
  }
}
