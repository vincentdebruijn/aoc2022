const { makeTiles } = require("./make-tiles");

const tiles = makeTiles();
let startCoord = [500, 0];

// simulate the sand until a sand reaches the edge of the grid (and thus every sand would fall into the abyss)
let edgeReached = false;
while(!edgeReached) {
    let pos = [...startCoord];
    // console.log("New sand");
    while(!tiles[pos[1]][pos[0]].isSand) {
        let newX = pos[0];
        let newY = pos[1] + 1;
        // console.log(`New cycle starting at ${[newX, newY]}`);
        if (newY >= tiles.length) {
            edgeReached = true;
            break;
        }
        if (tiles[newY][newX].isBlocked) {
            // console.log("Blocked, try left");
            newX = pos[0] - 1;
            if (newX < 0) {
                edgeReached = true;
                break;
            }
            if (tiles[newY][newX].isBlocked) {
                // console.log("Also blocked, try right");
                newX = pos[0] + 1;
                if (newX >= tiles[newY].length) {
                    edgeReached = true;
                    break;
                }
                if (tiles[newY][newX].isBlocked) {
                    newX = pos[0];
                    newY = pos[1];
                    // console.log(`Sand rests at ${[newX, newY]}`);
                    tiles[newY][newX].isSand = true;
                }
            }
        }
        pos = [newX, newY];
    }
}

console.log(tiles.flatMap(row => row.map(tile => tile)).filter(tile => tile.isSand).length);
