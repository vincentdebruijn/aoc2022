const fs = require('fs');
const { Sensor } = require('./sensor');

const text = fs.readFileSync('input', 'utf-8').trim();

const sensors = text.split('\n').map(line => {
    const match = line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/);
    return new Sensor([Number(match[1]), Number(match[2])], [Number(match[3]), Number(match[4])]);
});

const mostRightSensorX = Math.max(...sensors.map(sensor => sensor.myCoord[0]));
const allBeaconPositions = sensors.map(sensor => sensor.closestBeaconCoord);

let count = 0;
const y = 2000000;
let x = -10000000;
let lastKnownPositionNotBeacon = false;
while(x <= mostRightSensorX || lastKnownPositionNotBeacon) {
    if (!allBeaconPositions.find(pos => pos[0] === x && pos[1] === y)) {
        lastKnownPositionNotBeacon = sensors.find(sensor => sensor.closestBeaconDistance >= sensor.manhattanDistanceTo([x, y]));
        if (lastKnownPositionNotBeacon) {
            count++;
        }
    }
    x++;
}

console.log(count);