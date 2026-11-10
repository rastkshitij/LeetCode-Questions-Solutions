/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
var climbStairs = function(n, costs) {
    const dp = new Array(n + 1).fill(Infinity);

    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        for (let jump = 1; jump <= 3; jump++) {
            let prev = i - jump;

            if (prev >= 0) {
                dp[i] = Math.min(
                    dp[i],
                    dp[prev] + costs[i - 1] + jump * jump
                );
            }
        }
    }

    return dp[n];
};