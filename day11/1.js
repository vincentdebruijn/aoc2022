let text = await fetch("https://adventofcode.com/2022/day/11/input").then(i => i.text()).then(text => text.trim());

// let text = 
//  `Monkey 0:
//   Starting items: 79, 98
//   Operation: new = old * 19
//   Test: divisible by 23
//     If true: throw to monkey 2
//     If false: throw to monkey 3

// Monkey 1:
//   Starting items: 54, 65, 75, 74
//   Operation: new = old + 6
//   Test: divisible by 19
//     If true: throw to monkey 2
//     If false: throw to monkey 0

// Monkey 2:
//   Starting items: 79, 60, 97
//   Operation: new = old * old
//   Test: divisible by 13
//     If true: throw to monkey 1
//     If false: throw to monkey 3

// Monkey 3:
//   Starting items: 74
//   Operation: new = old + 3
//   Test: divisible by 17
//     If true: throw to monkey 0
//     If false: throw to monkey 1`;

let monkeyInstructions = text.split('\n\n');

class Monkey {
    constructor(instructions) {
        this.index = Number(instructions.match(/Monkey (\d):/)[1]);
        this.items = instructions.match(/Starting items: ((?:\d|,| )+)/)[1].split(', ').map(n => Number(n.trim()));
        this.operation = instructions.match(/Operation: (new = old[^\n]+)\n/)[1];
        this.operation = `x${this.operation}`;
        this.test = Number(instructions.match(/Test: divisible by (\d+)/)[1]);
        this.toMonkeyWhenTrue = Number(instructions.match(/If true: throw to monkey (\d+)/)[1]);
        this.toMonkeyWhenFalse = Number(instructions.match(/If false: throw to monkey (\d+)/)[1]);
        this.itemsInspected = 0;
    }

    processNextItem() {
        if (this.items.length === 0) {
            return null;
        }
        this.itemsInspected++;
        let old = this.items.shift();
        let xnew;
        eval(this.operation);
        xnew  = Math.floor(xnew / 3);
        if (xnew % this.test === 0) {
            return [xnew, this.toMonkeyWhenTrue];
        } else {
            return [xnew, this.toMonkeyWhenFalse];
        }
    }
}

let monkeys = monkeyInstructions.map(instructions => new Monkey(instructions));
let rounds = 20;

for(let round = 1; round <= rounds; round++) {
    monkeys.forEach((monkey) => {
        let itemAndMonkey;
        while(itemAndMonkey = monkey.processNextItem()) {
            let [item, monkey] = itemAndMonkey;
            monkeys[monkey].items.push(item);
        }
    });
}

console.log(monkeys.map(monkey => monkey.itemsInspected).sort((a,b) => a - b).slice(-2).reduce((a, x) => a * x, 1));