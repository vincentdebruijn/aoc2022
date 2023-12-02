const { lines } = require('../../lib/parse.js');

function parseRound(round) {
  return round.split(',').map(numberColor => {
    const match = numberColor.trim().match(/(\d+) (\w+)/);
    return {color: match[2], number: Number(match[1])};
  })
}

function parseInput(input) {
  return lines(input).map(line => {
    const match = line.match(/Game (\d+):/);
    const gameNumber = Number(match[1]);
    line = line.slice(match[0].length);
    const rounds = line.split(';').map(round => parseRound(round));
    return {gameNumber, rounds};
  });
}

module.exports = { parseInput }
