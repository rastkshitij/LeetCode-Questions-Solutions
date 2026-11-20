/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
class minHeap{
    constructor(){
        this.heap = []
    } 
    deletion(){
        let ele = this.heap[0]
        this.heap[0] = this.heap[this.heap.length -1 ]
        this.heap.pop()
        let i = 0 
        while(true){
            let left = 2*i +1;
            let right= 2*i +2;
            let largest = i;
            if(left < this.heap.length && this.heap[left] < this.heap[largest]) largest = left;
            if(right < this.heap.length && this.heap[right] < this.heap[largest]) largest = right;
            if(i === largest ) break
            this.swap(this.heap , i , largest );
            i = largest;
        }
        return ele
    } 
    insertion(val){
     this.heap.push(val)
    let i = this.heap.length -1;
     while(i > 0){
            let parent = Math.floor((i -1) / 2);
            if(this.heap[i] <  this.heap[parent]){
                 this.swap(this.heap , i , parent)
                 i = parent
            } else return
        }
    }
    swap(arr, i , j){
        [arr[i] , arr[j]] = [arr[j] , arr[i]];
    }

}
var findKthLargest = function(nums, k) {
    if(nums.length < k) return -1
    let obj =  new minHeap()
    for(let i = 0 ; i < nums.length ; i++){
        obj.insertion(nums[i]);

        if(obj.heap.length > k) {
            obj.deletion();
        }
    }
    return obj.heap[0]
};