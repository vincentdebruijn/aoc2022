class Tile {

    constructor() {
        this.isBrick = false;
        this.isSand = false;
    }

    get isBlocked() {
        return this.isBrick || this.isSand;
    }
}

module.exports = { Tile };