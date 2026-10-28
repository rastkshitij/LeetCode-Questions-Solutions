/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let map =  new Map()
    for(let i = 0  ; i < nums.length  ; i++){
        map.set(nums[i] , (map.get(nums[i]) || 0) + 1)
    }
    let arr= []
    for(let key of map.keys()){
        arr.push({key  , value : map.get(key) })
    }
    arr.sort((a , b)=> b.value - a.value);
    let ans = []
    for(let i = 0 ; i <k ; i++){
        ans.push(arr[i].key)
    }
    return ans 
};