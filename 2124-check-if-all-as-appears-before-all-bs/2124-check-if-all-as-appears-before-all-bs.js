/**
 * @param {string} s
 * @return {boolean}
 */
var checkString = function(s) {
 let i = 0 , j = s.length -1
 while( i <= j) {
    if(s[i] === "b" && s[j] === "a") {
        return false
    } else if(s[i]=== "a" && s[j] === "a"){
        i++
    } else {
        i++ , j--
    }
 }
 return true
};