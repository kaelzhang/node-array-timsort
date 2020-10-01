const test = require('ava')

const {sort} = require('..')
const ArrayGenerator = require('../test/array-generator')


const numberCompare = (a, b) => a - b

const LENGTHS = [10, 100, 1000, 10000]

const CASES = [
  {
    d: 'Sort a Random Array'
  }
]


CASES.forEach(({
  d
}) => {
  LENGTHS.forEach(length => {
    test(`${d}: length: ${length}`, t => {
      const arr1 = ArrayGenerator.randomInt(length)
      const arr2 = arr1.slice()

      sort(arr1, numberCompare)
      arr2.sort(numberCompare)

      t.deepEqual(arr1, arr2)
    })
  })
})
