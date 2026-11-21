/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */
var findSubtreeSizes = function(parent, s) {
      const n = parent.length;

    const adj = Array.from({ length: n }, () => []);

    // Build original tree
    for (let i = 1; i < n; i++) {
        adj[parent[i]].push(i);
    }

    const newParent = [...parent];

    // Stores the nearest ancestor for each character
    const last = new Array(26).fill(-1);

    function dfs(node) {
        const ch = s.charCodeAt(node) - 97;

        const prev = last[ch];

        // Update parent using the original tree
        if (prev !== -1) {
            newParent[node] = prev;
        }

        last[ch] = node;

        for (const child of adj[node]) {
            dfs(child);
        }

        // Backtrack to maintain the nearest ancestor
        last[ch] = prev;
    }

    dfs(0);

    // Build modified tree
    const tree = Array.from({ length: n }, () => []);

    for (let i = 1; i < n; i++) {
        tree[newParent[i]].push(i);
    }

    // Calculate subtree sizes
    const ans = new Array(n).fill(1);

    function calculate(node) {
        for (const child of tree[node]) {
            calculate(child);
            ans[node] += ans[child];
        }
    }

    calculate(0);

    return ans;
};