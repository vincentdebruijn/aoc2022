import { Node } from './node';
import { File } from './file';

let text = await fetch("https://adventofcode.com/2022/day/7/input").then(i => i.text());

let instructions = text.split('\n');

let root = new Node('/');
let allNodes = [root];

let currentNode = root;

instructions.slice(1).forEach(instruction => {
    let match = instruction.match(/^\$ cd (.+)$/);
    if (match) {
        if (match[1] === '..') {
            currentNode = currentNode.parent;
        } else {
            currentNode = currentNode.getChildByName(match[1]);
        }
    }

    match = instruction.match(/^dir (.+)$/);
    console.log(match);
    if (match) {
        let child = new Node(match[1], currentNode);
        currentNode.addChild(child);
        allNodes.push(child);
    }

    match = instruction.match(/^(\d+) (\S+)$/);
    if (match) {
        currentNode.addChild(new File(match[2], currentNode, Number(match[1])));
    }
});

console.log(allNodes.filter(node => node.size <= 100000).reduce((a,x) => a + x));