/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function(n) {
   if(n < 10) return false;
   if(n == 10) return true;
   let leftstones = n
   let count = 10
   let win = true;
    while( leftstones >= 0){
        win  = win ? false : true
        leftstones = leftstones - count;
        count--;
        
    }
    return win ? true : false
};