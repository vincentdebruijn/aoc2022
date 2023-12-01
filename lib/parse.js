function lines(input) {
  return input.split('\n').map(line => line.trim());
}

module.exports = { lines };
