/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countNonDecreasingSubarrays = function(nums, k) {
  const n = nums.length;
    const LOG = Math.ceil(Math.log2(n)) + 1;

    // 1. Next Greater Element
    const nge = new Int32Array(n);
    nge.fill(n);

    const st = [];

    for (let i = n - 1; i >= 0; i--) {
        while (
            st.length &&
            nums[st[st.length - 1]] <= nums[i]
        ) {
            st.pop();
        }

        if (st.length) {
            nge[i] = st[st.length - 1];
        }

        st.push(i);
    }

    // 2. Binary lifting tables
    const up = Array.from(
        { length: LOG },
        () => new Int32Array(n)
    );

    const sum = Array.from(
        { length: LOG },
        () => new Float64Array(n)
    );

    for (let i = 0; i < n; i++) {
        up[0][i] = nge[i];
        sum[0][i] = nums[i] * (nge[i] - i);
    }

    for (let j = 1; j < LOG; j++) {
        for (let i = 0; i < n; i++) {
            const mid = up[j - 1][i];

            if (mid < n) {
                up[j][i] = up[j - 1][mid];

                sum[j][i] =
                    sum[j - 1][i] + sum[j - 1][mid];
            } else {
                up[j][i] = n;
                sum[j][i] = sum[j - 1][i];
            }
        }
    }

    // 3. Original prefix sums
    const prefix = new Float64Array(n + 1);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    // 4. Calculate sum of prefix maximums
    function getMaxSum(l, r) {
        let current = l;
        let total = 0;

        for (let j = LOG - 1; j >= 0; j--) {
            const next = up[j][current];

            if (next <= r) {
                total += sum[j][current];
                current = next;
            }
        }

        total += nums[current] * (r - current + 1);

        return total;
    }

    // 5. Sliding window
    let left = 0;
    let answer = 0;

    for (let right = 0; right < n; right++) {

        while (left <= right) {
            const maxSum = getMaxSum(left, right);

            const originalSum =
                prefix[right + 1] - prefix[left];

            const operations = maxSum - originalSum;

            if (operations <= k) break;

            left++;
        }

        answer += right - left + 1;
    }

    return answer;   
};