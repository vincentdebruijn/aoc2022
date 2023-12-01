const { readInput } = require('../../lib/fetch-input.js');
const { lines } = require('../../lib/parse.js');
const { findFirstOf, findLastOf, tokenize } = require('../../lib/string-utils.js');

const input = readInput('input');
const numbers = [
  '\\d',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
];

function mapToNumber(str) {
  if (/\d/.test(str)) {
    return str;
  }
  switch(str) {
    case 'one':
      return '1';
    case 'two':
      return '2';
    case 'three':
      return '3';
    case 'four':
      return '4';
    case 'five':
      return '5';
    case 'six':
      return '6';
    case 'seven':
      return '7';
    case 'eight':
      return '8';
    case 'nine':
      return '9';
    default:
      throw new Error(`Unknown token: ${str}`);
  }
}

const answer = lines(input).map(line => {
  const tokens = tokenize(line, numbers);
  return mapToNumber(tokens[0]) + mapToNumber(tokens[tokens.length - 1]);
}).reduce((a, numStr) => a + Number(numStr), 0)

console.log(answer);
