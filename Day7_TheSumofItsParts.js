/**
 * Advent of Code - Day 7
 * The Sum Of Its Parts: https://adventofcode.com/2018/day/7
 */

const fs = require('fs')
const input = fs.readFileSync('./inputs/Day7.txt', 'utf8').split('\n')

/**
 * Part One
 */

// Translates an input line into steps
const readLines = input => {
  const steps = []
  input.forEach(i => {
    const pieces = i.split(' ')
    steps.push([pieces[1], pieces[7]])
  })
  return steps
}

// Sorts all the entires into an
// object containing each key and
// a before and after array
const stepDetails = (steps) => {
  return steps.reduce((acc, [key, after]) => {
    if (!acc[key]) acc[key] = {before: [], after: []}
    if (!acc[after]) acc[after] = {before: [], after: []}
    acc[key].before.push(after)
    acc[after].after.push(key)
    return acc
  }, {})
}

// Finds the initial parent keys that
// do not have after array values
const findParents = details => {
  // Find the parent node
  const parents = Object.keys(details).filter(key => {
    if (details[key].after.length === 0) return true
  })
  return parents
}

// Solution for Part One
const partOne = input => {
  const steps = readLines(input)
  const details = stepDetails(steps)

  let stepOrder = ''
  const queue = findParents(details)
  while (queue.length > 0) {
    // Sort the queue
    queue.sort()

    // Grab the first record and add to stepList
    const job = queue.shift()
    stepOrder += job
    console.log('Running job:', job)

    details[job].before.forEach(key => {
      // Remove start mapping
      details[key].after = details[key].after.filter(x => x !== job)

      // Check if key is now a parent
      if (details[key].after.length  === 0) queue.push(key)
    })
  }

  return stepOrder
}

console.log('Part One:', partOne(input))


/**
 * Part Two
 */

// Get the number 1-26 of a character a-z +60 seconds
const char = letter => (letter.toLowerCase().charCodeAt(0) - 96) + 60

// Solution for Part Two
const partTwo = input => {
  const steps = readLines(input)
  const details = stepDetails(steps)

  // Set time, workers, and starting queue
  let time = 0
  let workers = []
  const queue = findParents(details)

  // Loop through all the details
  while (queue.length > 0 || Object.keys(details).length > 0) {
    // Add new workers if there is room
    while (workers.length < 5 && queue.length > 0) {
      queue.sort()
      const job = queue.shift()
      workers.push({ job, finish: time + char(job) - 1 })
    }

    // See if any worker is done
    const {done, running} = workers.reduce((acc, job) => {
      (job.finish > time ? acc.running.push(job) : acc.done.push(job))
      return acc
    }, {done: [], running: []})

    // Update the still running wokers
    console.log(time, workers)
    workers = running

    // Search for new jobs from finished
    // workers and remove job when complete
    done.forEach(j => {
      // Check for any new jobs
      details[j.job].before.forEach(key => {
        // Remove after mapping of the new key
        details[key].after = details[key].after.filter(x => x !== j.job)

        // Add to the queue if no other afters exist
        if (details[key].after.length  === 0) queue.push(key)
      })

      // Remove the completed job
      delete details[j.job]
    })

    // Increment time on each loop
    time++
  }

  // Return the final time
  return time
}

console.log('Part Two:', partTwo(input))


