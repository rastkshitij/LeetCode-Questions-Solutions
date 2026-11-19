/**
 * @param {number[]} stones
 * @return {number}
 */
 class maxHeap{
    constructor(){
        this.heap= [];
    }
    deletion(){
         if(this.heap.length === 0) return null;
        let ele = this.heap[0]
        this.heap[0] = this.heap[this.heap.length -1 ];
        this.heap.pop()
        let i = 0 
        while(true){
            let left =  2 * i + 1;
            let right = 2*i + 2;
            let largest = i;
            if(left <  this.heap.length && this.heap[left] > this.heap[largest]) largest = left;
            if(right < this.heap.length && this.heap[right] > this.heap[largest] ) largest = right;
            if(largest == i) break
            this.swap(this.heap , i , largest);
            i =  largest;
        } 
        return ele
    }
    insertion(val){
        this.heap.push(val)
        let i = this.heap.length -1;
        while(i > 0){
            let parent = Math.floor((i -1) / 2);
            if(this.heap[i] >  this.heap[parent]){
                 this.swap(this.heap , i , parent)
                 i = parent
            } else return
        }
    }
    swap(arr, i , j){
        [arr[i] , arr[j]] = [arr[j] , arr[i]];
    }
 }
var lastStoneWeight = function(stones) {
   if(stones.length === 0) return 0;

    let obj = new maxHeap();

    for(let i = 0; i < stones.length; i++){
        obj.insertion(stones[i]);
    }

    while(obj.heap.length > 1){
        let first = obj.deletion();
        let second = obj.deletion();

        if(first !== second){
            obj.insertion(Math.abs(first - second));
        }
    }

    return obj.heap.length === 0 ? 0 : obj.deletion();
};