const { readInput } = require('../../lib/fetch-input.js');
const { matrix } = require('../../lib/parse.js');
const { transpose, manhattanDistance } = require('../../lib/grid-utils.js');
const { insertIndexOfSortedList } = require('../../lib/array-utils.js');

const space = matrix(readInput('input'));

const emptyRowIndices =
    space.map((row, index) => [row.find(el => el === '#'), index])
         .filter(([satellite, _]) => !satellite)
         .map(([_, index]) => index);

const emptyColumnIndices =
    transpose(space).map((col, index) => [col.find(el => el === '#'), index])
         .filter(([satellite, _]) => !satellite)
         .map(([_, index]) => index);

const satellites =
    space.flatMap((row, y) => row.map((el, x) => [el === '#', x, y]))
         .filter(([satellite, _, __]) => satellite)
         .map(([_, x, y]) => ({x, y}))
         .map(({x, y}) => ({
              x: x + insertIndexOfSortedList(emptyColumnIndices, x),
              y: y + insertIndexOfSortedList(emptyRowIndices, y)
          }));

let total = 0;
while(satellites.length) {
  const satellite = satellites.shift();
  total = satellites
      .map(otherSatellite => manhattanDistance(satellite.x, satellite.y, otherSatellite.x, otherSatellite.y))
      .reduce((a, x) => a + x, total);
}

console.log(total);
