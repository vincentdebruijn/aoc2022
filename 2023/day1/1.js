const { readInput } = require('../../lib/fetch-input.js');
const { lines } = require('../../lib/parse.js');
const { reverseString } = require('../../lib/string-utils.js');

const input = readInput('input');

const answer = lines(input).map(line => {
  return line.charAt(line.search(/\d/)) +
         line.charAt(line.length - reverseString(line).search(/\d/) - 1)
}).reduce((a, numStr) => a + Number(numStr), 0)

console.log(answer);
