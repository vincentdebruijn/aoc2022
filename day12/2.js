const fs = require('fs');
const { Tile } = require('./tile.js');

const text = fs.readFileSync('input', 'utf-8').trim();
const inputRows = text.split('\n').map(t => t.split(''));
const tiles = inputRows.map((row, y) => row.map((entry, x) => {
    let tile = new Tile(x, y, entry);
    if (tile.elevation === 0) {
        tile.isStart = true;
        tile.bestDistance = 0;
    }
    return tile;
}));

// Build neighbours
tiles.forEach((row, y) => {
    row.forEach((tile, x) => {
        for(let yOffset = -1; yOffset <= 1; yOffset++) {
            let otherY = y - yOffset;
            if (otherY >= 0 && otherY < tiles.length) {
                let otherRow = tiles[otherY];
                for(let xOffset = -1; xOffset <= 1; xOffset++) {
                    let otherX = x - xOffset;
                    if (otherX >= 0 && otherX < otherRow.length && !(otherX === x && otherY === y) && (xOffset === 0 || yOffset === 0)) {
                        let neighbourTile = tiles[otherY][otherX];
                        tile.addNeighbour(neighbourTile);
                    }
                }
            }
        }
    });
});

const allTiles = tiles.flatMap(row => row.map(tile => tile));
const allStartTiles = allTiles.filter(tile => tile.isStart);
const end = allTiles.find(tile => tile.isEnd);
const toProcess = allStartTiles;

while(toProcess.length) {
    let tile = toProcess.shift();
    tile.neighbours.forEach(neighbour => {
        if (neighbour.updateDistance(tile.bestDistance + 1)) {
            toProcess.push(neighbour);
        }
    });
}
console.log(end.bestDistance);
