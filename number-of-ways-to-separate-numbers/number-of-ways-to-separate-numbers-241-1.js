/// https://leetcode.com/problems/number-of-ways-to-separate-numbers
/*
numberOfCombinations("327")
    => 2
numberOfCombinations("094")
    => 0
numberOfCombinations("0")
    => 0
numberOfCombinations("9999999999999")
    => 101
numberOfCombinations("57366096569998808177038860868034764472649082771812982665702793714521117518689268602592222064474212309407778097339776719903849830220")
    => 14022729
*/


/**
 * @param {string} num
 * @return {number}
 */
var numberOfCombinations = function(num) {
    const startTime = new Date();

    if (num[0] === '0') {
        return 0;
    }

    var mF = memoize(f);

    let result = 0;

    for (let n = 1; n <= num.length; n += 1) {
        result += mF(num, 0, n);
    }

    const elapsedTime = new Date() - startTime;
    console.log('ElapsedTime:', elapsedTime/1000 + 's');
    return result;
};


function memoize(f) {
    const cached = {};
    function memoizedFunc(num, i, n) {
        const cachedKey = [i,n].join(',');
        if (cachedKey in cached) {
            // do nothing
        } else {
            cached[cachedKey] = f(num, i, n);
        }
        return cached[cachedKey];
    }
    return memoizedFunc;
}

function f(num, i, n) {
    // console.log('--> f', num, i, n);
    if (i+n > num.length) {
        // console.log('*f', num, i, n, '==', 0);
        return 0;
    }
    if (num[i] === '0') {
        // console.log('*f', num, i, n, '==', 0);
        return 0;
    }
    if (i+n == num.length) {
        // console.log('*f', num, i, n, '==', 1);
        return 1;
    }

    let result = 0;

    // case 1: next subNum length == n
    const isCase1Valid = num.slice(i, i+n) <= num.slice(i+n, i+2*n);
    if (isCase1Valid) {
        result += f(num, i+n, n);
    }

    // case 2: next subNum length > n
    for (let k = n+1; k <= num.length-i-n; k += 1) {
        result += f(num, i+n, k);
    }

    // console.log('f', num, i, n, '==', result);
    return result;
}


