/**
 * Advent of Code - Day 12
 * Subterranean Sustainability: https://adventofcode.com/2018/day/12
 */

const initialState = '#.#####.##.###...#...#.####..#..#.#....##.###.##...#####.#..##.#..##..#..#.#.#.#....#.####....#..#'
const rules = {
  '#.#..': '.',
  '..###': '.',
  '...##': '.',
  '.####': '#',
  '.###.': '#',
  '#....': '.',
  '#.#.#': '.',
  '###..': '#',
  '#..#.': '.',
  '#####': '#',
  '.##.#': '#',
  '.#...': '.',
  '##.##': '#',
  '#...#': '#',
  '.#.##': '.',
  '##..#': '.',
  '.....': '.',
  '.#.#.': '#',
  '#.###': '#',
  '....#': '.',
  '...#.': '#',
  '..#.#': '#',
  '##...': '#',
  '####.': '#',
  '#..##': '#',
  '##.#.': '#',
  '###.#': '.',
  '#.##.': '.',
  '..#..': '#',
  '.#..#': '.',
  '..##.': '.',
  '.##..': '#'
}

const updateState = (state, rules) => {
  let newState = ''
  for (let i = 0; i < state.length; i++) {
    let section = state.substr(i - 2, 5)

    const match = Object.keys(rules).find(key => {
      if (key === section) return true
      return false
    })

    newState += (match ? rules[match] : '.')
  }
  return newState
}

const partOne = (state, rules) => {
  const shift = 3
  // This is hacky, but it works...
  state = '...' + state + '..................'
  let newState = state

  console.log(' 0:', state)
  for (let i = 1; i < 21; i++) {
    newState = updateState(newState, rules)
    if (i < 10) {
      console.log(' '+ i + ':', newState)
    } else {
      console.log(i + ':', newState)
    }
  }

  // Count the score
  return newState.split('').reduce((acc, value, key) => {
    if (value === '#') {
      console.log(acc,'+', key - shift)
      acc += key - shift
    }
    return acc
  }, 0)
}


//console.log('Part One:', partOne(initialState, rules)) // 4200


/**
 * Part Two
 */

// At 186, it started repeating adding 194
const limit = 185
const partTwo = (state, rules) => {
  const shift = 3
  // This is hacky, but it works...
  state = '...' + state + '......................................................................................................................................................................................................'
  let newState = state

  let totalSum = 0
  let lastSum = 0

  // At 186, it started repeating adding 194
  for (let i = 1; i <= limit; i++) {
    newState = updateState(newState, rules)

    /*
    // The below helped to monitor what pattern
    // occurred when searching for part two's answer
    // Find the sum
    const sum = newState.split('').reduce((acc, value, key) => {
      if (value === '#') {
        acc += key - shift
      }
      return acc
    }, 0)

    totalSum += sum

    console.log(i + ':', 'newTotal:', totalSum)
    console.log('  --', 'sum:', sum, '-', lastSum, '=', sum - lastSum)
    lastSum = sum
    */
  }

  // Count the score
  return newState.split('').reduce((acc, value, key) => {
    if (value === '#') {
      acc += key - shift
    }
    return acc
  }, 0)
}

const partTwoTotal = partTwo(initialState, rules)
console.log('twoTotal:', partTwoTotal)
console.log(((50000000000 - limit) * 194) + partTwoTotal) // 9699999999321