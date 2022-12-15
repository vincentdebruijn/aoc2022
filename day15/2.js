const fs = require('fs');
const { Sensor } = require('./sensor');

const text = fs.readFileSync('input', 'utf-8').trim();

const sensors = text.split('\n').map(line => {
    const match = line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/);
    return new Sensor([Number(match[1]), Number(match[2])], [Number(match[3]), Number(match[4])]);
});

let max = 4000000;
let y = 0;
let x = 0;
while(true) {
    let sensor = sensors.find(sensor => sensor.closestBeaconDistance >= sensor.manhattanDistanceTo([x, y]));
    if (!sensor) {
        break;
    }
    // To avoid checking every tile, we can calculate the first x on this row (y) outside the range of the sensor.
    let yDiff = Math.abs(sensor.myCoord[1] - y);
    // Manhattan distance means every row away from the sensor, we have to subtract this from the maximum distance.
    x = sensor.closestBeaconDistance + sensor.myCoord[0] - yDiff + 1;
    if (x > max) {
        x = 0;
        y++;
        if (y > max) {
            break;
        }
    }
}

console.log(x*4000000 + y);