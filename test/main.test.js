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

const CASES = [
  {
    d: 'Sort a Random Array',
    i: length => ArrayGenerator.randomInt(length),
    c: numberCompare
  },
  {
    d: 'Sort a Descending Array',
    i: length => ArrayGenerator.descendingInt(length),
    c: numberCompare
  },
  {
    d: 'Sort an Ascending Array',
    i: length => ArrayGenerator.ascendingInt(length),
    c: numberCompare
  },
  {
    d: 'Sort an Ascending Array with 3 Random Exchanges',
    i: length => ArrayGenerator.ascending3RandomExchangesInt(length),
    c: numberCompare
  },
  {
    d: 'Sort an Ascending Array with 10 Random Elements at Last',
    i: length => ArrayGenerator.ascending10RandomEndInt(length),
    c: numberCompare
  },
  {
    d: 'Sort an Array of all Equal Elements',
    i: length => ArrayGenerator.allEqualInt(length),
    c: numberCompare
  },
  {
    d: 'Sort an Array with Many Duplicates',
    i: length => ArrayGenerator.manyDuplicateInt(length),
    c: numberCompare
  },
  {
    d: 'Sort an Array with Some Duplicates',
    i: length => ArrayGenerator.someDuplicateInt(length),
    c: numberCompare
  },
]


CASES.forEach(({
  d: description,
  i: input,
  c: comparer
}) => {
  LENGTHS.forEach(length => {
    [comparer, undefined].forEach(c => {
      const descComparer = c
        ? 'with comparer'
        : 'lexicographically'

      test(`${description}, length: ${length}, ${descComparer}`, t => {
        for (let i = 0; i < REPEATS; i ++) {
          const arrayForTimsort = input(length)
          const arrayForSort = arrayForTimsort.slice()
          const arrayForTimeResultSort = arrayForTimsort.slice()

          const result = sort(arrayForTimsort, c)

          arrayForSort.sort(c)
          sortByResult(arrayForTimeResultSort, result)

          t.deepEqual(arrayForTimsort, arrayForSort, 'sort result not match')
          // t.deepEqual(
          //   arrayForTimeResultSort, arrayForSort, 'result sort result not match'
          // )
        }
      })
    })
  })
})
