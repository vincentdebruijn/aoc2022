function reverseString(str) {
  return str.split("").reverse().join("");
}

function indicesOf(str, searchArr) {
  return searchArr.map(searchParam => str.search(searchParam)).filter(index => index !== -1);
}

function findFirstOf(str, searchArr) {
  return Math.min(...indicesOf(str, searchArr));
}

function findLastOf(str, searchArr) {
  return Math.max(...indicesOf(str, searchArr));
}

function tokenize(str, tokens) {
  return _tokenize(str, tokens.map(token => new RegExp(`^${token}`)), []);
}

function _tokenize(str, tokens, result) {
  if (!str.length) {
    return result;
  }
  const matchedToken = tokens.find(token => token.test(str));
  if (!matchedToken) {
    return _tokenize(str.slice(1), tokens, result);
  }
  const matchedString = str.match(matchedToken)[0];
  result.push(matchedString);
  return _tokenize(str.slice(1), tokens, result);
}

module.exports = { reverseString, findFirstOf, findLastOf, tokenize }
