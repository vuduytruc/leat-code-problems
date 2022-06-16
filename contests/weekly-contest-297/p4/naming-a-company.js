var ALL_CHARS = Array.from(new Set('qwertyuiopasdfghjklzxcvbnm'.split(''))).sort();

var distinctNames = function(ideas) {
    const N = ideas.length;

    const countByStartChar = {};
    const ideasGroupedByEndChars = {};
    const countDupEndCharsPairs = {};
    for (let i = 0; i < ALL_CHARS.length; ++i) {
        for (let j = i+1; j < ALL_CHARS.length; ++j) {
            const k = [ALL_CHARS[i], ALL_CHARS[j]].sort().join('');
            countDupEndCharsPairs[k] = 0;
        }
    }

    ideas.map(idea => {
        const startChar = idea[0];
        const endChars = idea.slice(1);

        countByStartChar[startChar] = 1 + (countByStartChar[startChar] || 0);

        if (!ideasGroupedByEndChars[endChars])
            ideasGroupedByEndChars[endChars] = [startChar];
        else
            ideasGroupedByEndChars[endChars].push(startChar);
    });

    let result = N*(N-1);

    Object.entries(countByStartChar)
        .forEach(([startChar, count]) => {
            result -= count*(count-1);
        });

    Object.entries(ideasGroupedByEndChars)
        .filter(([endChars, startCharList]) => startCharList.length > 1)
        .forEach(([endChars, startCharList]) => {
            let count = 0;
            startCharList.forEach(startChar => {
                count += countByStartChar[startChar];
            });

            let delta = 0;
            delta += 2*count*(startCharList.length-1);
            delta -= startCharList.length*(startCharList.length-1); // remove pair which counted twice
            for (let i = 0; i < startCharList.length; ++i) {
                for (let j = i+1; j < startCharList.length; ++j) {
                    const k = [startCharList[i], startCharList[j]].sort().join('');
                    delta -= 4*countDupEndCharsPairs[k]; // remove pair already counted in previous loop (exit in other EndCharsGroup)
                    ++countDupEndCharsPairs[k];
                }
            }

            result -= delta;
        });

    return result;
};
