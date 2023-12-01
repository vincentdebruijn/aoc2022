const { makeTiles } = require("./make-tiles");
const { Tile } = require("./tile");

const tiles = makeTiles(500);
let startCoord = [500, 0];

for(let y = 0; y < 2; y++) {
    let newRow = [];
    for(let x = 0; x <= tiles[0].length; x++) {
        newRow.push(new Tile());
    }
    tiles.push(newRow);
}
for(let x = 0; x < tiles[tiles.length - 1].length; x++) {
    tiles[tiles.length - 1][x].isBrick = true;
}

// simulate the sand until a sand reaches the edge of the grid (and thus every sand would fall into the abyss)
while(!tiles[startCoord[1]][startCoord[0]].isSand) {
    let pos = [...startCoord];
    while(!tiles[pos[1]][pos[0]].isSand) {
        let newX = pos[0];
        let newY = pos[1] + 1;
        if (newY >= tiles.length) {
            break;
        }
        if (tiles[newY][newX].isBlocked) {
            newX = pos[0] - 1;
            if (newX < 0) {
                break;
            }
            if (tiles[newY][newX].isBlocked) {
                newX = pos[0] + 1;
                if (newX >= tiles[newY].length) {
                    break;
                }
                if (tiles[newY][newX].isBlocked) {
                    newX = pos[0];
                    newY = pos[1];
                    tiles[newY][newX].isSand = true;
                }
            }
        }
        pos = [newX, newY];
    }
}

console.log(tiles.flatMap(row => row.map(tile => tile)).filter(tile => tile.isSand).length);
