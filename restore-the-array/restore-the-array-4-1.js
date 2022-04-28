/// https://leetcode.com/problems/restore-the-array

/// TOTAL: 257 testcases


// started at 16:38

// 1 <= s.length <= 105
// 1 <= k <= 109

const MOD = 1000000007;

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfArrays = function(s, k) {
    k = k.toString();

    const LEN  = s.length;

    let oldCached = new Array(LEN).fill(0);
    let newCached = new Array(LEN).fill(0);

    for (let n = 1; n <= k.length; ++n) {
        [newCached, oldCached] = [oldCached, newCached]; // swap caches
        for (let i = LEN-1; i >= 0; --i) {
            newCached[i] = f(newCached, oldCached, s, k, i, n);
        }
        // console.log('---', n, newCached);
    }

    return newCached[0];
};

function f(newCached, oldCached, s, k, i, n) {
    // if (n == 2 && i == 2) { console.log('f', i, n); }

    if (s[i] === '0')
        return 0;
    if (i+n > s.length)
        return oldCached[i];

    const isSubNumValid = s.slice(i, i+n) <= k;
    // if (n == 2 && i == 2) { console.log('isSubNumValid =', isSubNumValid); }

    if (i+n == s.length && isSubNumValid)
        return 1;

    let result = 0;

    if (isSubNumValid)
        result += newCached[i+n];

    result += oldCached[i];

    // if (n == 2 && i == 2) { console.log('f', i, n, '==', result); }
    return result % MOD;
}

