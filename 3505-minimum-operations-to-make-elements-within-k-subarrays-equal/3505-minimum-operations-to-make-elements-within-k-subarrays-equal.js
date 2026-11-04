/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
 class TreapNode {
    constructor(val) {
        this.val = val;
        this.priority = Math.random();
        this.count = 1;
        this.size = 1;
        this.sum = val;
        this.left = null;
        this.right = null;
    }
}

class Treap {
    constructor() {
        this.root = null;
    }

    size(node) {
        return node ? node.size : 0;
    }

    sum(node) {
        return node ? node.sum : 0;
    }

    update(node) {
        if (!node) return;

        node.size = node.count +
            this.size(node.left) +
            this.size(node.right);

        node.sum = node.val * node.count +
            this.sum(node.left) +
            this.sum(node.right);
    }

    rotateRight(node) {
        let l = node.left;
        node.left = l.right;
        l.right = node;
        this.update(node);
        this.update(l);
        return l;
    }

    rotateLeft(node) {
        let r = node.right;
        node.right = r.left;
        r.left = node;
        this.update(node);
        this.update(r);
        return r;
    }

    insert(node, val) {
        if (!node) return new TreapNode(val);

        if (val === node.val) {
            node.count++;
        } else if (val < node.val) {
            node.left = this.insert(node.left, val);

            if (node.left.priority > node.priority) {
                node = this.rotateRight(node);
            }
        } else {
            node.right = this.insert(node.right, val);

            if (node.right.priority > node.priority) {
                node = this.rotateLeft(node);
            }
        }

        this.update(node);
        return node;
    }

    erase(node, val) {
        if (!node) return null;

        if (val < node.val) {
            node.left = this.erase(node.left, val);
        } else if (val > node.val) {
            node.right = this.erase(node.right, val);
        } else {
            if (node.count > 1) {
                node.count--;
            } else {
                if (!node.left) return node.right;
                if (!node.right) return node.left;

                if (node.left.priority > node.right.priority) {
                    node = this.rotateRight(node);
                    node.right = this.erase(node.right, val);
                } else {
                    node = this.rotateLeft(node);
                    node.left = this.erase(node.left, val);
                }
            }
        }

        this.update(node);
        return node;
    }

    add(val) {
        this.root = this.insert(this.root, val);
    }

    remove(val) {
        this.root = this.erase(this.root, val);
    }

    kth(node, k) {
        let leftSize = this.size(node.left);

        if (k < leftSize) return this.kth(node.left, k);

        if (k < leftSize + node.count) return node.val;

        return this.kth(node.right, k - leftSize - node.count);
    }

    getSumFirst(node, k) {
        if (!node || k <= 0) return 0;

        let leftSize = this.size(node.left);

        if (k <= leftSize) {
            return this.getSumFirst(node.left, k);
        }

        let result = this.sum(node.left);
        let take = Math.min(node.count, k - leftSize);

        result += take * node.val;

        if (k > leftSize + node.count) {
            result += this.getSumFirst(
                node.right,
                k - leftSize - node.count
            );
        }

        return result;
    }

    getCost(x) {
        let median = this.kth(this.root, Math.floor((x - 1) / 2));
        let leftCount = Math.floor((x + 1) / 2);
        let leftSum = this.getSumFirst(this.root, leftCount);
        let totalSum = this.sum(this.root);
        let rightCount = x - leftCount;
        let rightSum = totalSum - leftSum;

        return median * leftCount - leftSum
            + rightSum - median * rightCount;
    }
}

var minOperations = function(nums, x, k) {
      const n = nums.length;
    const treap = new Treap();

    const cost = new Array(n - x + 1);

    // Step 1: Calculate every window's cost.
    for (let i = 0; i < n; i++) {
        treap.add(nums[i]);

        if (i >= x) {
            treap.remove(nums[i - x]);
        }

        if (i >= x - 1) {
            cost[i - x + 1] = treap.getCost(x);
        }
    }

    // Step 2: Dynamic Programming.
    const INF = Infinity;

    let dp = Array.from(
        { length: k + 1 },
        () => new Array(n + 1).fill(INF)
    );

    for (let i = 0; i <= n; i++) {
        dp[0][i] = 0;
    }

    for (let j = 1; j <= k; j++) {
        for (let i = j * x; i <= n; i++) {

            // Skip current element.
            dp[j][i] = dp[j][i - 1];

            // Select the last x elements.
            dp[j][i] = Math.min(
                dp[j][i],
                dp[j - 1][i - x] + cost[i - x]
            );
        }
    }

    return dp[k][n];
};