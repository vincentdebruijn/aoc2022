let text = await fetch("https://adventofcode.com/2022/day/5/input").then(i => i.text()).then(t => t.trim());
let [stack, operations] = text.split('\n\n');

// [P]     [L]         [T]            
// [L]     [M] [G]     [G]     [S]    
// [M]     [Q] [W]     [H] [R] [G]    
// [N]     [F] [M]     [D] [V] [R] [N]
// [W]     [G] [Q] [P] [J] [F] [M] [C]
// [V] [H] [B] [F] [H] [M] [B] [H] [B]
// [B] [Q] [D] [T] [T] [B] [N] [L] [D]
// [H] [M] [N] [Z] [M] [C] [M] [P] [P]
//  1   2   3   4   5   6   7   8   9 

let rows = stack.split('\n').reverse();
let rowNumbers = rows[0];
rows = rows.slice(1);

let nrOfColumns = Number(Array.from(rowNumbers.matchAll(/\d+/g)).reverse()[0]);

let dataModel = [];
for(let i = 0; i < nrOfColumns; i++) {
    dataModel.push([]);
}

let re = /\[(\w)\]/g;
rows.forEach(row => {
    while ((match = re.exec(row)) != null) {
        let index = match.index / 4;
        dataModel[index].push(match[1]);
    }
});

// move 8 from 3 to 2

operations.split('\n').forEach(operation => {
    let [_, moves, origin, destination] = operation.match(/move (\d+) from (\d+) to (\d+)/);
    // console.log(moves, origin, destination);
    let nrOfMoves = Number(moves);
    let originIndex = Number(origin) - 1;
    let destinationIndex = Number(destination) - 1;

    // console.log(nrOfMoves, originIndex, destinationIndex);

    let originList = dataModel[originIndex];
    let toMove = originList.slice(-nrOfMoves);
    let leftOver = originList.slice(0, originList.length - nrOfMoves);

    // console.log(toMove, leftOver);

    dataModel[originIndex] = leftOver;
    dataModel[destinationIndex].push(...toMove.reverse()); // Remove reverse for the 2nd part of the exercise
});

console.log(dataModel);