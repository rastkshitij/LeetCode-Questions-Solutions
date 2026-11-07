
/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */

var assignTasks = function(servers, tasks) {

    const available = [];
    const busy = [];
    const ans = [];

    // Comparators
    const cmpAvailable = (a, b) =>
        a.weight - b.weight || a.index - b.index;

    const cmpBusy = (a, b) =>
        a.freeTime - b.freeTime ||
        a.weight - b.weight ||
        a.index - b.index;

    // Generic heap push
    function push(heap, value, cmp) {
        heap.push(value);

        let i = heap.length - 1;

        while (i > 0) {
            let p = Math.floor((i - 1) / 2);

            if (cmp(heap[i], heap[p]) >= 0) break;

            [heap[i], heap[p]] = [heap[p], heap[i]];
            i = p;
        }
    }

    // Generic heap pop
    function pop(heap, cmp) {
        const top = heap[0];
        const last = heap.pop();

        if (heap.length > 0) {
            heap[0] = last;

            let i = 0;

            while (true) {
                let smallest = i;
                let l = 2 * i + 1;
                let r = 2 * i + 2;

                if (
                    l < heap.length &&
                    cmp(heap[l], heap[smallest]) < 0
                ) {
                    smallest = l;
                }

                if (
                    r < heap.length &&
                    cmp(heap[r], heap[smallest]) < 0
                ) {
                    smallest = r;
                }

                if (smallest === i) break;

                [heap[i], heap[smallest]] =
                    [heap[smallest], heap[i]];

                i = smallest;
            }
        }

        return top;
    }

    // Initially all servers are available
    for (let i = 0; i < servers.length; i++) {
        push(available, {
            weight: servers[i],
            index: i
        }, cmpAvailable);
    }

    let time = 0;

    for (let j = 0; j < tasks.length; j++) {

        time = Math.max(time, j);

        // Release completed servers
        while (
            busy.length > 0 &&
            busy[0].freeTime <= time
        ) {
            let server = pop(busy, cmpBusy);

            push(available, {
                weight: server.weight,
                index: server.index
            }, cmpAvailable);
        }

        // Wait if all servers are busy
        if (available.length === 0) {

            time = busy[0].freeTime;

            while (
                busy.length > 0 &&
                busy[0].freeTime <= time
            ) {
                let server = pop(busy, cmpBusy);

                push(available, {
                    weight: server.weight,
                    index: server.index
                }, cmpAvailable);
            }
        }

        // Assign task to the best available server
        let server = pop(available, cmpAvailable);

        ans.push(server.index);

        // Add server to busy heap
        push(busy, {
            weight: server.weight,
            index: server.index,
            freeTime: time + tasks[j]
        }, cmpBusy);
    }

    return ans;
};
