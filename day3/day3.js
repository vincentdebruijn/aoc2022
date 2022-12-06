let arr = await fetch("https://adventofcode.com/2022/day/3/input").then(i => i.text()).then(t => t.trim().split('\n').map(s => s.trim()));

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function findSame(first, second) {
  while(first.length > 0) {
    const char = first.slice(0, 1);
    if (second.indexOf(char) > -1) {
      return char;
    }
    first = first.slice(1);
  }
}

const res = arr.map(line => {
  const count = line.length / 2;
  let first = line.slice(0, count);
  let second = line.slice(count);
  const char = findSame(first, second);
  return chars.indexOf(char) + 1;
}).reduce((x, a) => x + a);

console.log(res);
