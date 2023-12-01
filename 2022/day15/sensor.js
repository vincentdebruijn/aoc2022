class Sensor {
    constructor(myCoord, closestBeaconCoord) {
        this.myCoord = myCoord;
        this.closestBeaconCoord = closestBeaconCoord;
        this.closestBeaconDistance = this.manhattanDistanceTo(closestBeaconCoord);
    }

    manhattanDistanceTo(coord) {
        return Math.abs(this.myCoord[0] - coord[0]) + Math.abs(this.myCoord[1] - coord[1]);
    }
}

module.exports = { Sensor }