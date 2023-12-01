let arr = await fetch("https://adventofcode.com/2022/day/3/input").then(i => i.text()).then(t => t.trim().split('\n').map(s => s.trim()));

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function findAllSame(first, second) {
  let str = '';
  while(first.length > 0) {
    const char = first.slice(0, 1);
    if (second.indexOf(char) > -1) {
      str += char;
    }
    first = first.slice(1);
  }
  return str;
}

const newArr = [];
while(arr.length) {
  newArr.push(arr.splice(0,3));
}
const res = newArr.map(group => {
  const sameBetweenOneAndTwo = findAllSame(group[0], group[1]);
  const sameBetweenAll = findAllSame(sameBetweenOneAndTwo, group[2]);
  if (sameBetweenAll.length < 1) {
    throw new Error("Expected one shared character, but got: " + sameBetweenAll);
  }
  const char = sameBetweenAll.slice(0,1);
  return chars.indexOf(char) + 1;
}).reduce((x, a) => x + a);

console.log(res);
