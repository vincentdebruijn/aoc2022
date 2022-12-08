let text = await fetch("https://adventofcode.com/2022/day/8/input").then(i => i.text());

// let text = 
// `30373
// 25512
// 65332
// 33549
// 35390`;

let rows = text.trim().split('\n');
let forest = rows.map(row => row.split('').map(tree => Number(tree.trim())));

function isObstructedByNorth(x, y, length) {
    if (y < 0) {
        return true;
    } else if (forest[y][x] >= length) {
        return false;
    } else {
        return isObstructedByNorth(x, y-1, length);
    }
}

function isObstructedBySouth(x, y, length) {
    if (y > forest.length - 1) {
        return true;
    } else if (forest[y][x] >= length) {
        return false;
    } else {
        return isObstructedBySouth(x, y+1, length);
    }
}

function isObstructedByWest(x, y, length) {
    if (x < 0) {
        return true;
    } else if (forest[y][x] >= length) {
        return false;
    } else {
        return isObstructedByWest(x-1, y, length);
    }
}

function isObstructedByEast(x, y, length) {
    if (x > forest[0].length - 1) {
        return true;
    } else if (forest[y][x] >= length) {
        return false;
    } else {
        return isObstructedByEast(x+1, y, length);
    }
}

let visibleCount = 0;

for(let y = 0; y < forest.length; y++) {
    let row = forest[y];
    for(let x = 0; x < row.length; x++) {
        let length = row[x];
        if (isObstructedByNorth(x, y-1, length) || isObstructedBySouth(x, y+1, length) || isObstructedByEast(x+1, y, length) || isObstructedByWest(x-1, y, length)) {
            visibleCount++;
        }
    }
}

console.log(visibleCount);
