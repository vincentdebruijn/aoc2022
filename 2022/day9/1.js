let text = await fetch("https://adventofcode.com/2022/day/9/input").then(i => i.text());

// let text = 
// `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`

let instructions = text.trim().split('\n');

let headPosition = [0, 0];
let tailPosition = [0, 0];
let allTailPositions = {};
allTailPositions[tailPosition] = 1;

function tailAndHeadTouch(head, tail) {
    let xDiff = tail[0] - head[0];
    let yDiff = tail[1] - head[1];
    return Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1;
}

instructions.forEach(instruction => {
    let [_, direction, amount] = instruction.match(/(U|D|L|R) (\d+)/);
    amount = Number(amount);

    for(let i = 0; i < amount; i++) {
        switch(direction) {
            case 'U':
                headPosition[1] += 1;
                break;
            case 'D':
                headPosition[1] -= 1;
                break;
            case 'L':
                headPosition[0] -= 1;
                break;
            case 'R':
                headPosition[0] += 1;
                break;
        }
        if (!tailAndHeadTouch(headPosition, tailPosition)) {
            tailPosition = [...headPosition];
            switch(direction) {
                case 'U':
                    tailPosition[1] -= 1;
                    break;
                case 'D':
                    tailPosition[1] += 1;
                    break;
                case 'L':
                    tailPosition[0] += 1;
                    break;
                case 'R':
                    tailPosition[0] -= 1;
                    break;
            }
            let count = allTailPositions[tailPosition];
            if (!count) {
                allTailPositions[tailPosition] = 1;
            }
        }
    }
});

console.log(Object.entries(allTailPositions).length);