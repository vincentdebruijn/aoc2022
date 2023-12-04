const { readInput } = require('../../lib/fetch-input.js');
const { lines } = require('../../lib/parse.js');
const { findAllSame } = require('../../lib/compare.js');

const input = readInput('input');
const cards = lines(input)
    .map(line => line.split(':')[1].split('|')
    .map(numbers => numbers.trim().split(' ').filter(number => number)));

const quantities = new Array(cards.length).fill(1);
cards.forEach((card, index) => {
  const quantity = quantities[index];
  const same = findAllSame(card[0], card[1]).length;
  for(let i = index + 1; i < index + 1 + same; i++) {
    quantities[i] += quantity;
  }
});

const answer = quantities.reduce((a, x) => a + x);

console.log(answer);
