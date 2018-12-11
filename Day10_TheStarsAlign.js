/**
 * Advent of Code - Day 10
 * The Stars Align: https://adventofcode.com/2018/day/10
 */

const fs = require('fs')
const input = fs.readFileSync('./inputs/Day10.txt', 'utf8').split('\n')

// Converts every line to an x,y,vx,vy object
const interpretLines = input => {
  return input.map(line => {
    // Get the two sections
    const posSection =  line.substring(0, line.indexOf('velocity'))
    const velSection = line.substring(line.indexOf('velocity'))
    
    // Get posX and posY
    const [x, y] = getXY(posSection)

    // Get velX and velY
    const [vx, vy] = getXY(velSection)

    // Convert to numbers when returning
    return {
      x: +x,
      y: +y,
      vx: +vx,
      vy: +vy
    }
  })
}

// Parses the xy coordinate of a string
const getXY = str => {
  // Regex for removing spaces
  const regex = new RegExp(' ', 'g')

  // Comma separated coordinates
  const coords = str.substring(str.indexOf('<') + 1, str.indexOf('>')).replace(regex, '')

  // Return an [x, y] array
  return coords.split(',')
}

// Displays all the points on a graph
const graph = details => {
  // Get graph min/max
  const {xMax, xMin, yMax, yMin} = getGraphSize(details)

  // Build the graph
  const graph = []
  for (let i = yMin; i <= yMax; i++) {
    const row = []
    let hasPoint = false
    for (let j = xMin; j <= xMax; j++) {
      // See if a point exists
      const point = details.find(({x, y}) => {
        if (y === i && x ===j) return true
        return false
      })

      // Generate a value based on point
      const value = (point ? '#' : '-')
      if (!hasPoint && point) hasPoint = true
      row.push(value)
    }

    // Join the rows so it displays
    // better in terminal and only
    // include a row if it has a point
    if (hasPoint) graph.push(row.join(''))
  }

  // Output QoL after the challenge
  // was completed to better display
  // the graph
  const prettyGraph = graph.map(row => {
    return row.slice(144)
  })

  return prettyGraph
}

// Updates the position of each point
const update = details => {
  return details.reduce((acc, {x, y, vx, vy}) => {
    const newLine = {
      x: x + vx,
      y: y + vy,
      vx,
      vy
    }

    acc.push(newLine)
    return acc
  }, [])
}

// Determines the graph size
const getGraphSize = details => {
  return details.reduce((acc, {x, y}) => {
    if (x > acc.xMax) acc.xMax = x
    if (x < acc.xMin) acc.xMin = x
    if (y > acc.yMax) acc.yMax = y
    if (y < acc.yMin) acc.yMin = y
    return acc
  }, {xMax: 0, xMin: 0, yMax: 0, yMin: 0})
}

const solve = input => {
  // Initiate details
  let details = interpretLines(input)

  // Get initial sizing details
  let xMax, xMin, yMax, yMin
  let {xMax: pxMax, xMin: pxMin, yMax: pyMax, yMin: pyMin} = getGraphSize(details)
  let loop = true

  // Add second tracking for part two
  let i = 0

  // Loop through downsizing the input
  // until the min/max values are as close
  // together as possible
  do {
    // Store previous details for later reference
    const pDetails = details

    // Update the positions and get new min/max
    details = update(details);
    ({xMax, xMin, yMax, yMin} = getGraphSize(details))

    // Update min/max if required
    if (pxMax > xMax || pxMin < xMin || pyMax > yMax || pyMin < yMin) {
      pxMax = (pxMax > xMax ? xMax : pxMax)
      pxMin = (pxMin < xMin ? xMin : pxMin)
      pyMax = (pyMax > yMax ? yMax : pyMax)
      pyMin = (pyMin < yMin ? yMin : pyMin)

      // Increment seconds for part two
      i++
    } else {
      // Stop looping when no updates
      loop = false

      // Revert to previous details
      details = pDetails
    }
  } while (loop)

  // Graph the current version
  console.log('Seconds:', i)
  console.log(graph(details))
}

solve(input)