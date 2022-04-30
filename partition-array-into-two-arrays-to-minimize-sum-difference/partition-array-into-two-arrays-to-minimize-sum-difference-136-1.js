
var minimumDifference = function(nums) {
    const m = Math.min(...nums);
    nums = nums.map(i => i - m);

    const total = sum(nums);

    nums = nums.map(i => i*2);

    return f(nums, total, total, 0, 0, 0);
};


function f(nums, total, currentMinDiff, i=0, currentSum=0, currentAmount=0) {

    if (currentAmount == nums.length/2)
        return Math.min(currentMinDiff, Math.abs(total - currentSum));
    if (i == nums.length)
        return currentMinDiff;

    // options 1: pick first item
    currentMinDiff = f(nums, total, currentMinDiff, i+1, currentSum+nums[i], currentAmount+1);

    if (currentMinDiff < 2)
        return currentMinDiff;

    // options 2: not pick first item
    currentMinDiff = f(nums, total, currentMinDiff, i+1, currentSum, currentAmount);

    return currentMinDiff;
}

function sum(list) {
    let result = 0;
    list.forEach(i => result += i);
    return result;
}

