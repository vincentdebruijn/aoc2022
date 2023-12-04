const { readInput } = require('../../lib/fetch-input.js');
const { findAllSame } = require('../../lib/compare.js');
const { lines } = require('../../lib/parse.js');

const input = readInput('input');
const cards = lines(input)
    .map(line => line.split(':')[1].split('|')
    .map(numbers => numbers.trim().split(' ').filter(number => number)));

const calculatePoints = card => {
  const same = findAllSame(card[0], card[1]).length;
  return same === 0 ? 0 : Math.pow(2, same - 1);
}
const points = cards.reduce((a, card) => a + calculatePoints(card), 0);

console.log(points);
