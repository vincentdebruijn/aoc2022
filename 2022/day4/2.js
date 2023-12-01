let arr = await fetch("https://adventofcode.com/2022/day/4/input").then(i => i.text()).then(t => t.trim().split('\n').map(s => s.trim()));

const res = arr.map(line => {
    const ranges = line.split(',');
    const [xMin, xMax] = ranges[0].split('-').map(x => Number(x));
    const [yMin, yMax] = ranges[1].split('-').map(x => Number(x));
    if (xMin >= yMin && xMin <= yMax || xMax >= yMin && xMax <= yMax ||
        yMin >= xMin && yMin <= xMax || yMax >= xMin && yMax <= xMax) {
        return 1;
    } else {
        return 0;
    }
}).reduce((x, a) => x + a);

console.log(res);
