/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
    let map = new Map();
    for(let i = 0 ; i < words.length ; i++){
        map.set(words[i] , (map.get(words[i]) || 0) +1)
    }
    let arr= []
    for(let key of map.keys()){
        arr.push({key , value : map.get(key)})
    } 
    arr.sort((a, b)=>{
          if (a.value !== b.value) {
            return b.value - a.value;
        }
        return a.key.localeCompare(b.key);
    });
    let ans = []
    for(let i =0 ; i < k ; i++){
        ans.push(arr[i].key)
    }
    return ans
};