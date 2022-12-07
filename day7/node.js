class Node {
    constructor(name, parent = null) {
        this.name = name;
        this.parent = parent;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }

    getChildByName(name) {
        return this.children.find(child => child.name === name);
    }

    get size() {
        return this.children.map(child => child.size).reduce((x, a) => x + a)
    }
}