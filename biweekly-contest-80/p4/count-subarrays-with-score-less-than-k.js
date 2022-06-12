
var countSubarrays = function(nums, k) {
  k = BigInt(k);

  const prefixSum = nums.map(i => BigInt(i));
  for (let i = 1; i < nums.length; ++i) {
      prefixSum[i] += prefixSum[i-1];
  }

  let rs = 0;
  for (let from = 0; from < nums.length; ++from) {
      if (BigInt(nums[from]) >= k) {
          continue;
      }
      rs += _count(prefixSum, from, k);
  }
  return rs;
};

function _count(prefixSum, from, k) {
  let to = prefixSum.length-1;
  let lower = from;

  const sumF = (from-1 >= 0 ? prefixSum[from-1] : 0n);

  while (lower+2 <= to) {
      const mid = (lower + to)>>1;
      const isMidValid = (prefixSum[mid] - sumF) * BigInt(mid-from+1) < k;
      if (isMidValid) {
          lower = mid;
      } else {
          to = mid;
      }
  }
  const isToValid = (prefixSum[to] - sumF) * BigInt(to-from+1) < k;
  if (isToValid)
      return to-from+1;
  else
      return lower-from+1;
}
