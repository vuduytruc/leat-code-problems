
var minimumObstacles = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const visitedNodes = new Array(m).fill(1).map((r,ri) => new Array(n).fill(false));
    let s0 = []; // current stack
    let s1 = []; // next stack
    let dis = 0;

    s0.push([0,0]);
    visitedNodes[0][0] = true;

    while (true) {
        while (s0.length) {
            const [r,c] = s0.pop();

            const spreading =
                [[r+1,c], [r,c+1], [r-1,c], [r,c-1]]
                .filter(([ri,ci]) => ri >= 0 && ci >= 0 && ri < m && ci < n);

            for (let i = spreading.length-1; i >= 0; --i) {
                const [ri,ci] = spreading[i];
                if (visitedNodes[ri][ci]) {
                    continue;
                }

                if (ri === m-1 && ci === n-1) {
                    return dis + grid[ri][ci];
                }

                visitedNodes[ri][ci] = true;
                if (grid[ri][ci] === 0) {
                    s0.push([ri,ci]);
                } else {
                    s1.push([ri,ci]);
                }
            }
        }

        [s0, s1] = [s1, s0];
        ++dis;
    }
};


