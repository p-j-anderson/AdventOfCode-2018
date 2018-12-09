/**
 * Advent of Code - Day 9
 * Marble Mania: https://adventofcode.com/2018/day/9
 */

const totalPlayers = 430 
const totalMarbles = 71588

const buildAfterNode = (marble, nodeList) => {
  // Build a new node
  const newNode = {
    value: marble,
    prev: nodeList,
    next: nodeList.next
  }

  // Update the existing nodeList references
  nodeList.next.prev = newNode
  nodeList.next = newNode
  return newNode
};

const linkedListGame = (totalPlayers, totalMarbles) => {
  // Object for holding scores
  const scores = {}

  // Build the initial nodeList value
  let nodeList = {
    value: 0
  }

  // Add next and prev references
  nodeList.next = nodeList
  nodeList.prev = nodeList

  // Loop through all the marbles
  for (let marble = 1; marble <= totalMarbles; marble++) {
    // Check for special marbles
    if (marble % 23 === 0) {
      // Shift backwards 7
      nodeList = nodeList.prev.prev.prev.prev.prev.prev.prev

      // Get the player and score
      const player = marble % totalPlayers
      const score = marble + nodeList.value

      // Update or add the score
      if (scores[player]) {
        scores[player] += score
      } else {
        scores[player] = score
      }

      // Remove the scored node
      nodeList.prev.next = nodeList.next
      nodeList.next.prev = nodeList.prev
      nodeList = nodeList.next
    } else {
      // Add another node
      nodeList = buildAfterNode(marble, nodeList.next)
    }
  }

  // Find the top score
  return Object.entries(scores).reduce((topScore, [player, score]) => {
    if (score > topScore) topScore = score
    return topScore
  }, 0)
}

console.log('Part One:', linkedListGame(totalPlayers, totalMarbles))
console.log('Part Two:', linkedListGame(totalPlayers, totalMarbles * 100))
