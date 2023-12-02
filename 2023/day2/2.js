const { readInput } = require('../../lib/fetch-input.js');
const { parseInput } = require('./parseInput.js');

const input = readInput('input');
const games = parseInput(input);

calculateNumberPerColor = game => {
  const colorNumbers = {'green': [], 'red': [], 'blue': []};
  game.rounds.forEach(round => {
    round.forEach(set => colorNumbers[set.color].push(set.number));
  });
  return colorNumbers;
}

calculatePower = game => {
  const colorNumbers = calculateNumberPerColor(game);
  return Object.values(colorNumbers)
      .map(numbers => Math.max(...numbers))
      .reduce((a, x) => a * x)
}

const answer = games.map(game => calculatePower(game))
                    .reduce((a, x) => a + x, 0);
console.log(answer);
