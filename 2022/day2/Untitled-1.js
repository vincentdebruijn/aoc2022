let arr = await fetch("https://adventofcode.com/2022/day/2/input").then(i => i.text()).then(t => t.trim().split('\n').map(s => s.trim()));

let table = {
    'A X': 4,
    'A Y': 8,
    'A Z': 3,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 7,
    'C Y': 2,
    'C Z': 6
}

let anotherTableCauseFu = {
    'A X': 'A Z',
    'A Y': 'A X',
    'A Z': 'A Y',
    'B X': 'B X',
    'B Y': 'B Y',
    'B Z': 'B Z',
    'C X': 'C Y',
    'C Y': 'C Z',
    'C Z': 'C X'
}

console.log(arr.map(e => anotherTableCauseFu[e]).map(e => table[e]).reduce((x, a) => a + x));
