
var minimumDifference = function(nums) {

    const N = nums.length/2;

    nums = normalizeNums(nums);

    const total = sum(nums);

    nums = nums.map(i => i*2);

    const leftNums = nums.slice(0, N);
    const rightNums = nums.slice(N);

    let minDiff = total - sum(leftNums);


    const allPossibleSums = new AllPossibleSums(rightNums);

    const pow2N = Math.pow(2, N);
    for (let mask = 0; mask < pow2N; ++mask) {
        const [leftSum, leftCount] = getSumAndCount(leftNums, mask);
        const target = total - leftSum;
        const bestRightSum = allPossibleSums.findNearestSum(target, N-leftCount);
        const diff = Math.abs(target - bestRightSum);
        if (diff < minDiff) {
            minDiff = diff;
            if (diff < 2)
                break;
        }
    }

    return minDiff;
};



var MAX_N = 15;
var ONE_BIT_NUMBERS = new Array(MAX_N).fill(0).map((_, i) => 1 << i);


function getSumAndCount(nums, mask) {
    let s = 0;
    let k = 0;
    for (let i = 0; i < nums.length; ++i) {
        if (mask & ONE_BIT_NUMBERS[i]) {
            s += nums[i];
            ++k;
        }
    }
    return [s, k];
}

class AllPossibleSums {
    constructor(nums) {
        const N = nums.length;
        this.possibleSumsMap = {};
        for (let k = 0; k <= N; ++k) {
            this.possibleSumsMap[k] = [];
        }
        const pow2N = Math.pow(2, N);
        for (let mask = 0; mask < pow2N; ++mask) {
            const [s, k] = getSumAndCount(nums, mask);
            this.possibleSumsMap[k].push(s);
        }
        for (let k = 0; k <= N; ++k) {
            this.possibleSumsMap[k].sort(function(a,b) { return a-b; });
        }
    }

    // binary search
    findNearestSum(target, count) {
        const possibleSums = this.possibleSumsMap[count];
        let start = 0;
        let end = possibleSums.length-1;

        if (possibleSums[start] >= target)
            return possibleSums[start];
        if (possibleSums[end] <= target)
            return possibleSums[end];

        let middle;
        while (end - start > 1) {
            middle = Math.floor((start + end)/2);
            if (possibleSums[middle] == target)
                target;
            if (possibleSums[middle] < target)
                start = middle;
            else
                end = middle;
        }
        if (possibleSums[end] - target < target - possibleSums[start])
            return possibleSums[end];
        else
            return possibleSums[start];
    }
}


function normalizeNums(nums) {
    nums.sort(function(a,b) { return a-b; });
    const m = nums[0];
    nums = nums.map(i => i - m);
    return nums;
}


function sum(list) {
    let result = 0;
    list.forEach(i => result += i);
    return result;
}

function min2(a, b) {
    return a < b ? a : b;
}



