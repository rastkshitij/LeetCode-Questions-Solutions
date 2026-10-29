/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 class minHeap{
    constructor(comparator = (a , b)=> a - b){
        this.heap =[];
        this.comparator = comparator;
    }
    compare(i , j){
        return this.comparator(this.heap[i] , this.heap[j])
    }
    deletion (){
        let ele = this.heap[0];
        this.heap[0] = this.heap[this.heap.length -1 ];
        this.heap.pop();
        let i = 0;
        while(true){
            let left = 2*i + 1;
            let right = 2*i + 2;
            let largest = i;
            if(left < this.heap.length && this.compare(left , largest) < 0){
                largest = left
            }
             if(right < this.heap.length && this.compare(right , largest) < 0){
                largest = right
            }
            if(largest === i) break;
            this.swap(this.heap , i , largest);
            i = largest;
        } 
        return ele
    }
    insertion(val){
        this.heap.push(val);
        let i = this.heap.length - 1;
        while(i > 0){
            let parent = Math.floor((i -1) / 2);
           if (this.compare(i, parent) < 0) {
            this.swap(this.heap, i, parent);
             i = parent;
            } else {
                break;
            }
        }
    }
    swap(arr, i , j){
        [arr[i] , arr[j] ] = [arr[j] , arr[i]];
    }
 }
var mergeKLists = function(lists) {
    let obj = new minHeap((a, b) => a.key - b.key)
    for(let i = 0 ; i < lists.length; i++){
        if(lists[i] !== null) obj.insertion({key : lists[i].val , node : lists[i]})
    } 
    let dum = new ListNode(-1);
    let temp = dum;
    while(obj.heap.length !== 0){
        let del = obj.deletion();
        temp.next = del.node;
        temp = temp.next;
        if(del.node.next != null){
           obj.insertion({
    key: del.node.next.val,
    node: del.node.next
});}
    }
    return dum.next
};