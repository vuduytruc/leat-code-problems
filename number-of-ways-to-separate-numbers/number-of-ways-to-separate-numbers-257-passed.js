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
=====> 755568658
// ElapsedTime: ~0.8s
*/



/// no memoized
/// COUNTER = 282905779
/// ElapsedTime: 11.806s
/// 14022729

/// memoized
/// COUNTER = 22553
/// ElapsedTime: 0.056s
/// 14022729

/// dynamic programming using table
/// COUNTER = 21317
/// ElapsedTime: 0.017s
/// 14022729

/// dynamic programming using two list
/// COUNTER = 17161
/// ElapsedTime: 0.005s
/// 14022729


let COUNTER = 0;

const MOD = 1000000007;

const initCache = function(len) {
    return new Array(len).fill(0);
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

    let newCached = initCache(LEN);
    let oldCached = initCache(LEN);

    for (let n = LEN; n > 0; --n) {
        [newCached, oldCached] = [oldCached, newCached]; // swap caches
        for (let i = LEN-1; i >= 0; --i) {
            newCached[i] = f(newCached, oldCached, num, i, n);
        }
    }
    result = newCached[0];

    const elapsedTime = new Date() - startTime;

    console.log('COUNTER =', COUNTER);
    console.log('ElapsedTime:', elapsedTime/1000 + 's');

    return result;
};


function f(newCached, oldCached, num, i, n) {
    ++COUNTER;


    if (i+n > num.length) {
        return 0;
    }
    if (num[i] === '0') {
        return 0;
    }
    if (i+n == num.length) {
        return 1;
    }

    let result = 0;

    //// OPTION 1: if (next subNum length == n) is valid
    // case 1.1: next subNum length == n
    const isCase1Valid = num.slice(i, i+n) <= num.slice(i+n, i+2*n);
    if (isCase1Valid) {
        result += newCached[i+n];
        // result += f(cached, num, i+n, n);
        result %= MOD;
    }

    // case 1.2: next subNum length > n
    if (!isCase1Valid) {
        result += oldCached[i+n];
        // result += f(cached, num, i+n, n+1);
        result %= MOD;
    }

    //// OPTION 2: current subNum length > n
    if (i+n < num.length) {
        result += oldCached[i];
        // result += f(cached, num, i, n+1);
        result %= MOD;
    }

    return result;
}


