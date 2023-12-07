function objectGroupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function count(xs) {
  return xs.reduce((rv, x) => {
    rv[x] = (rv[x] || 0) + 1;
    return rv;
  }, {});
};

module.exports = { objectGroupBy, count }
