function findAllSame(first, second) {
  return first.filter(el => second.includes(el));
}

function findAllSameString(first, second) {
  return findAllSame(first.split(''), second.split(''));
}

module.exports = { findAllSame, findAllSameString };
