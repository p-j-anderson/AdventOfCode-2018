/**
 * Advent of Code - Day 19
 * Go With The Flow: https://adventofcode.com/2018/day/19
 */

const fs = require('fs')
const input = fs.readFileSync('./inputs/Day19.txt', 'utf8').split('\n')

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

const parseInput = input => {
  // Pull the first line and set the pointer
  let pointer = input.shift().split(' ')[1]
  
  // Add the remaining lines to instructions
  let instructions = []
  input.forEach(line => {
    line = line.split(' ')
    instructions.push({
      action: line[0],
      a: line[1],
      b: line[2],
      c: line[3]
    })
  })
  return {pointer, instructions}
}

const partOne = input => {
  let {pointer, instructions} = parseInput(input)
  let registers = [0, 0, 0, 0, 0, 0]

  while (registers[pointer] < instructions.length) {
    //const ip = registers[pointer] // For logging
    const instruction = instructions[registers[pointer]]
    const action = actions[instruction['action']]

    // Run the action
    const result = action(registers, +instruction['a'], +instruction['b'])
    
    // Update the registers
    //const preRegis = registers.slice(0) // For logging
    registers[instruction['c']] = +result
    //console.log('ip=' + ip, preRegis, instruction, registers) // For logging
    registers[pointer] = registers[pointer] + 1
  }
  return registers[0]
}

console.log('Part One:', partOne(input))