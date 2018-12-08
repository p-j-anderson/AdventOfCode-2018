/**
 * Advent of Code - Day 8
 * Memory Maneuver: https://adventofcode.com/2018/day/8
 */

const fs = require('fs')
const input = fs.readFileSync('./inputs/Day8.txt', 'utf8').split(' ').map(x => +x)
const mi = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ').map(x => +x)


/** 
 * Part One
 */

const getMetaSum = input => {
  // Get the item counts
  const childCount = input.shift()
  const metaCount = input.shift()
  let total = 0

  // Check for any child itmes
  console.log('Searching for children...')
  if (childCount > 0) {
    for (let i = 0; i < childCount; i++) {
      console.log('  ** Adding child element')
      total += getMetaSum(input)
    }
  }

  // Check for meta counting
  console.log('Checking meta counts...')
  for (let i = 0; i < metaCount; i++) {
    const meta = input.shift()
    console.log('  !! Adding meta count:', meta)
    total += meta
  }

  console.log('Section total:', total)
  return total
}

console.log('Part One:', getMetaSum(input.slice(0)))


/**
 * Part Two
 */

const getRootMetaSum = input => {
  // Get the item counts
  const childCount = input.shift()
  const metaCount = input.shift()
  let total = 0

  if (childCount > 0) {
    // Search for children values
    console.log('Searching for children...')
    const childValues = []
    for (let i = 0; i < childCount; i ++) {
      console.log('  ** Adding child value')
      childValues.push(getRootMetaSum(input))
    }
    console.log('childValues:', childValues)

    // Search for meta keys
    const metaKeys = []
    console.log('Searching for meta keys...')
    for (let i = 0; i < metaCount; i ++) {
      metaKeys.push(input.shift())
    }
    console.log('metaKeys:', metaKeys)

    // Compile values based on key/values
    console.log('Adding values based on keys...')
    metaKeys.forEach(k => {
      const key = k - 1
      if (key >= 0 && key < childValues.length) {
        console.log('  $$ Adding value:', childValues[key])
        total += childValues[key]
      } else {
        console.log('  -- Value not found...')
      }
    })
  } else {
    // Increment child meta counts
    console.log('Checking meta counts...')
    for (let i = 0; i < metaCount; i ++) {
      const meta = input.shift()
      console.log('  !! Adding meta count:', meta)
      total += meta
    }
  }

  console.log('Section total:', total)
  return total
}

console.log('Part Two:', getRootMetaSum(input.slice(0)))
