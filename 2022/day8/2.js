let text = await fetch("https://adventofcode.com/2022/day/8/input").then(i => i.text());

// let text = 
// `30373
// 25512
// 65332
// 33549
// 35390`;

let rows = text.trim().split('\n');
let forest = rows.map(row => row.split('').map(tree => Number(tree.trim())));

function scenicScoreNorth(x, y, length, score) {
    if (y < 0) {
        return score;
    } else if (forest[y][x] >= length) {
        return score + 1;
    } else {
        return scenicScoreNorth(x, y-1, length, score+1);
    }
}

function scenicScoreSouth(x, y, length, score) {
    if (y > forest.length - 1) {
        return score;
    } else if (forest[y][x] >= length) {
        return score + 1;
    } else {
        return scenicScoreSouth(x, y+1, length, score+1);
    }
}

function scenicScoreWest(x, y, length, score) {
    if (x < 0) {
        return score;
    } else if (forest[y][x] >= length) {
        return score + 1;
    } else {
        return scenicScoreWest(x-1, y, length, score+1);
    }
}

function scenicScoreEast(x, y, length, score) {
    if (x > forest[0].length - 1) {
        return score;
    } else if (forest[y][x] >= length) {
        return score + 1;
    } else {
        return scenicScoreEast(x+1, y, length, score+1);
    }
}

let bestScore = 0;

for(let y = 0; y < forest.length; y++) {
    let row = forest[y];
    for(let x = 0; x < row.length; x++) {
        let length = row[x];
        let score = scenicScoreNorth(x, y-1, length, 0) * scenicScoreSouth(x, y+1, length, 0) * scenicScoreEast(x+1, y, length, 0) * scenicScoreWest(x-1, y, length, 0);
        if (score > bestScore) {
            bestScore = score;
        }
    }
}

console.log(bestScore);
