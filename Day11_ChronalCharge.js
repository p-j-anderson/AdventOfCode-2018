/**
 * Advent of Code - Day 11
 * Chronal Charge: https://adventofcode.com/2018/day/11
 */

// Calculate the power of a given cell
const fuelCellPower = (x, y) => {
  const serialNumber = 2568
  const rackId = x + 10

  // Find power level
  let powerLevel = rackId * y
  powerLevel += serialNumber
  powerLevel *= rackId
  powerLevel = Math.floor(powerLevel / 100) % 10
  powerLevel -= 5
  return powerLevel
}

// Finds the largest area given a 3x3 square
const findLargestArea3x3 = (size) => {
  let largestArea = 0
  let largestPoint = [0, 0]

  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {

      // Find the area if within bounds
      if (i + 2 <= size && j + 2 <= size) {
        let totalArea = 0
        for (let y = i; y <= i + 2; y++) {
          for (let x = j; x <= j + 2; x++) {
            totalArea += fuelCellPower(x, y)
          }
        }

        // Check for a larger area
        if (totalArea > largestArea) {
          largestArea = totalArea
          largestPoint = [j, i]
        }
      }
    }
  }

  console.log('largestArea:', largestArea)
  console.log('largestPoint:', largestPoint)
  return largestPoint
}

console.log('Part One:', findLargestArea3x3(300))
console.log("\n")

/**
 * Part Two
 */

// The previous solution for part 
// one was too slow to be an acceptable
// answer when 300x300
// 
// This uses an updated method of finding
// the area of a given square
const findLargestAreaAny = (size) => {
  let largestArea = 0
  let largestPoint = [0, 0]
  let largestSquare = 0

  // Generate an empty array of the required size (+1 for first empty row)
  let sums = Array.apply(null, {length: size + 1}).map(x => Array.apply(null, {length: size + 1}).map(x => 0))

  // Updated method for fiding area:
  // Utilize Summed Area Table(SAT) for assisting in finding areas
  // https://en.wikipedia.org/wiki/Summed-area_table

  // Find all the power sum areas
  for (let y = 1; y <= size; y++) {
    for (let x = 1; x <= size; x++) {
      const power = fuelCellPower(x, y)
      sums[y][x] = power + sums[y - 1][x] + sums[y][x - 1] - sums[y - 1][x - 1]
    }
  }

  // Find the best SAT within sums
  for (let s = 1; s <= size; s++) {
    for (let y = s; y <= size; y++) {
      for (let x = s; x<= size; x++) {
        const totalArea = sums[y][x] - sums[y - s][x] - sums[y][x - s] + sums[y - s][x - s]
        if (totalArea > largestArea) {
          // Update the largest values
          largestArea = totalArea
          largestPoint = [x - s + 1, y - s + 1]
          largestSquare = s
        }
      }
    }
  }

  console.log('largestArea:', largestArea)
  console.log('largestPoint:', largestPoint)
  console.log('largestSquare:', largestSquare)
  return [largestPoint[0], largestPoint[1], largestSquare]
}

console.log('Part Two:', findLargestAreaAny(300))
