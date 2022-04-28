/// https://leetcode.com/problems/number-of-ways-to-separate-numbers

/// TOTAL: 257 testcases

/*
numberOfCombinations("327")
=====> 2

numberOfCombinations("094")
=====> 0

numberOfCombinations("0")
=====> 0

// #58
numberOfCombinations("9999999999999")
=====> 101

// #242
numberOfCombinations("57366096569998808177038860868034764472649082771812982665702793714521117518689268602592222064474212309407778097339776719903849830220")
=====> 14022729

// #257
numberOfCombinations(Array(3500).fill('1').join(''))
=====> ???
*/



/// no memoized
/// COUNTER = 282905779
/// ElapsedTime: 11.806s
/// 14022729

/// memoized
/// COUNTER = 22553
/// ElapsedTime: 0.056s
/// 14022729

/// dynamic programming
/// COUNTER = 21317
/// ElapsedTime: 0.017s
/// 14022729

// 1500x'1' ==> 188746905 ___ 44s

let COUNTER = 0;

const MOD = 1000000007;

const initCache = function(len) {
    const rows = new Array(len).fill(0);
    return rows.map(r => new Array(len));
}

/**
 * @param {string} num
 * @return {number}
 */
var numberOfCombinations = function(num) {
    const startTime = new Date();
    COUNTER = 0;

    if (num[0] === '0') {
        return 0;
    }

    let result = 0;

    const LEN = num.length;

    const cached = initCache(LEN);

    for (let n = LEN; n > 0; --n) {
        for (let i = LEN-1; i >= 0; --i) {
            f(cached, num, i, n);
        }
    }
    result = cached[0][1];

    const elapsedTime = new Date() - startTime;

    console.log('COUNTER =', COUNTER);
    console.log('ElapsedTime:', elapsedTime/1000 + 's');

    return result;
};


function f(cached, num, i, n) {
    if (cached[i][n]) {
        return cached[i][n];
    }

    ++COUNTER;

    // console.log('--> f', i, n);
    if (i+n > num.length) {
        // console.log('*f', i, n, '==', 0);
        cached[i][n] = 0;
        return 0;
    }
    if (num[i] === '0') {
        // console.log('*f', i, n, '==', 0);
        cached[i][n] = 0;
        return 0;
    }
    if (i+n == num.length) {
        // console.log('*f', i, n, '==', 1);
        cached[i][n] = 1;
        return 1;
    }

    let result = 0;

    //// OPTION 1: if (next subNum length == n) is valid
    // case 1.1: next subNum length == n
    const isCase1Valid = num.slice(i, i+n) <= num.slice(i+n, i+2*n);
    if (isCase1Valid) {
        result += f(cached, num, i+n, n);
        result %= MOD;
    }

    // case 1.2: next subNum length > n
    if (!isCase1Valid) {
        result += f(cached, num, i+n, n+1);
        result %= MOD;
    }

    //// OPTION 2: current subNum length > n
    if (i+n < num.length) {
        result += f(cached, num, i, n+1);
        result %= MOD;
    }

    // console.log('f', i, n, '==', result);
    cached[i][n] = result;
    return result;
}


