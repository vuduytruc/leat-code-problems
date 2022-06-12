
/// count number of item in list >= value
function binarySearchCount(v, list) {
    let from = 0;
    let to = list.length-1;

    if (v <= list[from])
        return list.length;
    if (v > list[to])
        return 0;

    while (from+2 <= to) {
        const mid = (from + to)>>1;
        if (list[mid] < v) {
            from = mid;
        } else {
            to = mid;
        }
    }

    if (list[from] === v)
        return list.length-from;
    else
        return list.length-to;
}
