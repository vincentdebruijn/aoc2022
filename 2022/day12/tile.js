class Tile {
    constructor(x, y, elevation) {
        this.x = x;
        this.y = y;
        this.isStart = false;
        this.isEnd = false;
        this.bestDistance = Number.MAX_SAFE_INTEGER;
        if (elevation === 'S') {
            elevation = 'a';
            this.isStart = true;
            this.bestDistance = 0;
        } else if (elevation === 'E') {
            elevation = 'z';
            this.isEnd = true;
        }
        this.elevation = elevation.charCodeAt(0) - 97;
        this.neighbours = [];
    }

    updateDistance(newDistance) {
        if (newDistance < this.bestDistance) {
            this.bestDistance = newDistance;
            return true;
        }
        return false;
    }

    addNeighbour(tile) {
        if (tile.elevation - this.elevation <= 1) {
            this.neighbours.push(tile);
        }
    }
}

module.exports = { Tile };
