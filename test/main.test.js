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
  10000,
  // 100000,
  // 1000000,
  // 10000000,
  // 100000000
]
const REPEATS = 10
const COMPARERS = [numberCompare, undefined]
const TEST_SUBRANGE = [true, false]

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


const run = (t, array, ...args) => {
  const range = args.slice(1)

  const arrayForSort = array.slice(...range)
  const arrayForTimeResultSort = array.slice()

  const result = sort(array, ...args)

  arrayForSort.sort(...args)
  sortByResult(arrayForTimeResultSort, result)

  if (range.length === 0) {
    t.deepEqual(array, arrayForSort, 'sort result not match')
    t.deepEqual(
      arrayForTimeResultSort, arrayForSort, 'result sort result not match'
    )

    return
  }

  const [lo, hi] = range

  let j = 0
  while (lo + j < hi) {
    t.is(array[lo + j], arrayForSort[j])
    t.is(arrayForTimeResultSort[lo + j], arrayForSort[j])
    j ++
  }
}


CASES.forEach(({
  d: description,
  i: inputGeneratorMethod
}) => {
  LENGTHS.forEach(length => {
    COMPARERS.forEach(comparer => {
      TEST_SUBRANGE.forEach(subrange => {
        const descComparer = comparer
          ? 'with comparer'
          : 'lexicographically'

        const descSubrange = subrange
          ? 'sub range'
          : 'full range'

        const repeats = length < 1e6
          ? REPEATS
          : 1

        test(
          `${description}, length: ${length}, ${descComparer}, ${descSubrange}`,
          t => {
            for (let i = 0; i < repeats; i ++) {
              const array = ArrayGenerator[inputGeneratorMethod](length)
              const args = [comparer]

              if (subrange) {
                const lo = parseInt(length / 4, 10)
                const hi = length - lo

                args.push(lo, hi)
              }

              run(t, array, ...args)
            }
          }
        )
      })
    })
  })
})


test('array of same strings', t => {
  run(t, ['1', 1])
})


test('very short array', t => {
  run(t, [1])
})


test('TypeError', t => {
  t.throws(() => sort(), {
    instanceOf: TypeError
  })
})
