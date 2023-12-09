const { readInput } = require('../../lib/fetch-input.js');
const { lines } = require('../../lib/parse.js');
const { count } = require('../../lib/array-utils.js');

const input = lines(readInput('input'))
    .map(line => line.split(' ').map(str => Number(str)));

function diffList(list) {
  let result = [];
  for(let i = 1; i < list.length; i++) {
    result.push(list[i] - list[i - 1]);
  }
  return result;
}

function nextNumber(list) {
  if(list.every(num => num === 0)) {
    return 0;
  }
  const lastNumber = list[list.length - 1];
  const nex = nextNumber(diffList(list));
  return lastNumber + nex;
}

const answer = input.map(list => nextNumber(list)).reduce((a, x) => a + x);

console.log(answer);
