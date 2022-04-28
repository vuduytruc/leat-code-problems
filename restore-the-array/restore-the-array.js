
const MOD = 1000000007;

var numberOfArrays = function(s, k) {

    k = k.toString();

    const LEN = s.length;

    const bestICached = new Array(LEN).fill(0);
    const nCached = new Array(k.length).fill(0);

    for (let i = LEN-1; i >= 0; --i) {
        for (let n = k.length; n > 0; --n) {
            nCached[n-1] = f(bestICached, nCached, s, k, i, n);
        }
        bestICached[i] = nCached[0];
    }

    return bestICached[0];
};


function f(bestICached, nCached, s, k, i, n) {
    if (i+n > s.length)
        return 0;
    if (s[i] === '0')
        return 0;

    const isSubNumValid = n < k.length || s.slice(i, i+n) <= k;

    if (i+n == s.length && isSubNumValid)
        return 1;
    if (i+n == s.length && !isSubNumValid)
        return 0;

    let result = 0;

    if (isSubNumValid)
        result += bestICached[i+n];

    if (n < nCached.length)
        result += nCached[n];

    result %= MOD;
    return result;
}


