/**
 * Advent of Code - Day 13
 * Mine Cart Madness: https://adventofcode.com/2018/day/13
 */

const fs = require('fs')
const input = fs.readFileSync('./inputs/day13.txt', 'utf8')
const mi = fs.readFileSync('./inputs/mi.txt', 'utf8')

// Updates the track to remove carts
const getTrack = rawInput => {
  // Set regex
  const horizontal = new RegExp('[<>]', 'g')
  const vertical = new RegExp('[v^]', 'g')

  // Replace carts
  rawInput = rawInput.replace(horizontal, '-')
  rawInput = rawInput.replace(vertical, '|')
  return rawInput.split('\n').map(line => line.split(''))
}

// Gets the positions of all carts
const getCarts = rawInput => {
  let id = 0
  const arrayInput = rawInput.split('\n').map(line => line.split(''))
  const carts = []
  for (let y = 0; y < arrayInput.length; y++) {
    for (let x = 0; x < arrayInput[y].length; x++) {
      let space = arrayInput[y][x]
      if (space === 'v' || space === '^' || space === '<' || space === '>') carts.push({x, y, dir: space, turn: 0, id: id++, active: true})
    }
  }
  return carts
}

// Sort carts in order to be processed
const sortCarts = (a, b) => {
  if (a.y > b.y) return 1
  if (a.y === b.y) {
    if (a.x > b.x) return 1
    if (a.x === b.x) return 0
  }
return -1
}

// Solution for part one
const partOne = input => {
  // Get the track and carts
  const track = getTrack(input)
  const carts = getCarts(input)

  let crash = false
  while (!crash) {
    // Sort the carts
    carts.sort(sortCarts)

    // Loop through all carts
    carts.forEach(cart => {
      if (!crash) {
        // Determine the current x/y
        let newX = cart.x
        let newY = cart.y

        // Increment position based on x/y and dir
        if (cart.dir === 'v') newY++
        if (cart.dir === '^') newY--
        if (cart.dir === '<') newX--
        if (cart.dir === '>') newX++

        // Set the new position
        cart.x = newX
        cart.y = newY

        // Get the new position
        let pos = track[newY][newX]

        // Check for a crash
        carts.find(c => {
          if (c.y === cart.y
          && c.x === cart.x
          && c.id != cart.id
          && cart.active) {
            crash = cart.x + ',' + cart.y
            return true
          }
          return false
        })

        // Check for intersections and change the next
        // track position accordingly
        if (pos === '+') {
          const turn = cart.turn % 3
          if (cart.dir === '^' || cart.dir === 'v') {
            if (turn == 0) {
              pos = '\\'
            } else if (turn == 1) {
              pos = '|'
            } else if (turn == 2) {
              pos = '/'
            }
          } else if (cart.dir === '<' || cart.dir === '>') {
            if (turn == 0) {
              pos = '/'
            } else if (turn == 1) {
              pos = '-'
            } else if (turn == 2) {
              pos = '\\'
            }
          }

          // Increment the cart turn
          cart.turn++
        }

        // Check for turns
        if (pos === '/') {
          if (cart.dir === 'v') cart.dir = '<'
          else if (cart.dir === '^') cart.dir = '>'
          else if (cart.dir === '<') cart.dir = 'v'
          else if (cart.dir === '>') cart.dir = '^'
        } else if (pos === '\\') {
          if (cart.dir === 'v') cart.dir = '>'
          else if (cart.dir === '^') cart.dir = '<'
          else if (cart.dir === '<') cart.dir = '^'
          else if (cart.dir === '>') cart.dir = 'v'
        }
      }
    })
  }
  return crash
}

console.log('Part One:', partOne(input))


/**
 * Part Two
 */

// Solution for part two
const partTwo = input => {
  // Get the track and carts
  const track = getTrack(input)
  let carts = getCarts(input)

  while (carts.length > 1) {
    // Sort the carts
    carts.sort(sortCarts)

    // Loop through all carts
    carts.forEach(cart => {
      // Determine the current x/y
      let newX = cart.x
      let newY = cart.y

      // Increment position based on x/y and dir
      if (cart.dir === 'v') newY++
      if (cart.dir === '^') newY--
      if (cart.dir === '<') newX--
      if (cart.dir === '>') newX++

      // Set the new position
      cart.x = newX
      cart.y = newY

      // Get the new position
      let pos = track[newY][newX]

      // Check for intersections and change the next
      // track position accordingly
      if (pos === '+') {
        const turn = cart.turn % 3
        if (cart.dir === '^' || cart.dir === 'v') {
          if (turn == 0) {
            pos = '\\'
          } else if (turn == 1) {
            pos = '|'
          } else if (turn == 2) {
            pos = '/'
          }
        } else if (cart.dir === '<' || cart.dir === '>') {
          if (turn == 0) {
            pos = '/'
          } else if (turn == 1) {
            pos = '-'
          } else if (turn == 2) {
            pos = '\\'
          }
        }

        // Increment the cart turn
        cart.turn++
      }

      // Check for turns
      if (pos === '/') {
        if (cart.dir === 'v') cart.dir = '<'
        else if (cart.dir === '^') cart.dir = '>'
        else if (cart.dir === '<') cart.dir = 'v'
        else if (cart.dir === '>') cart.dir = '^'
      } else if (pos === '\\') {
        if (cart.dir === 'v') cart.dir = '>'
        else if (cart.dir === '^') cart.dir = '<'
        else if (cart.dir === '<') cart.dir = '^'
        else if (cart.dir === '>') cart.dir = 'v'
      }

      // Search for a matching cart
      carts.find(c => {
        if (c.y === cart.y
        && c.x === cart.x
        && c.id != cart.id
        && cart.active) {
          // Deactivate the matched carts
          cart.active = false
          c.active = false
          return true
        }
        return false
      })
    })

    // Remove any inactive carts
    carts = carts.filter(cart => cart.active)
  }

  // Return the last remaining cart
  return carts
}

console.log('Part Two:', partTwo(input))

