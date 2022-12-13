function compare(leftValue, rightValue) {
    if (leftValue === undefined || leftValue === null) {
        return -1;
    }
    if (rightValue === undefined || rightValue === null) {
        return 1;
    }
    if (typeof leftValue === 'number' && typeof rightValue === 'number') {
        return leftValue - rightValue;
    }
    if (typeof leftValue === 'number') {
        leftValue = [leftValue];
    } else if (typeof rightValue === 'number') {
        rightValue = [rightValue];
    }
    for(let index = 0; index < leftValue.length; index++) {
        let res = compare(leftValue[index], rightValue[index]);
        if (res !== 0) {
            return res;
        }
    };
    return leftValue.length - rightValue.length;
}

module.exports = { compare };