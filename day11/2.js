const fs = require('fs');

let text = fs.readFileSync('input', 'utf-8').trim();

let monkeyInstructions = text.split('\n\n');

class Item {
    constructor(startingValue, moduloOperations) {
        this.moduloOperations = moduloOperations;
        this.restValues = moduloOperations.map(mod => startingValue % mod);
    }

    processOperation(operation) {
        this.restValues = this.restValues.map((old, index) => {
            let xnew;
            eval(operation);
            return xnew % this.moduloOperations[index];
        });
    }

    restValueOf(monkey) {
        return this.restValues[this.moduloOperations.indexOf(monkey.test)];
    }
}

class Monkey {
    constructor(instructions) {
        this.index = Number(instructions.match(/Monkey (\d):/)[1]);
        this.startingItems = instructions.match(/Starting items: ((?:\d|,| )+)/)[1].split(', ').map(n => Number(n.trim()));
        this.operation = instructions.match(/Operation: (new = old[^\n]+)\n/)[1];
        this.operation = `x${this.operation}`;
        this.test = Number(instructions.match(/Test: divisible by (\d+)/)[1]);
        this.toMonkeyWhenTrue = Number(instructions.match(/If true: throw to monkey (\d+)/)[1]);
        this.toMonkeyWhenFalse = Number(instructions.match(/If false: throw to monkey (\d+)/)[1]);
        this.itemsInspected = 0;
    }

    setItems(items) {
        this.items = items;
    }

    processNextItem() {
        if (this.items.length === 0) {
            return null;
        }
        this.itemsInspected++;
        let item = this.items.shift();
        item.processOperation(this.operation);
        let rest = item.restValueOf(this);
        if (rest === 0) {
            return [item, this.toMonkeyWhenTrue];
        } else {
            return [item, this.toMonkeyWhenFalse];
        }
    }
}

let monkeys = monkeyInstructions.map(instructions => new Monkey(instructions));
let moduloOperations = monkeys.map(m => m.test);
monkeys.forEach(monkey => {
    monkey.setItems(monkey.startingItems.map(i => new Item(i, moduloOperations)));
});

let rounds = 10000;

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