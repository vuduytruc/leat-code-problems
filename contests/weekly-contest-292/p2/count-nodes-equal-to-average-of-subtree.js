
var averageOfSubtree = function(root) {
    const [result, sum, nodeCount] = _f(root);
    return result;
};

function _f(root) {
    if (root === null) {
        return [0, 0, 0];
    }

    let result = 0;
    let sum = root.val;
    let nodeCount = 1;

    [root.left, root.right].forEach(child => {
        const [r,s,c] = _f(child);
        result += r;
        sum += s;
        nodeCount += c;
    });

    if (sum === root.val * nodeCount + (sum % nodeCount)) {
        ++result;
    }

    return [result, sum, nodeCount];
}
