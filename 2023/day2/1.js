const { readInput } = require('../../lib/fetch-input.js');
const { parseInput } = require('./parseInput.js');

const MAX = {
  'red': 12,
  'green': 13,
  'blue': 14
}

const input = readInput('input');
const games = parseInput(input);

 const isPossible = (game) =>
  !game.rounds.find(round => round.find(cube => cube.number > MAX[cube.color]));

const answer = games.filter(game => isPossible(game))
                    .map(game => game.gameNumber)
                    .reduce((a, x) => a + x, 0);
console.log(answer);
