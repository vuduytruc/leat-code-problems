var MOD = 1000000007n;

var countTexts = function(pressedKeys) {
    const dp3 = _createDP3();
    const dp4 = _createDP4();

    let result = 1n;

    let char = pressedKeys[0];
    let count = 1;
    let dp = dp3;

    for (let i = 1; i < pressedKeys.length; ++i) {
        if (pressedKeys[i] === char) {
            ++count;
            continue;
        }

        if (pressedKeys[i] !== char) {
            dp = (char === '7' || char === '9') ? dp4 : dp3;
            result = (result * dp[count]) % MOD;

            char = pressedKeys[i];
            count = 1;
        }
    }

    dp = (char === '7' || char === '9') ? dp4 : dp3;
    result = (result * dp[count]) % MOD;

    return Number(result);
};


function _createDP3() {
    const a = new Array(100001).fill(0n);
    a[1] = 1n;
    a[2] = 2n;
    a[3] = 4n;
    for (let i = 4; i < 100001; ++i) {
        a[i] = (a[i-3] + a[i-2] + a[i-1]) % MOD;
    }
    return a;
}

function _createDP4() {
    const a = new Array(100001).fill(0n);
    a[1] = 1n;
    a[2] = 2n;
    a[3] = 4n;
    a[4] = 8n;
    for (let i = 5; i < 100001; ++i) {
        a[i] = (a[i-4] + a[i-3] + a[i-2] + a[i-1]) % MOD;
    }
    return a;
}
