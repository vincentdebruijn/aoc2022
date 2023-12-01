const fs = require('fs');
const { compare } = require('./compare.js');

const text = fs.readFileSync('input', 'utf-8').trim();

const pairs = text.split('\n\n').map(pair => pair.split('\n').map(line => eval(line)));

let sum = 0;

pairs.forEach((pair, index) => {
    if (compare(pair[0], pair[1]) <= 0) {
        sum += (index + 1);
    };
});

console.log(sum);