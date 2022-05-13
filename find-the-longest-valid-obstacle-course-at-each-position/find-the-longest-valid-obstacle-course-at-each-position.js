// https://leetcode.com/contest/weekly-contest-253/problems/find-the-longest-valid-obstacle-course-at-each-position/

var longestObstacleCourseAtEachPosition = function(obstacles) {
    const sortedUniqueObstacles = Array.from(new Set(obstacles)).sort(function (a,b) { return a - b; });
    const fenwickTree = new FenwickTree(sortedUniqueObstacles.length);
    const results = [];
    for (let i = 0; i < obstacles.length; ++i) {
        const obstacle = obstacles[i];
        const index = findIndex(sortedUniqueObstacles, obstacle);
        const newValue = fenwickTree.getMax(index) + 1;
        fenwickTree.update(index, newValue);
        results.push(newValue);
    }
    return results;
};


function findIndex(sortedList, item) {
    let low = 0;
    let high = sortedList.length-1;
    let middle;
    if (item === sortedList[low])
        return low;
    if (item === sortedList[high])
        return high;
    while (high-low >= 2) {
        middle = Math.floor((low + high) / 2);
        if (item === sortedList[middle])
            return middle;
        else if (item < sortedList[middle])
            high = middle;
        else
            low = middle;
    }
    return item === sortedList[low] ? low : high;
}


class FenwickTree {
    constructor(n) {
        this.data = new Array(n + 1).fill(0);
    }

    getParent(i) {
        return i - (i & (-i));
    }

    getNext(i) {
        return i + (i & (-i));
    }

    getMax(i) {
        let max = this.data[i];
        ++i;
        while (i > 0) {
            if (this.data[i] > max) {
                max = this.data[i];
            }
            i = this.getParent(i);
        }
        return max;
    }

    update(i, v) {
        ++i;
        while (i < this.data.length) {
            if (this.data[i] < v) {
                this.data[i] = v;
            }
            i = this.getNext(i);
        }
    }
}

