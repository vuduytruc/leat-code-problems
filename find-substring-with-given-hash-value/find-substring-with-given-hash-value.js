
var ALL_CHARS = '_abcdefghijklmnopqrstuvwxyz';

var subStrHash = function(s, power, modulo, k, hashValue) {
    power = BigInt(power % modulo);
    modulo = BigInt(modulo);
    hashValue = BigInt(hashValue);

    const v = s.split('').map(c => BigInt(ALL_CHARS.indexOf(c)));

    let resultIndex;

    let lastHashValue = 0n;
    let pi = 1n;
    for (let i = 0; i < k; ++i) {
        lastHashValue += v[s.length-k+i] * pi;
        pi = mod(pi * power, modulo);
    }
    lastHashValue = mod(lastHashValue, modulo);
    if (lastHashValue === hashValue)
        resultIndex = s.length - k;

    const pk = pi;
    for (let i = s.length-k-1; i >= 0; --i) {
        lastHashValue = v[i] + lastHashValue * power - v[i+k] * pk;
        lastHashValue = mod(lastHashValue, modulo);
        if (lastHashValue === hashValue)
            resultIndex = i;
    }
    return s.slice(resultIndex, resultIndex + k);
};


function mod(x, mod) {
    x %= mod;
    return (x + mod) % mod;
}
