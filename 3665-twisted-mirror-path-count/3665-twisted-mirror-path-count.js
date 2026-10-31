/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePaths = function(grid) {
    const MOD = 1000000007;
    const m = grid.length;
    const n = grid[0].length;

    const left = Array.from({ length: m }, () => Array(n).fill(0));
    const top = Array.from({ length: m }, () => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            // Starting position
            const ways = (i === 0 && j === 0)
                ? 1
                : (left[i][j] + top[i][j]) % MOD;

            if (i === m - 1 && j === n - 1) {
                return ways;
            }

            if (grid[i][j] === 0) {

                // Empty cell: choose right
                if (j + 1 < n) {
                    left[i][j + 1] =
                        (left[i][j + 1] + ways) % MOD;
                }

                // Empty cell: choose down
                if (i + 1 < m) {
                    top[i + 1][j] =
                        (top[i + 1][j] + ways) % MOD;
                }

            } else {

                // Mirror: entered from left -> move down
                if (i + 1 < m) {
                    top[i + 1][j] =
                        (top[i + 1][j] + left[i][j]) % MOD;
                }

                // Mirror: entered from top -> move right
                if (j + 1 < n) {
                    left[i][j + 1] =
                        (left[i][j + 1] + top[i][j]) % MOD;
                }
            }
        }
    }

    return 0;
};