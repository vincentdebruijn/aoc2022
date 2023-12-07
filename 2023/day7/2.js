const { readInput } = require('../../lib/fetch-input.js');
const { lines } = require('../../lib/parse.js');
const { count } = require('../../lib/array-utils.js');

const input = readInput('input');

const HAND_MULTIPLIER = 1_000_000;
const CARD_MULTIPLIER = 13;
const SPECIAL_CARDS = ['T', 'Q', 'K', 'A'];

const determineHand = (hand) => {
  const counted = count(hand);
  const jokers = counted['J'] || 0;
  counted['J'] = 0;
  const values = Object.values(counted).sort().reverse();
  values[0] += jokers;
  return values[0] * 2 + (values[1] || 0);
}

const determineCardRank = (card) => {
  if (card === 'J') {
    return 0;
  }
  const index = SPECIAL_CARDS.indexOf(card);
  if (index > -1) {
    return 9 + index;
  }
  return Number(card) - 1;
}

const calculateHandStrength = (hand) => {
  return determineHand([...hand]) * HAND_MULTIPLIER +
    hand.reverse().map((card, index) => determineCardRank(card) * Math.pow(CARD_MULTIPLIER, index))
                  .reduce((a, x) => a + x);
}

const hands = lines(input).map(line => {
  const splitLine = line.split(' ');
  return {handStrength: calculateHandStrength(splitLine[0].split('')), bid: Number(splitLine[1])}
});

console.log(hands.sort((hand1, hand2) => hand1.handStrength - hand2.handStrength)
                 .map((hand, index) => hand.bid * (index + 1))
                 .reduce((a, x) => a + x));
