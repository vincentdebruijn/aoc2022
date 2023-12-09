const { readInput } = require('../../lib/fetch-input.js');
const { lines } = require('../../lib/parse.js');
const { count } = require('../../lib/array-utils.js');

const input = lines(readInput('input'));

const instructions = input[0].split('');

const nodes = input.slice(2).map(line => {
  const match = line.match(/(\w\w\w) \= \((\w\w\w), (\w\w\w)\)/);
  const node = match[1];
  const left = match[2];
  const right = match[3];
  return {node, 'L': left, 'R': right};
});
const nodeMap = {};
nodes.forEach(node => nodeMap[node.node] = node);
let currentNode = nodeMap['AAA'];
let steps = 0;
while(currentNode.node !== 'ZZZ') {
  currentNode = nodeMap[currentNode[instructions[steps % instructions.length]]];
  steps++;
}

console.log(steps);
