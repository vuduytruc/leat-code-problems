
var largestGoodInteger = function(num) {
    let bestChar = '';

    for (let i = 2; i < num.length; ++i) {
        if (num[i] === num[i-1] && num[i] === num[i-2]) {
            if (!bestChar || num[i] > bestChar)
                bestChar = num[i];
        }
    }

    return bestChar+bestChar+bestChar;
};
