
var successfulPairs = function(spells, potions, success) {
    potions.sort(function(a,b){return a-b;});

    const rs = [];

    spells.forEach(s => {
        rs.push(_count(Math.ceil(success/s), potions));
    });

    return rs;
};


function _count(v, potions) {
    let from = 0;
    let to = potions.length-1;

    if (v <= potions[from])
        return potions.length;
    if (v > potions[to])
        return 0;

    while (from+2 <= to) {
        const mid = (from + to)>>1;
        if (potions[mid] < v) {
            from = mid;
        } else {
            to = mid;
        }
    }

    if (potions[from] === v)
        return potions.length-from;
    else
        return potions.length-to;
}
