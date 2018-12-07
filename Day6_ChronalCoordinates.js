/**
 * Advent of Code - Day 6
 * Chronal Coordinates: https://adventofcode.com/2018/day/6
 */

const input =  [[66, 204], [55, 226], [231, 196], [69, 211], [69, 335], [133, 146], [321, 136], [220, 229], [148, 138], [42, 319], [304, 181], [101, 329], [72, 244], [242, 117], [83, 237], [169, 225], [311, 212], [348, 330], [233, 268], [99, 301], [142, 293], [239, 288], [200, 216], [44, 215], [353, 289], [54, 73], [73, 317], [55, 216], [305, 134], [343, 233], [227, 75], [139, 285], [264, 179], [349, 263], [48, 116], [223, 60], [247, 148], [320, 232], [60, 230], [292, 78], [247, 342], [59, 326], [333, 210], [186, 291], [218, 146], [205, 246], [124, 204], [76, 121], [333, 137], [117, 68]]

/**
 * Part One
 */
 
// Get width/height based on the 
// input and generate a board array 
const buildBoard = input => {
  // Get the board size
  const size = input.reduce((acc, cur) => {
    if (cur[0] > acc.x) acc.x = cur[0]
    if (cur[1] > acc.y) acc.y = cur[1]
    return acc
  }, {x: 0, y: 0})

  // Build the board
  let board = []
  for (let i = 0; i <= size.y; i++) {
    board[i] = []
    for (let j = 0; j <= size.x; j++) {
      board[i][j] = '_'
    }
  }

  return board
}

// Calculates the distance
// between two points
const distance = (a, b) => {
  xDiff = Math.abs(a[0] - b[0])
  yDiff = Math.abs(a[1] - b[1])
  return(xDiff + yDiff)
}

// Determines if each point on a board
// is closest to an individual input
// or multiple inputs
const mapDistance = (board, input) => {
  // Loop through each x/y
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      // Determine the closest key
      const closest = input.reduce((acc, cur, i) => {
        const d = distance([x, y], cur)
        if (d < acc.d) {
          acc.key = i
          acc.d = d
        } else if (d == acc.d) {
          acc.key = '.'
        }
        return acc
      }, {key: null, d: 100})

      // Set the board point to closest key
      board[y][x] = closest.key
    })
  })

  return board
}

// Counts the occurrences of each key 
// to determine largest area. Excludes
// infinite keys
const countBoard = board => {
  // Get a list of excluded infinite keys
  const excluded = board.reduce((acc, cur, i, arr) => {
    // First and last row should all be included
    if (i === 0 || i === (arr.length - 1)) {
      cur.forEach(key => { 
        if (!acc.includes(key)) acc.push(key) 
      })
    } else {
      // First and last column should all be included
      if (!acc.includes(cur[0])) acc.push(cur[0])
      if (!acc.includes(cur[cur.length - 1])) acc.push(cur[cur.length - 1])
    }

    return acc
  }, [])
  
  // Get a count of valid keys
  const counts = board.reduce((acc, cur) => {
    cur.forEach(key => {
      // Check if the key is excluded
      if (!excluded.includes(key)) {
        // Adjust counts 
        if (acc[key]) {
          acc[key]++
        } else {
          acc[key] = 1
        }
      }
    })
    return acc
  }, {})

  return counts
}

// Combines the above functions to
// generate an answer to part one
const runPartOne = input => {
  const board = buildBoard(input)
  const mappedDistance = mapDistance(board, input)
  const counts = countBoard(mappedDistance)

  // Return the largest area
  return Object.entries(counts).reduce((acc, [key, value]) => {
    if (value > acc) acc = value
    return acc
  }, 0)
}

console.log('Part One:', runPartOne(input))


/** 
 * Part Two
 */

// Runs every input for a given point,
// determining if the sum of all distance
// is less thatn 10000
const mapSafety = (board, input) => {
  // Loop through each x/y
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      const total = input.reduce((acc, cur) => {
        return acc += distance([x, y], cur)
      }, 0)

      // Set the board point
      if (total < 10000) {
        board[y][x] = '#'
      } else {
        board[y][x] = '_'
      }
    })
  })

  return board
}

// Generates the safety board and
// counts the occurrences to solves
// to solve part two
const runPartTwo = input => {
  const board = buildBoard(input)
  const safety = mapSafety(board, input)

  // Count the area
  return safety.reduce((acc, cur) => {
    const count = cur.reduce((count, item) => {
      if (item === '#') return count + 1
      return count
    }, 0)
    return acc + count
  }, 0)
}

console.log('Part Two:', runPartTwo(input))
