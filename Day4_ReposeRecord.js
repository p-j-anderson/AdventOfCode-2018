/**
 * Avent of Code - Day 4
 * Repose Record: https://adventofcode.com/2018/day/4
 */

const fs = require('fs')
const input = fs.readFileSync('./inputs/Day4.txt', 'utf8').split('\n')

// Parses a given line into an object ouput
const parseLine = line => {
    const half = line.split('] ')
    let datetime = half[0]
    let detail = half[1]

    // Get the date/time
    datetime = new Date(datetime.substr(1) + ' UTC')
    const date = (datetime.getUTCMonth() + 1) + '-' + formatLeadingZero(datetime.getUTCDate())
    const time = formatLeadingZero(datetime.getUTCMinutes())

    // Get the details
    let type = 'action'
    if (detail !== 'wakes up' && detail !== 'falls asleep') {
        type = 'change'
        detail = detail.split(' ')[1].substr(1)
    }

    // Return an object with details
    return {datetime, date, time, type, detail}
}

// Includes a leading zero if required
const formatLeadingZero = i => {
    if (String(i).length === 1) i = '0' + i
    return i
}

// Sorts items by timestamp
const sortInfo = (a, b) => {
    return a.datetime.getTime() - b.datetime.getTime()
}

// Combines the three above functions to
// parse, format, and sort a provided
// list of actions
const gatherInfo = input => {
    const info = input.reduce((acc, cur) => {
        acc.push(parseLine(cur))
        return acc
    }, [])

    return info.sort(sortInfo)
}

// Ingests a list, sorts the details, and
// generates a count of the sleep minutes
// for each guard
const countSleep = input => {
    const sortedInfo = gatherInfo(input)

    let currentGuard, topGuard, startSleep, stopSleep
    let count = {}

    // Loop through each piece of info
    sortedInfo.forEach(info => {
        if (info.type === 'change') {
            currentGuard = info.detail

            // Add a record for the guard if it doesn't exist
            if (!count[currentGuard]) count[currentGuard] = {total: 0, details: {}}
        } else {
            if (info.detail === 'falls asleep') {
                startSleep = info.time
            } else if (info.detail === 'wakes up') {
                stopSleep = info.time
                // Increment each sleep minute
                for (i = startSleep; i < stopSleep; i++) {
                    if (!count[currentGuard]['details'][i]) {
                        count[currentGuard]['details'][i] = 1
                    } else {
                        count[currentGuard]['details'][i]++
                    }
                }

                // Add to the total sleep
                count[currentGuard]['total'] += stopSleep - startSleep
            }
        }
    })

    return count
}

// Finds the guard with the most total sleep minutes
const mostSleep = details => {
    let topTotal = 0
    let topGuard

    // Loop through each guard
    Object.keys(details).forEach(guard => {
        if (details[guard]['total'] > topTotal) {
            topTotal = details[guard]['total']
            topGuard = guard
        }
    })

    let topCount = 0
    let topMinute

    // Find the guard's top minute
    Object.entries(details[topGuard]['details']).forEach(([key, value]) => {
        if (value > topCount) {
            topMinute = key
            topCount = value
        }
    })
    
    return {topGuard, topMinute}
}

// Finds the guard with the highest sleep
// count for a given minute
const mostFrequentSleep = details => {
    let topMinute
    let topValue = 0
    let topGuard

    // Loop through each guard
    Object.keys(details).forEach(guard => {
        Object.entries(details[guard]['details']).forEach(([key, value]) => {
            if (value > topValue) {
                topValue = value
                topMinute = key
                topGuard = guard
            }
        })
    })

    return {topGuard, topMinute}
}

/**
 * Part One
 */
const details = countSleep(input)
const mostSleepResult = mostSleep(details)
console.log('mostSleep:', mostSleepResult)

/**
 * Part Two
 */
const mostFrequentSleepResult = mostFrequentSleep(details)
console.log('mostFrequent:', mostFrequentSleepResult)
