
var groupStrings = function(words) {

    words = words.map(word => word.split('').sort().join(''));
    words.sort(function compareFn(a, b) { return a.length - b.length });

    const wordsGroupedByLength = {};
    for (let n = 1; n <= 26; ++n) {
        wordsGroupedByLength[n] = words.filter(s => s.length == n);
    }

    const wordStartIndexByLength = { 1: 0 };
    for (let n = 2; n <= 26; ++n) {
        wordStartIndexByLength[n] = wordStartIndexByLength[n-1] + wordsGroupedByLength[n-1].length;
    }


    let numberOfGroups = 0;
    let sizeOfTheLargestGroup = 0;

    const searchedIndex = new Array(words.length).fill(false);

    const counters = new Array(words.length).fill(1);

    for (let i = 1; i < words.length; ++i) {
        if (words[i-1] == words[i]) {
            searchedIndex[i-1] = true;
            counters[i] = counters[i-1] + 1;
        }
    }

    for (let i = 0; i < words.length; ++i) {
        if (searchedIndex[i])
            continue;

        numberOfGroups += 1;

        let queue = [];
        let sizeOfCurrentGroup = 0;

        searchedIndex[i] = true;
        queue.push(i);
        sizeOfCurrentGroup += counters[i];

        while (queue.length) {
            const k = queue.pop();
            const len = words[k].length;
            const from = 1 < len ? wordStartIndexByLength[len-1] : 0;
            const to = len+2 <= 26 ? wordStartIndexByLength[len+2] : words.length;
            for (let z = from; z < to; ++z) {
                if (!searchedIndex[z] && isConnected(words[k], words[z])) {
                    searchedIndex[z] = true;
                    queue.push(z);
                    sizeOfCurrentGroup += counters[z];
                }
            }
        }

        if (sizeOfCurrentGroup > sizeOfTheLargestGroup)
            sizeOfTheLargestGroup = sizeOfCurrentGroup;
    }

    return [numberOfGroups, sizeOfTheLargestGroup];
};



/// s1 must shorter than s2
function findFirstDiffCharIndex(s1, s2) {
    for (let i = 0; i < s1.length; ++i) {
        if (s1[i] !== s2[i])
            return i;
    }
    return s1.length;
}

function isConnected(s1, s2) {
    if (s1.length > s2.length)
        [s1, s2] = [s2, s1]; // swap to ensure s1 shorten than s2

    // connected by replace
    if (s1.length == s2.length) {
        const firstDiffCharIndex = findFirstDiffCharIndex(s1, s2);
        if (firstDiffCharIndex == s1.length || firstDiffCharIndex == s1.length - 1)
            return true;
        if (s1[firstDiffCharIndex+1] == s2[firstDiffCharIndex+1])
            return s1.slice(firstDiffCharIndex + 1) === s2.slice(firstDiffCharIndex + 1);
        if (s1[firstDiffCharIndex+1] == s2[firstDiffCharIndex])
            return isConnected(s1.slice(firstDiffCharIndex + 1), s2.slice(firstDiffCharIndex));
        if (s1[firstDiffCharIndex] == s2[firstDiffCharIndex+1])
            return isConnected(s1.slice(firstDiffCharIndex), s2.slice(firstDiffCharIndex + 1));
        return false;
    }
    // can not connect
    if (s1.length+1 < s2.length)
        return false;
    // connected by remove
    const firstDiffCharIndex = findFirstDiffCharIndex(s1, s2);
    return s1.slice(firstDiffCharIndex) === s2.slice(firstDiffCharIndex + 1);
}

