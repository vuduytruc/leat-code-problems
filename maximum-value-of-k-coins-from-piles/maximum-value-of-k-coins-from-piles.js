// https://leetcode.com/contest/weekly-contest-286/problems/maximum-value-of-k-coins-from-piles/

var maxValueOfCoins = function(piles, k) {
    normalizePiles(piles);

    const N = piles.length;
    const table = new Array(N).fill(0).map(r => new Array(k+1).fill(0));

    const lastPile = piles[N-1];
    let currentBoundK = Math.min(k, lastPile.length);

    for (let j = 1; j <= currentBoundK; ++j) {
        table[N-1][j] = lastPile[j-1];
    }

    for (let i = N-2; i >= 0; --i) {
        const pile = piles[i];

        currentBoundK = Math.min(k, currentBoundK + pile.length);

        for (let kk = currentBoundK; kk > 0; --kk) {
            let max = table[i+1][kk];
            for (let j1 = Math.min(kk, pile.length); j1 > 0; --j1) {
                const j2 = kk - j1;
                const newVal = pile[j1-1] + table[i+1][j2];
                if (newVal > max)
                    max = newVal;
            }
            table[i][kk] = max;
        }
    }

    return table[0][k];
};


function normalizePiles(piles) {
    for (let i = 0; i < piles.length; ++i) {
        const pile = piles[i];
        for (let k = 1; k < pile.length; ++k) {
            pile[k] += pile[k-1];
        }
    }
}
