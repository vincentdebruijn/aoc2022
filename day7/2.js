let leftOverSpace = 70000000 - root.size;
let differenceNeeded = 30000000 - leftOverSpace;
let bestSpace = root.size;

allNodes.forEach(node => {
    let size = node.size;
    if (size >= differenceNeeded && size < bestSpace) {
        bestSpace = size;
    }
});

console.log(bestSpace);
