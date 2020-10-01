const test = require('ava')

const {sort} = require('..')
const ArrayGenerator = require('../test/array-generator')


const numberCompare = (a, b) => a - b

const sortByResult = (array, result) => {
  const a = array.slice()

  result.forEach((fromIndex, i) => {
    array[i] = a[fromIndex]
  })
}

const LENGTHS = [
  10,
  100,
  1000,
  10000
]
const REPEATS = 10
const COMPARERS = [numberCompare, undefined]

const CASES = [
  {
    d: 'Sort a Random Array',
    i: 'randomInt'
  },
  {
    d: 'Sort a Descending Array',
    i: 'descendingInt'
  },
  {
    d: 'Sort an Ascending Array',
    i: 'ascendingInt'
  },
  {
    d: 'Sort an Ascending Array with 3 Random Exchanges',
    i: 'ascending3RandomExchangesInt'
  },
  {
    d: 'Sort an Ascending Array with 10 Random Elements at Last',
    i: 'ascending10RandomEndInt'
  },
  {
    d: 'Sort an Array of all Equal Elements',
    i: 'allEqualInt'
  },
  {
    d: 'Sort an Array with Many Duplicates',
    i: 'manyDuplicateInt'
  },
  {
    d: 'Sort an Array with Some Duplicates',
    i: 'someDuplicateInt'
  },
]


CASES.forEach(({
  d: description,
  i: inputGeneratorMethod
}) => {
  LENGTHS.forEach(length => {
    COMPARERS.forEach(comparer => {
      const descComparer = comparer
        ? 'with comparer'
        : 'lexicographically'

      test(`${description}, length: ${length}, ${descComparer}`, t => {
        for (let i = 0; i < REPEATS; i ++) {
          const arrayForTimsort = ArrayGenerator[inputGeneratorMethod](length)
          const arrayForSort = arrayForTimsort.slice()
          const arrayForTimeResultSort = arrayForTimsort.slice()

          const result = sort(arrayForTimsort, comparer)

          arrayForSort.sort(comparer)
          sortByResult(arrayForTimeResultSort, result)

          t.deepEqual(arrayForTimsort, arrayForSort, 'sort result not match')
          t.deepEqual(
            arrayForTimeResultSort, arrayForSort, 'result sort result not match'
          )
        }
      })
    })
  })
})
