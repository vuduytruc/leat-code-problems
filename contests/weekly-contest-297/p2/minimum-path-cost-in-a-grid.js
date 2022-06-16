
var INF = 1000000000;

var minPathCost = function(grid, moveCost) {
    const m = grid.length;
    const n = grid[0].length;

    let rs1 = grid[0].map(v => v);
    let rs2 = grid[0].map(v => v);

    for (let ri = 1; ri < m; ++ri) {
        [rs1, rs2] = [rs2, rs1];
        for (let ci = 0; ci < n; ++ci) {
            rs2[ci] = INF;
        }

        for (let ci = 0; ci < n; ++ci) {
            const cost = moveCost[grid[ri-1][ci]];
            const currentCost = rs1[ci];
            for (let k = 0; k < n; ++k) {
                const v = currentCost + cost[k] + grid[ri][k];
                if (v < rs2[k])
                    rs2[k] = v;
            }
        }
    }

    return Math.min(...rs2);
};
