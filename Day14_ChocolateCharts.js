/**
 * Advent of Code - Day 14
 * Chocolate Charts: https://adventofcode.com/2018/day/14
 */

const partOne = input => {
  // Assign starting recipes/elfs
  let recipes = [3, 7]
  let elf1 = 0
  let elf2 = 1

  // Loop while under input + 10
  while (recipes.length <= input + 10) {
    const sum = recipes[elf1] + recipes[elf2]

    // Split sum into pieces
    for (let numString of sum.toString().split('')) {
      // Generate an integer from each numString
      recipes.push(parseInt(numString, 10));
    }

    // Update elf1
    elf1 += 1 + recipes[elf1]
    elf1 %= recipes.length

    // Update elf2
    elf2 += 1 + recipes[elf2]
    elf2 %= recipes.length
  }

  // Calcuate the 10 recipes
  let output = ''
  for (let i = input; i < input + 10; i++) {
    output += recipes[i]
  }

  return output
}

console.log('Part One:', partOne(864801))


/**
 * Part Two
 */

const partTwo = input => {
  // Assign starting recipes/elfs
  let recipes = [3, 7]
  let elf1 = 0
  let elf2 = 1

  while (recipes.length <= 30000000) {
    const sum = recipes[elf1] + recipes[elf2]

    // Split sum into pieces
    for (let numString of sum.toString().split('')) {
      // Generate an integer from each numString
      recipes.push(parseInt(numString, 10));
    }

    // Update elf1
    elf1 += 1 + recipes[elf1]
    elf1 %= recipes.length

    // Update elf2
    elf2 += 1 + recipes[elf2]
    elf2 %= recipes.length
  }

  // Define string input
  let match = String(input)
  let matchPosition = null

  // Loop through all recipes
  for (let i = 0; i < recipes.length - 6; i++) {
    if (recipes[i] == match[0]
        && recipes[i + 1] == match[1]
        && recipes[i + 2] == match[2]
        && recipes[i + 3] == match[3]
        && recipes[i + 4] == match[4]
        && recipes[i + 5] == match[5]) {
      matchPosition = i
      break
    }
  }

  return matchPosition
}

console.log('Part Two:', partTwo(864801))
