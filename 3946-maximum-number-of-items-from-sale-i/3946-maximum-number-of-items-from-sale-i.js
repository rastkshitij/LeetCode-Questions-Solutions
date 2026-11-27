/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function(items, budget) {
     const n = items.length;
    const MAX = 1500;

    const freq = new Array(MAX + 1).fill(0);

    let minPrice = Infinity;

    for (const [factor, price] of items) {
        freq[factor]++;
        minPrice = Math.min(minPrice, price);
    }

    // Calculate free items for each factor
    const free = new Array(MAX + 1).fill(0);

    for (let f = 1; f <= MAX; f++) {
        for (let j = f; j <= MAX; j += f) {
            free[f] += freq[j];
        }

        free[f] -= 1;
    }

    // 0/1 Knapsack
    const dp = new Array(budget + 1).fill(0);

    for (const [factor, price] of items) {
        const value = 1 + free[factor];

        for (let b = budget; b >= price; b--) {
            dp[b] = Math.max(
                dp[b],
                dp[b - price] + value
            );
        }
    }

    // Add extra copies using remaining budget
    let ans = 0;

    for (let b = 0; b <= budget; b++) {
        const remaining = budget - b;

        ans = Math.max(
            ans,
            dp[b] + Math.floor(remaining / minPrice)
        );
    }

    return ans;
};