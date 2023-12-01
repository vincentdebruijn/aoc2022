const fs = require('fs');
const { compare } = require('./compare.js');

const text = fs.readFileSync('input', 'utf-8').trim();

let pairs = text.split('\n\n').flatMap(pair => pair.split('\n').map(line => eval(line)));

let dividerPackets = [[[2]], [[6]]];
pairs = pairs.concat(dividerPackets);

const sortedPairs = pairs.sort(compare);
console.log(dividerPackets.map(packet => sortedPairs.indexOf(packet) + 1).reduce((a,x) => a*x, 1));