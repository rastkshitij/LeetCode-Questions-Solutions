/**
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var minimumSumSubarray = function(nums, l, r) {
    const n = nums.length;

    const prefix = Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    const sorted = [...new Set(prefix)].sort((a, b) => a - b);
    const m = sorted.length;

    const tree = Array(4 * m).fill(0);

    function update(node, start, end, idx, value) {
        if (start === end) {
            tree[node] += value;
            return;
        }

        const mid = Math.floor((start + end) / 2);

        if (idx <= mid) {
            update(node * 2, start, mid, idx, value);
        } else {
            update(node * 2 + 1, mid + 1, end, idx, value);
        }

        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }

    // Find the largest existing prefix sum smaller than target.
    function query(node, start, end, limit) {
        if (start >= limit || tree[node] === 0) return -1;

        if (start === end) return start;

        const mid = Math.floor((start + end) / 2);

        if (mid + 1 < limit && tree[node * 2 + 1] > 0) {
            const result = query(
                node * 2 + 1,
                mid + 1,
                end,
                limit
            );

            if (result !== -1) return result;
        }

        return query(node * 2, start, mid, limit);
    }

    let ans = Infinity;

    for (let i = 0; i <= n; i++) {
        // Add the prefix index that becomes valid.
        const add = i - l;

        if (add >= 0) {
            const idx = sorted.indexOf(prefix[add]);
            update(1, 0, m - 1, idx, 1);
        }

        // Remove prefix indices that are now too old.
        const remove = i - r - 1;

        if (remove >= 0) {
            const idx = sorted.indexOf(prefix[remove]);
            update(1, 0, m - 1, idx, -1);
        }

        const target = prefix[i];

        // Number of compressed values strictly smaller than target.
        let low = 0, high = m;

        while (low < high) {
            const mid = Math.floor((low + high) / 2);

            if (sorted[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        const bestIdx = query(1, 0, m - 1, low);

        if (bestIdx !== -1) {
            ans = Math.min(ans, target - sorted[bestIdx]);
        }
    }

    return ans === Infinity ? -1 : ans; 
};