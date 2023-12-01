let text = await fetch("https://adventofcode.com/2022/day/9/input").then(i => i.text());

// let text = 
// `R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20`

let instructions = text.trim().split('\n');

let tailPositions = [[0,0], [0, 0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]];
let allTailPositions = {};
allTailPositions[[0,0]] = 1;

function tailAndHeadTouch(head, tail) {
    let xDiff = tail[0] - head[0];
    let yDiff = tail[1] - head[1];
    return Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1;
}

function update(head, tail) {
    let xDiff = head[0] - tail[0];
    let yDiff = head[1] - tail[1];
    if (Math.abs(xDiff) === 2) {
        xDiff /= 2;
    }
    if (Math.abs(yDiff) === 2) {
        yDiff /= 2;
    }
    tail[0] += xDiff;
    tail[1] += yDiff;
}

instructions.forEach(instruction => {
    let [_, direction, amount] = instruction.match(/(U|D|L|R) (\d+)/);
    amount = Number(amount);

    for(let i = 0; i < amount; i++) {
        let head = tailPositions[0];
        
        switch(direction) {
            case 'U':
                head[1] += 1;
                break;
            case 'D':
                head[1] -= 1;
                break;
            case 'L':
                head[0] -= 1;
                break;
            case 'R':
                head[0] += 1;
                break;
        }

        let j = 1;
        while(j < tailPositions.length && !tailAndHeadTouch(tailPositions[j - 1], tailPositions[j])) {
            let tail = tailPositions[j];
            update(head, tail);
            head = tail;
            j++;
        }

        let count = allTailPositions[tailPositions[tailPositions.length - 1]];
        if (!count) {
            allTailPositions[tailPositions[tailPositions.length - 1]] = 1;
        }
    }
});

console.log(Object.entries(allTailPositions).length);