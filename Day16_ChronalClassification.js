/**
 * Advent of Code - Day 16
 * Chronal Classification: https://adventofcode.com/2018/day/16
 */

const fs = require('fs')
const input1 = fs.readFileSync('./inputs/day16a.txt', 'utf8').split('\n')
const input2 = fs.readFileSync('./inputs/day16b.txt', 'utf8').split('\n')

// Splits the input into objects
const splitIntoChunks = input => {
  const instructions = []

  // Loop through the steps
  for (let i = 0; i < input.length; i++) {
    const newObj = {}
    // Group into sections of four
    for (let j = 0; j < 4; j++) {
      const str = input[i]

      // check for before/after
      if (str.includes('Before') || str.includes('After')) {
        const key = (str.includes('Before') ? 'before' : 'after')
        newObj[key] = str.substr(str.indexOf('[') + 1, str.indexOf(']') - 9).split(', ').map(x => +x)
      // Ignore blank lines
      } else if (str !== '') {
        newObj['values'] = str.split(' ').map(x => +x)
      }

      // Increment i when needed
      if (j < 3) {
        i++ 
      } else {
        // Add the new instruction
        instructions.push(newObj)
      }
    }
  }

  return instructions
}

/**
 * Register actions
 */
 const actions = {
  addr: (before, a, b) => before[a] + before[b],
  addi: (before, a, b) => before[a] + b,
  mulr: (before, a, b) => before[a] * before[b],
  muli: (before, a, b) => before[a] * b,
  banr: (before, a, b) => (before[a] & before[b]),
  bani: (before, a, b) => (before[a] & b),
  borr: (before, a, b) => (before[a] | before[b]),
  bori: (before, a, b) => (before[a] | b),
  setr: (before, a, b) => before[a],
  seti: (before, a, b) => a,
  gtir: (before, a, b) => (a > before[b] ? 1 : 0),
  gtri: (before, a, b) => (before[a] > b ? 1 : 0),
  gtrr: (before, a, b) => (before[a] > before[b] ? 1 : 0),
  eqir: (before, a, b) => (a === before[b] ? 1 : 0),
  eqri: (before, a, b) => (before[a] === b ? 1 : 0),
  eqrr: (before, a, b) => (before[a] === before[b] ? 1 : 0)
}

// Solution for part one
const partOne = input => {
  // Format all the instructions
  const instructions = splitIntoChunks(input)

  // Loop through each instruction
  const result = instructions.reduce((acc, cur) => {
    const a = cur.values[1]
    const b = cur.values[2]
    const c = cur.values[3]

    // Run each action and track success
    let successCount = 0
    Object.keys(actions).forEach(key => {
      const output = actions[key](cur.before, a, b)
      if (output === cur.after[c]) successCount++
    })

    // Increment acc on enough success
    if (successCount >= 3) acc++
    return acc
  }, 0)

  return result
}

console.log('Part One:', partOne(input1))


/**
 * Part Two
 */

// Splits the steps for part two
const splitSteps = input => {
  return input.map(line => line.split(' ').map(x => +x))
}

// Solution for part two
const partTwo = (input1, input2) => {
  // Format all the instructions
  const instructions = splitIntoChunks(input1)
  const mapping = {}

  // Find the mapping keys
  while (Object.keys(mapping).length < 16) {
    // Loop through each instruction
    instructions.forEach(instruction => {
      const before = instruction.before
      const a = instruction.values[1]
      const b = instruction.values[2]
      const c = instruction.values[3]
      const after = instruction.after

      // Define a tracking object
      const tracking = { number: instruction.values[0], match: [] }

      // Run each function
      Object.keys(actions).forEach(key => {
        const output = actions[key](before, a, b)
        if (output === after[c]) tracking.match.push(key)
      })

      // Set known match keys
      if (tracking.match.length === 1) {
        mapping[tracking.number] = tracking.match[0]

      // Deduce alternate match keys
      } else if (tracking.match.length > 0) {
        // Exclude existing match options
        const dedupedMatches = tracking.match.reduce((acc, key) => {
          const match = Object.entries(mapping).find(obj => obj[1] === key)
          if (!match) acc.push(key)
          return acc
        }, [])

        // Add the key if one remains
        if (dedupedMatches.length === 1) {
          mapping[tracking.number] = dedupedMatches[0]
        }
      }
    })
  }

  // Define the registers and steps
  const registers = [0, 0, 0, 0]
  const steps = splitSteps(input2)

  // Loop through each step
  steps.forEach(step => {
    const key = step[0]
    const a = step[1]
    const b = step[2]
    const c = step[3]

    registers[c] = actions[mapping[key]](registers, a, b)
  })

  return registers
}

console.log('Part Two:', partTwo(input1, input2))

