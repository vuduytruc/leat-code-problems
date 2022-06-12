
function kmpSearch(s, word, kmpTable) {
    if (!kmpTable) {
        kmpTable = buildKmpTable(word);
    }

    const result = [];

    let j = 0;
    let k = 0;

    while (j < s.length) {
        if (word[k] === s[j]) {
            ++j;
            ++k;
            if (k === word.length) { // found
                result.push(j - k);
                k = kmpTable[k]; // NOTE, kmpTable[word.length] !== -1)
            }
        } else {
            k = kmpTable[k];
            if (k < 0) {
                ++j;
                ++k;
            }
        }
    }

    return result;
}

function buildKmpTable(word) {
    const T = new Array(word.length+1).fill(-1);
    let matched = 0;

    for (let pos = 1; pos < word.length; ++pos) {
        if (word[pos] === word[matched]) {
            T[pos] = T[matched];
            ++matched;
        } else {
            T[pos] = matched;
            while (matched >= 0 && word[pos] !== word[matched]) {
                matched = T[matched];
            }
            ++matched;
        }
    }
    T[word.length] = matched;

    return T;
}
