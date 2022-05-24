function leftSums(array) {
    const rs = new Array(array.length).fill(0).map((_,i) => array[i]);
    for (let i = 1; i < rs.length; ++i) {
        rs[i] += rs[i-1];
    }
    return rs;
}