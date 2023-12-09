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

let currentNodes = nodes.filter(node => node.node.endsWith('A'));
let steps = 0;
while(currentNodes.find(node => !node.node.endsWith('Z'))) {
  const instruction = instructions[steps % instructions.length];
  currentNodes = currentNodes.map(node => nodeMap[node[instruction]]);
  steps++;
}

console.log(steps);
