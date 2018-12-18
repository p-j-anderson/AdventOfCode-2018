/**
 * Advent of Code - Day 18
 * Settlers of The North Pole: https://adventofcode.com/2018/day/18
 */

const fs = require('fs')
const input = fs.readFileSync('./inputs/Day18.txt', 'utf8').split('\n')

const getInitialState = input => {
  state = []
  input
    .map(line => line.split(''))
    .forEach((line, y) => {
      state[y] = []
      line.forEach((space, x) => {
        state[y][x] = space
      })
    })
  return state
}

const addTreeSearch = values => {
  const treeCount = values.reduce((count, space) => {
    if (space === '|') count++
    return count
  }, 0)

  return (treeCount >= 3)
}

const addLumberyardSearch = values => {
  const lumberCount = values.reduce((count, space) => {
    if (space === '#') count ++
    return count
  }, 0)

  return (lumberCount >= 3)
}

const changeLumberyardSearch = values => {
  const changeCount = values.reduce((counts, space) => {
    if (space === '#') counts.lumber++
    if (space === '|') counts.tree++
    return counts
  }, {tree: 0, lumber: 0})

  return (changeCount.lumber < 1 || changeCount.tree < 1)
}

const updateState = state => {
  // Duplicate state
  const newState = state.map(line => line.slice(0))
  const search = 1

  // Loop through x/y
  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[y].length; x++) {
      // Define the space and bounds
      const space = state[y][x]
      const xMin = x - search
      const xMax = x + search
      const yMin = y - search
      const yMax = y + search

      // Get the adjacent search space
      const searchValues = []
      //console.log('search:', y, '|', yMin, xMin, '-', yMax, xMax)
      for (let yy = yMin; yy <= yMax; yy++) {
        for (let xx = xMin; xx <= xMax; xx++) {
          // Exclude bounds
          if (yy >= 0 && xx >= 0 && yy < state.length && xx < state[y].length) {   
            if (!(xx === x && yy === y)) {
              //if (y === 9) console.log(yy, xx, state[yy][xx])
              searchValues.push(state[yy][xx])
            }
          }
        }
      }

      // Go through the various serach types
      // Open ground
      if (space === '.') {
        //console.log(y, x, searchValues)
        const addTree = addTreeSearch(searchValues)
        if (addTree) newState[y][x] = '|'
      // Tree 
      } else if (space === '|') {
        const addLumberyard = addLumberyardSearch(searchValues)
        if (addLumberyard) newState[y][x] = '#'
      // Lumberyard
      } else if (space === '#') {
        const changeLumberyard = changeLumberyardSearch(searchValues)
        if (changeLumberyard) newState[y][x] = '.'
      }
    }
  }

  return newState
}

const countLumber = state => {
  // Get the counts
  let tree = 0
  let lumber = 0
  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[y].length; x++) {
      if (state[y][x] === '|') tree++
      if (state[y][x] === '#') lumber++
    }
  }

  return {tree, lumber}
}

const partOne = input => {
  const limit = 10
  let minutes = 0
  let state = getInitialState(input)

  // Loop the required amount of times
  while (minutes < limit) {
    state = updateState(state)
    minutes++
  }

  const {tree, lumber} = countLumber(state)
  console.log('Trees:', tree, 'Lumberyards:', lumber)
  return tree * lumber
}

console.log('Part One:', partOne(input))


/**
 * Part Two
 */

const partTwo = input => {
  let state = getInitialState(input)
  let minutes = 1

  // Track the pattern
  let patternMinute
  let pattern = 0
  let keys = []

  // A pattern begins at 433
  while (pattern < 2) {
  // while (minutes < 1000) { // <-- Helps to find the intial pattern
    state = updateState(state)
    const {tree, lumber} = countLumber(state)
    const total = tree * lumber

    /* This helped find the initial pattern
    console.log(minutes, 'Trees:', tree, 'Lumberyards:', lumber, 'Total:', total)
    */

    // Define when to start couting
    if (total === 191070) {
      if (!pattern) patternMinute = minutes
      pattern++
    }

    // Add keys to the pattern
    if (pattern === 1) {
      keys.push(total)
    }

    minutes++
  }

  return (keys[(1000000000 - patternMinute) % keys.length])
}

console.log('Part Two:', partTwo(input))
