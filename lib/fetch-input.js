const fs = require('fs');

const fetchInput = async (year, day) => {
  return fetch(`https://adventofcode.com/${year}/day/${day}/input`).then(i => i.text()).then(t => t.trim());
};

const readInput = fileName => fs.readFileSync(fileName, 'utf-8').trim();

module.exports = { fetchInput, readInput }
