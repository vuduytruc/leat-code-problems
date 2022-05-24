function rightSums(array) {
    const rs = new Array(array.length).fill(0).map((_,i) => array[i]);
    for (let i = rs.length-2; i >= 0; --i) {
        rs[i] += rs[i+1];
    }
    return rs;
}