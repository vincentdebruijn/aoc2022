const fs = require('fs');
const { Tile } = require('./tile');

function makeTiles(extraWidth = 0) {
    const text = fs.readFileSync('input', 'utf-8').trim();

    let brickCoords = text.split('\n').map(line => line.trim().split(' -> ').map(coord => coord.split(',')));

    const allCoords = brickCoords.flatMap(line => line.map(coord => coord));
    const xCoords = allCoords.map(coord => coord[0]);
    const yCoords = allCoords.map(coord => coord[1]);
    const minXCoord = Math.min(...xCoords);
    let maxXCoord = Math.max(...xCoords);
    const minYCoord = Math.min(...yCoords);
    let maxYCoord = Math.max(...yCoords);

    // Make the grid
    const tiles = [];
    for(let y = 0; y <= maxYCoord; y++) {
        let newRow = [];
        for(let x = 0; x <= maxXCoord + extraWidth; x++) {
            newRow.push(new Tile());
        }
        tiles.push(newRow);
    }

    // Set the bricks
    brickCoords.forEach(line => {
        let from = line[0];
        let to;
        for(let i = 1; i < line.length; i++) {
            to = line[i];

            for(let y = Math.min(from[1], to[1]); y <= Math.max(from[1], to[1]); y++) {
                for(let x = Math.min(from[0], to[0]); x <= Math.max(from[0], to[0]); x++) {
                    tiles[y][x].isBrick = true;
                }
            }
            from = to;
        }
    });

    return tiles;
}

module.exports = { makeTiles };