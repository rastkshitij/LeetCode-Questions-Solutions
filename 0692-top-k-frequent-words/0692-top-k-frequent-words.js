/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
 class minHeap {
    constructor (comparator= (a , b )=> b - a){
        this.heap = [];
        this.comparator = comparator;
    } 
    compare( i , j ){
        return this.comparator(this.heap[i] , this.heap[j]);
    }
deletion(){
    if(this.heap.length === 0) return null;

    let ele = this.heap[0];
    let last = this.heap.pop();

    if(this.heap.length > 0){
        this.heap[0] = last;

        let i = 0;

        while(true){
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let smallest = i;

            if(left < this.heap.length &&
               this.compare(left, smallest) < 0) {
                smallest = left;
            }

            if(right < this.heap.length &&
               this.compare(right, smallest) < 0) {
                smallest = right;
            }

            if(smallest === i) break;

            this.swap(this.heap, i, smallest);
            i = smallest;
        }
    }

    return ele;
}
    insertion(val){
        this.heap.push(val);
        let i = this.heap.length - 1 
        while(i > 0){
            let parent = Math.floor((i - 1) / 2);
            if(this.compare(i , parent ) < 0 ){
                this.swap(this.heap , parent , i)
                i = parent
            } else return 
        }
    }
    swap(arr, i , j){
        [arr[i] , arr[j]] = [arr[j] , arr[i]];
    }
 }
var topKFrequent = function(words, k) {
    let map =  new Map();
    for(let i = 0 ; i < words.length  ; i++){
        map.set(words[i] , (map.get(words[i]) || 0) + 1)
    }
    let obj = new minHeap((a, b) => {
    if(a.freq !== b.freq) return a.freq - b.freq;
    return b.key.localeCompare(a.key);
});
    for(let key of map.keys()){
        obj.insertion({key : key , freq: map.get(key)});
        if(obj.heap.length > k ) obj.deletion();
    }
let ans = [];

while(obj.heap.length > 0){
    ans.push(obj.deletion().key);
}

return ans.reverse();
};