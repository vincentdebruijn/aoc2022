const { readInput } = require('../../lib/fetch-input.js');
const { lines } = require('../../lib/parse.js');
const { getTileInDirection } = require('../../lib/grid-utils.js');


function mapSymbolToObj(symbol) {
  switch(symbol) {
    case 'S':
      return {isStart: true, distance: 0, north: true, east: true, south: true, west: true}
    case '|':
      return {north: true, east: false, south: true, west: false};
    case '-':
      return {north: false, east: true, south: false, west: true};
    case 'L':
      return {north: true, east: true, south: false, west: false};
    case 'J':
      return {north: true, east: false, south: false, west: true};
    case '7':
      return {north: false, east: false, south: true, west: true};
    case 'F':
      return {north: false, east: true, south: true, west: false};
    case '.':
      return {north: false, east: false, south: false, west: false};
    default:
      throw new Error(`Unknown symbol: ${symbol}`);
  }
}

function getExitDirection(tile, enteredFrom) {
  if (!tile[enteredFrom]) {
    return null;
  }
  if (tile.north && enteredFrom !== 'north') {
    return 'north';
  }
  if (tile.east && enteredFrom !== 'east') {
    return 'east';
  }
  if (tile.south && enteredFrom !== 'south') {
    return 'south';
  }
  if (tile.west && enteredFrom !== 'west') {
    return 'west';
  }
}

function getOppositeDirection(direction) {
  switch(direction) {
    case 'north':
      return 'south';
    case 'east':
      return 'west';
    case 'south':
      return 'north';
    case 'west':
      return 'east';
  }
}

const tileMap = lines(readInput('input'))
    .map((line, y) => line.split('').map((symbol, x) => {
      return {
        x,
        y,
        ...mapSymbolToObj(symbol)
      }
    }));


let startTile = tileMap.flatMap(row => row).filter(tile => tile.isStart)[0];

let currentTiles = [];
const northTile = getTileInDirection(tileMap, startTile, 'north');
if (northTile && northTile.south) {
  currentTiles.push({tile: northTile, entered: 'south'});
}
const eastTile = getTileInDirection(tileMap, startTile, 'east');
if (eastTile && eastTile.west) {
  currentTiles.push({tile: eastTile, entered: 'west'});
}
const southTile = getTileInDirection(tileMap, startTile, 'south');
if (southTile && southTile.north) {
  currentTiles.push({tile: southTile, entered: 'north'});
}
const westTile = getTileInDirection(tileMap, startTile, 'west');
if (westTile && westTile.east) {
  currentTiles.push({tile: westTile, entered: 'east'});
}

currentTiles.forEach(enteredTile => enteredTile.tile.distance = 1);

while(currentTiles[0].tile !== currentTiles[1].tile &&
    !currentTiles.every(enteredTile => enteredTile.tile.visited)) {
  currentTiles = currentTiles.map(enteredTile => {
    enteredTile.tile.visited = true;
    const exitDirection = getExitDirection(enteredTile.tile, enteredTile.entered);
    const nextTile = getTileInDirection(tileMap, enteredTile.tile, exitDirection);
    nextTile.distance = enteredTile.tile.distance + 1;
    return {tile: nextTile, entered: getOppositeDirection(exitDirection)};
  });
}

console.log(currentTiles[0].tile.distance);
