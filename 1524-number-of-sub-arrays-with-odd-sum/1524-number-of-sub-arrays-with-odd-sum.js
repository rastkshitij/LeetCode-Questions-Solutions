/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function(arr) {
     const MOD = 1e9 + 7;

    let even = 1;
    let odd = 0;
    let prefixSum = 0;
    let ans = 0;

    for (let num of arr) {
        prefixSum += num;

        if (prefixSum % 2 !== 0) {
            ans = (ans + even) % MOD;
            odd++;
        } else {
            ans = (ans + odd) % MOD;
            even++;
        }
    }

    return ans;
};