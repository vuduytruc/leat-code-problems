/// https://leetcode.com/problems/restore-the-array

/// TOTAL: 83 testcases


// started at 16:38
// finished at 18:07

// 1 <= s.length <= 10^5
// 1 <= k <= 10^9


const MOD = 1000000007;

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
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


