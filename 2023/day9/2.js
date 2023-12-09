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

function previousNumber(list) {
  if(list.every(num => num === 0)) {
    return 0;
  }
  const firstNumber = list[0];
  const prev = previousNumber(diffList(list));
  return firstNumber - prev;
}

const answer = input.map(list => previousNumber(list)).reduce((a, x) => a + x);

console.log(answer);
