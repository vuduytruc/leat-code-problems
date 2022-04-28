
const MOD = 1000000007;

var numDecodings = function(s) {

    const LEN = s.length;

    const cached = new Array(LEN).fill(0);

    for (let i = LEN-1; i >= 0; --i) {
        cached[i] = f(cached, s, i);
    }

    return cached[0];
};


function f(cached, s, i) {
    if (s[i] === '0')
        return 0;

    if (i == s.length-1)
        return s[i] === '*' ? 9 : 1;

    let result = 0;

    // ---> ONE DIGIT
    const m1 = s[i] === '*' ? 9 : 1;
    result += m1 * cached[i+1];

    // ---> TWO DIGITS
    // NOTES: '*' < '0'
    let m2 = 0;
    if (s[i] === '1' || s[i] === '*')
        m2 += s[i+1] === '*' ? 9 : 1;
    if (s[i] === '2' || s[i] === '*')
        m2 += s[i+1] === '*' ? 6 : s[i+1] <= '6' ? 1 : 0;
    result += m2 * (i == s.length-2 ? 1 : cached[i+2]);

    return result % MOD;
}

