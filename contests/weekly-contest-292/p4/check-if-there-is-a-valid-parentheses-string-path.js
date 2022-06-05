
var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    if ((m+n)%2 === 0 || grid[0][0] !== '(' || grid[m-1][n-1] !== ')')
        return false;

    _normalize(grid);

    let c1 = new Array(100).fill(0).map((_,i) => new Set(grid[0][i] >= 0 ? [grid[0][i]] : []));
    let c2 = new Array(100).fill(0).map(_ => new Set());
    console.log(c1.slice(0, n).map(s => Array.from(s)));

    for (let r = 1; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            c2[c].clear();
        }

        if (grid[r][0] >= 0)
            c2[0].add(grid[r][0]);

        for (let c = 1; c < n; ++c) {
            const delta = grid[r][c];
            c1[c].forEach(v => {
                if (v + delta >= 0)
                    c2[c].add(v + delta);
            });
            c2[c-1].forEach(v => {
                if (v + delta >= 0)
                    c2[c].add(v + delta);
            });
        }

        [c1, c2] = [c2, c1];
        console.log(c1.slice(0, n).map(s => Array.from(s)));
    }

    return c1[n-1].has(0);
};


function _normalize(grid) {
    for (let r = 0; r < grid.length; ++r) {
        for (let c = 0; c < grid[0].length; ++c) {
            grid[r][c] = grid[r][c] === '(' ? 1 : -1;
        }
    }

    /// NOTES, first row and first column store prefix sum
    for (let r = 1; r < grid.length; ++r) {
        if (grid[r-1][0] < 0)
            grid[r][0] = -1;
        else
            grid[r][0] += grid[r-1][0];
    }
    for (let c = 1; c < grid[0].length; ++c) {
        if (grid[0][c-1] < 0)
            grid[0][c] = -1;
        else
            grid[0][c] += grid[0][c-1];
    }
    console.log(grid);
}
