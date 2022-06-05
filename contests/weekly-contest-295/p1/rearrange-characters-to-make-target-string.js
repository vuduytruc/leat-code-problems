var rearrangeCharacters = function(s, target) {
    const targetCounter = {};
    target.split('').forEach(c => {
        if (!targetCounter[c]) {
            targetCounter[c] = 0;
        }
        ++targetCounter[c];
    });


    const counter = {};
    s.split('').forEach(c => {
        if (!counter[c]) {
            counter[c] = 0;
        }
        ++counter[c];
    });


    return Math.min(...Object.entries(targetCounter).map(([c, count]) => Math.floor((counter[c]||0) / count)));
};
