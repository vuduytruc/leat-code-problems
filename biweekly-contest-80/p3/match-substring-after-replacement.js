
var matchReplacement = function(s, sub, mappings) {
    const map = {};
    _unique(sub.split('')).forEach(c => map[c] = [c]);

    mappings.forEach(([from, to]) => {
        if (map[from])
            map[from].push(to);
    });

    Object.keys(map).forEach(k => {
        map[k] = '[' + _unique(map[k]).join('') + ']';
    });

    const reg = new RegExp(sub.split('').map(c => map[c]).join(''));
    return reg.test(s);
};


function _unique(list) {
    return Array.from(new Set(list));
}
