let text = await fetch("https://adventofcode.com/2022/day/6/input").then(i => i.text());

function allDifferent(arr) {
    const counts = {};
    arr.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    return arr.map(token => counts[token]).reduce((x, a) => x + a) === arr.length;
}

let arr = text.split('');
let nrOfTokens = 14;
let lastTokens = arr.slice(0,nrOfTokens);
let remainder = arr.slice(nrOfTokens);
console.log(lastTokens);
console.log(remainder);

while(!allDifferent(lastTokens)) {
    lastTokens = lastTokens.slice(1);
    lastTokens.push(remainder[0]);
    remainder = remainder.slice(1);
    nrOfTokens++;
}

console.log(nrOfTokens);
