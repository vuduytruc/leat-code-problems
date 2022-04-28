
const MOD = 1000000007;

var numberOfCombinations = function(num) {

    const LEN = num.length;

    let newCached = new Array(LEN).fill(0);
    let oldCached = new Array(LEN).fill(0);

    for (let n = LEN; n > 0; --n) {
        [newCached, oldCached] = [oldCached, newCached]; // swap caches
        for (let i = LEN-1; i >= 0; --i) {
            newCached[i] = f(newCached, oldCached, num, i, n);
        }
    }

    return newCached[0];
};


function f(newCached, oldCached, num, i, n) {
    if (i+n > num.length)
        return 0;
    if (num[i] === '0')
        return 0;
    if (i+n == num.length)
        return 1;

    let result = 0;

    if (num.slice(i, i+n) <= num.slice(i+n, i+2*n))
        result += newCached[i+n];
    else
        result += oldCached[i+n];

    if (i+n < num.length)
        result += oldCached[i];

    result %= MOD;
    return result;
}


