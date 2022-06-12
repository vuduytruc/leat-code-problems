
/// count how many sub array [from, ?] that satisfied condition: sum([from, ?])*[from, ?].length < k
function binarySearchCountPrefix(prefixSum, from, k) { // TODO, change params if needed
    let to = prefixSum.length-1;
    let lower = from;

    const sumF = (from-1 >= 0 ? prefixSum[from-1] : 0n); // TODO, change condition

    while (lower+2 <= to) {
        const mid = (lower + to)>>1;
        const isMidValid = (prefixSum[mid] - sumF) * BigInt(mid-from+1) < k; // TODO, change condition
        if (isMidValid) {
            lower = mid;
        } else {
            to = mid;
        }
    }
    const isToValid = (prefixSum[to] - sumF) * BigInt(to-from+1) < k; // TODO, change condition
    if (isToValid)
        return to-from+1;
    else
        return lower-from+1;
}

